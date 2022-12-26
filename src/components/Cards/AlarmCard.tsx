import { useState } from "react"

interface cardProps {
  jam: string
  nama: string
}
export const AlarmCard: React.FC<cardProps> = ({ jam, nama }) => {
  const [toggle, setToggle] = useState(true)
  const toggleClass = " transform translate-x-5"

  const handleClick = () => {
    alert("fitur masih dalam pengembangan")
  }
  return (
    <div
      className="flex justify-between w-full p-4 bg-blue-100 rounded-md shadow-md cursor-pointer"
      onClick={handleClick}
    >
      <div>
        <p className="text-lg font-bold">{jam}</p>
        <p className="text-xs">{nama}</p>
      </div>
      <div>
        <div
          className="flex items-center w-12 h-6 p-1 bg-gray-300 rounded-full cursor-pointer md:w-14 md:h-7"
          onClick={() => {
            setToggle(!toggle)
          }}
        >
          {/* Switch */}
          <div
            className={
              "bg-white md:w-6 md:h-6 h-5 w-5 rounded-full shadow-md transform" +
              (toggle ? null : toggleClass)
            }
          ></div>
        </div>
      </div>
    </div>
  )
}
