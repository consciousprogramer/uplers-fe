import useFetch from "@/hooks/useFetch"
import { IRetrieveAllStationsResponse } from "@/interfaces/api/response/belgiumPublicTransport"
import React from "react"
import { stationFetchAndAddNotesField } from "./station.helpers"

type IStationKeys = keyof IRetrieveAllStationsResponse["station"][number]
interface ISortData {
  sortOn: IStationKeys
  sortOrder: "asc" | "desc"
}

interface ISearchData {
  term: string
  searchField: IStationKeys
}

function Station() {
  const {
    data: stationsResData,
    error,
    isLoading,
    setData,
  } = useFetch<IRetrieveAllStationsResponse>(stationFetchAndAddNotesField)
  return <div>Station</div>
}

export default Station
