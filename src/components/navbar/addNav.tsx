import { PlusIcon } from "@heroicons/react/24/solid"
import Link from "next/link"

interface navProps {
  name?: string
  link?: string
}

export const AddNav: React.FC<navProps> = ({ name, link }) => {
  return (
    <div className="w-full bg-blue-700">
      <div className="flex items-center justify-between w-full p-4 text-white">
        <p>{name}</p>

        <Link href={link ? link : ""} passHref>
          <PlusIcon className="w-6 h-6" />
        </Link>
      </div>
    </div>
  )
}
