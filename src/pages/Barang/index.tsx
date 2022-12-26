import { ItemCard } from "@components/Cards/ItemCard"
import { AddNav } from "@components/navbar/addNav"
import { BottomNav } from "@components/navbar/bottomNav"
import ListBarang from "@shared/jsons/listBarang.json"

export default function Barang() {
  return (
    <div>
      <AddNav name="List Barang" link="./Barang/AddBarang" />
      <div className="p-2 space-y-2">
        {ListBarang.map((list, i) => (
          <ItemCard key={i} nama={list.nama} score={list.score} />
        ))}
      </div>
      <BottomNav />
    </div>
  )
}
