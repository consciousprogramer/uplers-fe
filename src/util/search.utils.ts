import { ISearchData } from "@/interfaces/hooks/useManageSearch.interfaces"
import { ISearchType } from "@/interfaces/utils/searchUtils.interface"

// this take the takes a list and return the matching items of list
export const filterDataOnSearch = <IListItem extends Record<string, string>>(
  searchData: ISearchData,
  list: IListItem[],
  type = "case-sensitive" as ISearchType
) => {
  const { searchField, term } = searchData
  if (type === "case-insensitive") {
    return list.filter((item) => item[searchField].toLowerCase().includes(term))
  } else {
    return list.filter((item) => item[searchField].includes(term))
  }
}
