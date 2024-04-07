import { IRetrieveAllStationsResponse } from "@/interfaces/api/response/belgiumPublicTransport"
import { PDTServices } from "@/services/belgiumPublicTransport.services"

export const addNotesFieldToStations = (data: IRetrieveAllStationsResponse) => {
  data.station = data.station.map((station) => {
    return {
      ...station,
      notes: "",
    }
  })
  return data
}

export const notesAddingHandler = (
  setData: React.Dispatch<
    React.SetStateAction<IRetrieveAllStationsResponse | null>
  >
) => {
  return (id: string, updatedNote: string) => {
    setData((prevState) => {
      if (prevState) {
        const station = prevState.station.find((station) => station.id === id)!
        station.notes = updatedNote
        return {
          ...prevState,
          station: prevState.station,
        }
      }
      return null
    })
  }
}

export const stationFetchAndAddNotesField = () =>
  PDTServices.retrieveAllStations().then(addNotesFieldToStations)
