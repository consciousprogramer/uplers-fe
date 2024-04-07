"use client"
import { IRetrieveAllStationsResponse } from "@/interfaces/api/response/belgiumPublicTransport"
import React, { useCallback, useEffect } from "react"
import useFetch from "@/hooks/useFetch"
import { ImSortAmountAsc, ImSortAmountDesc } from "react-icons/im"
import javascriptPageStyles from "@/components/Stations/station.module.css"
import _ from "lodash"
import StationDataRow from "@/components/Stations/StationDataRow"
import {
  notesAddingHandler,
  stationFetchAndAddNotesField,
} from "@/components/Stations/station.helpers"
import { filterDataOnSearch } from "@/util/search.utils"
import { useManageSearch } from "@/hooks/useManageSearch"
import { useManageSort } from "@/hooks/useManageSort"
import { sortFunction } from "@/util/sort.utils"
import SearchPanel from "@/components/Stations/SearchPanel"

function JavascriptPage() {
  const { searchData, setSearchField, setSearchTerm } = useManageSearch()
  const { sortData, sortChangeHandler } = useManageSort()

  const {
    data: stationsResData,
    error,
    isLoading,
    setData,
  } = useFetch<IRetrieveAllStationsResponse>(stationFetchAndAddNotesField)

  useEffect(() => {
    setData((prevState) => {
      if (prevState) {
        sortFunction(sortData, prevState.station)
        return {
          ...prevState,
        }
      }
      return prevState
    })
  }, [sortData, setData])

  const compositeFields = ["view on map"]

  const stations = stationsResData ? stationsResData.station : []

  const stationsFields = stationsResData?.station?.length
    ? Object.keys(stationsResData.station[0])
    : []

  if (error) {
    return <p>Error</p>
  }

  if (isLoading) {
    return
  }

  return (
    <>
      <SearchPanel
        searchData={searchData}
        setSearchField={setSearchField}
        setSearchTerm={setSearchTerm}
        stationsFields={stationsFields}
      />

      {/* table panel */}
      {stations.length ? (
        <table className={javascriptPageStyles.table}>
          <thead>
            <tr>
              {stationsFields.map((field) => (
                <th key={field} className={javascriptPageStyles.tableHeadCell}>
                  <span>{field}</span>
                  {sortData.sortOn === field ? (
                    <button onClick={() => sortChangeHandler(field)}>
                      {sortData.sortOrder === "asc" ? (
                        <ImSortAmountAsc
                          color="green"
                          className={javascriptPageStyles.tableHeadCellIcon}
                        />
                      ) : (
                        <ImSortAmountDesc
                          color="green"
                          className={javascriptPageStyles.tableHeadCellIcon}
                        />
                      )}
                    </button>
                  ) : (
                    <button onClick={() => sortChangeHandler(field)}>
                      <ImSortAmountAsc
                        className={javascriptPageStyles.tableHeadCellIcon}
                      />
                    </button>
                  )}
                </th>
              ))}
              {compositeFields.map((field) => (
                <th key={field} className={javascriptPageStyles.tableHeadCell}>
                  {field.toUpperCase()}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filterDataOnSearch(searchData, stations).map((station) => (
              <StationDataRow
                addNotesHandler={() => notesAddingHandler(setData)}
                key={station.id}
                station={station}
                stationsFields={stationsFields}
              />
            ))}
          </tbody>
        </table>
      ) : (
        <p className="">No stations found</p>
      )}
    </>
  )
}

export default JavascriptPage
