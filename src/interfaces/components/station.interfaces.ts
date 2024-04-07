import { IRetrieveAllStationsResponse } from "../api/response/belgiumPublicTransport"

export type IStationKeys = keyof IRetrieveAllStationsResponse["station"][number]

