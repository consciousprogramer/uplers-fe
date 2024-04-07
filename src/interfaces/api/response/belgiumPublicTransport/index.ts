export interface IRetrieveAllStationsResponse {
  version: string
  timestamp: string
  station: IStation[]
}

export interface IStation extends Record<string, string> {
  locationX: string
  locationY: string
  id: string
  name: string
  "@id": string
  standardname: string
  notes: string
}
