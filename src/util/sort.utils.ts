import { ISortData } from "@/interfaces/hooks/useManageSort.interfaces"

export const sortFunction = <IListItem extends Record<string, any>>(
  sortData: ISortData<IListItem>,
  dataToSort: IListItem[]
) => {
  const { sortOn, sortOrder } = sortData
  dataToSort.sort((a, b) => {
    if (a[sortOn] < b[sortOn]) {
      return sortOrder === "asc" ? -1 : 1
    }
    if (a[sortOn] > b[sortOn]) {
      return sortOrder === "asc" ? 1 : -1
    }
    return 0
  })
}
