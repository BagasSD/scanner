import { AlarmCard } from "@components/Cards/AlarmCard"
import { AddNav } from "@components/navbar/addNav"
import { BottomNav } from "@components/navbar/bottomNav"
import ListAlarms from "@shared/jsons/listAlarm.json"

export default function Alarm() {
  return (
    <div>
      <AddNav name="List Alarm" link="./Alarm/AddAlarm" />
      <div className="p-2 space-y-2">
        {ListAlarms.map((list, i) => (
          <AlarmCard key={i} nama={list.nama} jam={list.jam} />
        ))}
      </div>
      <BottomNav />
    </div>
  )
}
