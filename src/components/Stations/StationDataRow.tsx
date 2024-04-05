import { IStation } from "@/interfaces/api/response/belgiumPublicTransport"
import Link from "next/link"
import javascriptPageStyles from "@/components/Stations/station.module.css"
import React from "react"

const StationDataRow: React.FC<{
  station: IStation
  stationsFields: (keyof IStation)[]
  addNotesHandler: (id: string, notes: string) => void
}> = ({ station, stationsFields, addNotesHandler }) => {
  return (
    <tr key={station.id}>
      {stationsFields.map((field) => {
        if (field === "notes") {
          return (
            <td key={field}>
              <input
                type="text"
                defaultValue={station[field]}
                className={javascriptPageStyles.input}
                onChange={(e) => addNotesHandler(station.id, e.target.value)}
              />
            </td>
          )
        } else {
          return <td key={field}>{station[field]}</td>
        }
      })}
      <td>
        <Link
          href={`https://www.google.com/maps?q=${station.locationX},${station.locationY}`}
          target="_blank"
          className={javascriptPageStyles.link}
        >
          View on google Maps
        </Link>
      </td>
    </tr>
  )
}

export default React.memo(StationDataRow)
