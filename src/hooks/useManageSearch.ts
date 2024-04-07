import { ISearchData } from "@/interfaces/hooks/useManageSearch.interfaces"
import _ from "lodash"
import { useCallback, useState } from "react"

export const useManageSearch = () => {
  const [searchData, setSearchData] = useState<ISearchData>({
    searchField: "name",
    term: "",
  })

  const debouncedSetSearchTerm = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchData((prevState) => ({
        ...prevState,
        term: e.target.value.trimStart(),
      }))
    },
    []
  )

  const setSearchField = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSearchData((prevState) => ({
        ...prevState,
        searchField: e.target.value,
      }))
    },
    []
  )

  return {
    searchData,
    setSearchField,
    setSearchTerm: debouncedSetSearchTerm,
  }
}
