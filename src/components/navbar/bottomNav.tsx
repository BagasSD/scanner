import { ArchiveBoxIcon, ClockIcon } from "@heroicons/react/24/solid"
import Link from "next/link"

export const BottomNav: React.FC = () => {
  return (
    <div className="fixed bottom-0 w-full p-2 text-white bg-blue-700">
      <div className="grid grid-cols-2">
        <Link href="/Alarm" className="flex flex-col items-center" passHref>
          <ClockIcon className="w-4 h-4" />
          <p>Alarm</p>
        </Link>
        <Link href="/Barang" className="flex flex-col items-center" passHref>
          <ArchiveBoxIcon className="w-4 h-4" />
          <p>Barang</p>
        </Link>
      </div>
    </div>
  )
}
