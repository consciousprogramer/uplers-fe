import { PDTEndpoints } from "@/endpoints/belgiumPublicTransport"
import { IRetrieveAllStationsResponse } from "@/interfaces/api/response/belgiumPublicTransport"
import axios from "axios"

export const PDTServices = {
  retrieveAllStations: async function () {
    const resp = await axios.get<IRetrieveAllStationsResponse>(
      PDTEndpoints.retrieveAllStations
    )
    return resp.data
  },
}
