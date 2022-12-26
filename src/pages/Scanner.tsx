import React, { useEffect, useState, useRef, Fragment } from "react"
import * as cocoSsd from "@tensorflow-models/coco-ssd"
import * as tf from "@tensorflow/tfjs"
import Webcam from "react-webcam"
import Link from "next/link"
import { CameraIcon } from "@heroicons/react/24/solid"
import useWindowSize from "@shared/lib/useWindowSize"
import { Dialog, Transition } from "@headlessui/react"

export default function Scanner() {
  const [model, setModel] = useState<any>()
  const { width, height } = useWindowSize()
  const webcamRef = useRef<any>(null)
  const canvasRef = useRef<any>(null)
  const [dataPrediction, setDataPrediction] = useState<any>({})
  const [scanning, setScanning] = useState<any>(false)

  let [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }
  const videoConstraints = {
    height: height,
    width: width,
    facingMode: "environment",
  }

  async function loadModel() {
    try {
      const model = await cocoSsd.load()
      setModel(model)
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

  async function predictionFunction() {
    //Clear the canvas for each prediction
    var cnvs = document.getElementById("myCanvas") as HTMLCanvasElement
    var ctx = cnvs?.getContext("2d")

    const video = webcamRef.current.video
    const videoWidth = width
    const videoHeight = height

    // Set video width
    webcamRef.current.video.width = videoWidth
    webcamRef.current.video.height = videoHeight

    canvasRef.current.width = videoWidth
    canvasRef.current.height = videoHeight
    //Start prediction
    const predictions = await model.detect(video)
    if (predictions.length > 0) {
      predictions.map((prediction: any) => {
        setDataPrediction({
          name: prediction["class"],
          score: prediction["score"],
        })
        if (ctx) {
          const [x, y, width, height] = prediction["bbox"]
          const text = prediction["class"]
          const info = prediction["score"] > 0.8 ? `${text}` : "???"

          ctx.font = "22px Arial"
          ctx.strokeStyle = "green"
          ctx.fillStyle = "green"
          ctx.beginPath()
          ctx.fillText(info, x, y)
          ctx.rect(x, y, width, height)
          ctx.lineWidth = 3
          ctx.stroke()
        }

        if (prediction["score"] > 0.8) {
          setScanning(false)
          openModal()
          return
        } else {
          setScanning(true)
        }
      })
    }
  }
  if (scanning) {
    setTimeout(() => predictionFunction(), 500)
  }
  return (
    <div className="w-full overflow-x-hidden max-w-screen">
      <div>
        <div className="relative w-full">
          <Webcam
            audio={false}
            id="img"
            ref={webcamRef}
            screenshotQuality={1}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
            className="w-full h-full"
            style={{
              textAlign: "center",
              height: "100vh",
              width: "100%",
              objectFit: "fill",
            }}
          />
        </div>
        <div className="absolute top-0 z-10">
          <canvas
            ref={canvasRef}
            id="myCanvas"
            style={{ backgroundColor: "transparent" }}
          />
        </div>
      </div>
      <div className="absolute bottom-0 z-20 flex w-full p-4 text-white bg-blue-700">
        <Link
          href="/Barang/AddBarang"
          className="z-20 flex items-center w-full"
          passHref
        >
          <p>Kembali</p>
        </Link>
        <button
          onClick={predictionFunction}
          className="flex flex-col items-center"
        >
          <CameraIcon className="w-4 h-4" />
          <p>Scan</p>
        </button>
      </div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-full p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Data yang terdeteksi adalah{" "}
                      <span className="text-lg font-bold">
                        {dataPrediction?.name}
                      </span>{" "}
                      dengan tingkat kecocokan sebesar{" "}
                      <span className="text-lg font-bold">
                        {Math.floor(dataPrediction?.score * 100)}%
                      </span>
                    </p>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Got it, thanks!
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  )
}
