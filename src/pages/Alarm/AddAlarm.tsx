import { ArrowLeftIcon, PlusIcon } from "@heroicons/react/24/solid"
import Link from "next/link"

export default function AddBarang() {
  return (
    <div className="">
      <Link href="/Alarm" className="flex p-4 text-white bg-blue-700" passHref>
        <ArrowLeftIcon className="w-6 h-6" />
        <p>Kembali</p>
      </Link>
      <div className="p-4">
        <div className="p-4 bg-blue-100 rounded-md shadow-md ">
          <form className="space-y-2">
            <div className="justify-between w-full px-2 ">
              <p> Nama :</p>
              <input type="text" />
            </div>
            <div className="justify-between w-full px-2 ">
              <p> Waktu :</p>
              <input type="time" />
            </div>
            <div className="justify-between w-full px-2 ">
              <p> Tanggal :</p>
              <input type="date" />
            </div>
            <div className="justify-between w-full px-2 ">
              <p> Ringtone :</p>
              <input type="file" />
            </div>
            <div className="justify-between w-full px-2 ">
              <p> Ulangi :</p>
              <input type="number" />
            </div>
            <div className="justify-between w-full px-2 ">
              <p> Password :</p>
              <input type="password" />
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
