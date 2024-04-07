import { IStation } from "@/interfaces/api/response/belgiumPublicTransport"
import { ISortData } from "@/interfaces/hooks/useManageSort.interfaces"
import { useCallback, useEffect, useState } from "react"

export const useManageSort = () => {
  const [sortData, setSortData] = useState<ISortData<IStation>>({
    sortOn: "id",
    sortOrder: "asc",
  })

  const sortChangeHandler = useCallback(
    (field: string) => {
      if (sortData.sortOn === field) {
        setSortData((prevState) => ({
          ...prevState,
          sortOrder: prevState.sortOrder === "asc" ? "desc" : "asc",
        }))
      } else {
        setSortData({
          sortOn: field,
          sortOrder: "asc",
        })
      }
    },
    [sortData]
  )

  return {
    sortData,
    sortChangeHandler,
  }
}
