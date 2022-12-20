import React, { useEffect, useState, useRef } from "react"
import * as cocoSsd from "@tensorflow-models/coco-ssd"
import * as tf from "@tensorflow/tfjs"
import Webcam from "react-webcam"

export const Scanner: React.FC = () => {
  const [model, setModel] = useState<any>()
  const [predict, setPredict] = useState<boolean>(false)

  const webcamRef = useRef<any>(null)
  const canvasRef = useRef<any>(null)
  const [dataPrediction, setDataPrediction] = useState<any[]>([])

  const videoConstraints = {
    height: 1080,
    width: 1920,
    facingMode: "user",
  }

  async function loadModel() {
    try {
      const model = await cocoSsd.load()
      setModel(model)
      setPredict(true)
      console.log("model loaded")
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    tf.ready().then(() => {
      loadModel()
    })
  }, [])

  useEffect(() => {
    if (predict) {
      predictionFunction()
    }
  })

  async function predictionFunction() {
    console.log("prediksi dimulai")
    //Clear the canvas for each prediction
    var cnvs = document.getElementById("myCanvas") as HTMLCanvasElement
    var ctx = cnvs?.getContext("2d")

    const video = webcamRef.current.video
    const videoWidth = webcamRef.current.video.videoWidth
    const videoHeight = webcamRef.current.video.videoHeight

    // Set video width
    webcamRef.current.video.width = videoWidth
    webcamRef.current.video.height = videoHeight

    canvasRef.current.width = videoWidth
    canvasRef.current.height = videoHeight
    //Start prediction
    const predictions = await model.detect(video)
    if (predictions.length > 0) {
      predictions.map((prediction: any) => {
        setDataPrediction((old) => [
          ...old,
          { name: prediction["class"], score: prediction["score"] },
        ])
        if (ctx) {
          //Threshold is 0.8 or 80%//Extracting the coordinate and the bounding box information
          const [x, y, width, height] = prediction["bbox"]
          const text = prediction["class"]
          ctx.font = "28px Arial"
          ctx.strokeStyle = "green"
          ctx.fillStyle = "green"
          ctx.beginPath()

          ctx.fillText(text, x, y)
          ctx.rect(x, y, width, height)
          ctx.lineWidth = 3
          ctx.stroke()
        }
      })
    }

    //Rerun prediction by timeout
    setTimeout(() => predictionFunction(), 500)
  }
  return (
    <div className="w-full ">
      <div className="md:flex">
        <div className="md:w-1/2 w-full ">
          <Webcam
            audio={false}
            id="img"
            ref={webcamRef}
            screenshotQuality={1}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
            className="w-full h-full"
          />
        </div>
        <div style={{ position: "absolute", zIndex: "9999" }}>
          <canvas
            ref={canvasRef}
            id="myCanvas"
            style={{ backgroundColor: "transparent", width: 640, height: 480 }}
          />
        </div>
        <div className="md:w-1/2 border min-h-[225px] max-h-[225px] overflow-scroll">
          <p>Kemungkinan Objek</p>
          {dataPrediction &&
            dataPrediction.map((data, i) => (
              <p key={i}>
                {data.name &&
                  data.score &&
                  `${data.name} Dengan Score ${Math.floor(data.score * 100)}%`}
              </p>
            ))}
        </div>
      </div>
      <div className="mt-5 flex justify-center">
        <button
          onClick={() => setDataPrediction([])}
          className="rounded-md p-4  text-white bg-blue-500 "
        >
          <p>Hapus Data</p>
        </button>
      </div>
    </div>
  )
}
