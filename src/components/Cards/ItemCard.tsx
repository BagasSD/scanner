interface cardProps {
  nama: string
  score: number
}
export const ItemCard: React.FC<cardProps> = ({ nama, score }) => {
  const handleClick = () => {
    alert("fitur masih dalam pengembangan")
  }
  return (
    <div
      className="flex justify-between w-full p-4 bg-blue-100 rounded-md shadow-md cursor-pointer"
      onClick={handleClick}
    >
      <div>
        <p className="text-lg font-bold">{nama}</p>
      </div>
      <div>
        <p className="">{score}%</p>
      </div>
    </div>
  )
}
