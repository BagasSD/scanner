import { ArrowLeftIcon, CameraIcon, PlusIcon } from "@heroicons/react/24/solid"
import Link from "next/link"

export default function AddAlarm() {
  return (
    <div className="">
      <Link href="/Barang" className="flex p-4 text-white bg-blue-700" passHref>
        <ArrowLeftIcon className="w-6 h-6" />
        <p>Kembali</p>
      </Link>
      <div className="p-4">
        <div className="p-4 bg-blue-100 rounded-md shadow-md ">
          <form className="space-y-2">
            <div className="justify-between w-full px-2 ">
              <p> Nama :</p>
              <div className="flex items-center gap-2">
                <input type="text" className="flex-1" />
                <Link
                  href="/Scanner"
                  className="p-1 bg-blue-700 rounded-full"
                  passHref
                >
                  <CameraIcon className="w-4 h-4 text-white" />
                </Link>
              </div>
            </div>
            <div className="justify-between w-full px-2 ">
              <p> Score :</p>
              <input type="text" disabled />
            </div>
            <div
              className="flex items-center justify-center cursor-pointer"
              onClick={() => alert("Fitur masih dalam pengembangan")}
            >
              <div className="flex items-center justify-center p-1 text-white bg-blue-400 rounded-md">
                <p>Tambah</p>
                <PlusIcon className="w-4 h-4" />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
