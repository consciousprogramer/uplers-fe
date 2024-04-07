import { IStationKeys } from "../components/station.interfaces"

export interface ISortData<IObject extends Record<string, any>> {
  sortOn: keyof IObject
  sortOrder: "asc" | "desc"
}
