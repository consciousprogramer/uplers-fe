"use client"
import {
  IRetrieveAllStationsResponse,
  IStation,
} from "@/interfaces/api/response/belgiumPublicTransport"
import { PDTServices } from "@/services/belgiumPublicTransport.services"
import React, { useCallback, useState } from "react"
import useFetch from "@/hooks/useFetch"
import Link from "next/link"
import { ImSortAmountAsc, ImSortAmountDesc } from "react-icons/im"
import javascriptPageStyles from "./javascript.module.css"

import _ from "lodash"

function Javascript() {
  const [sortData, setSortData] = useState<{
    sortOn: keyof IRetrieveAllStationsResponse["station"][number]
    sortOrder: "asc" | "desc"
  }>({
    sortOn: "id",
    sortOrder: "asc",
  })

  const [searchData, setSearchData] = useState<{
    term: string
    searchField: keyof IRetrieveAllStationsResponse["station"][number]
  }>({
    searchField: "name",
    term: "",
  })

  const fetcher = useCallback(
    () =>
      PDTServices.retrieveAllStations().then((data) => {
        data.station = data.station.map((station) => {
          return {
            ...station,
            notes: "",
          }
        })
        return data
      }),
    []
  )

  const {
    data: stationsResData,
    error,
    isLoading,
    setData,
  } = useFetch<IRetrieveAllStationsResponse>(fetcher)

  const addNotesHandler = useCallback(
    (id: string, updatedNote: string) => {
      setData((prevState) => {
        if (prevState) {
          const station = prevState.station.find(
            (station) => station.id === id
          )!
          station.notes = updatedNote
          return {
            ...prevState,
            station: prevState.station,
          }
        }
        return null
      })
    },
    [setData]
  )

  if (error) {
    return <p>Error</p>
  }

  if (isLoading) {
    return
  }

  const compositeFields = ["view on map"]

  const stations = stationsResData ? stationsResData.station : []

  const stationsFields =
    stationsResData && stationsResData.station.length
      ? (Object.keys(stationsResData.station[0]) as Array<
          keyof IRetrieveAllStationsResponse["station"][number]
        >)
      : []

  const sortHandler = (
    field: keyof IRetrieveAllStationsResponse["station"][number]
  ) => {
    if (sortData.sortOn === field) {
      setSortData((prevState) => ({
        ...prevState,
        sortOrder: prevState.sortOrder === "asc" ? "desc" : "asc",
      }))

      setData((prevState) => {
        if (prevState) {
          return {
            ...prevState,
            station: prevState.station.sort((a, b) => {
              if (a[field] < b[field]) {
                return sortData.sortOrder === "asc" ? -1 : 1
              }
              if (a[field] > b[field]) {
                return sortData.sortOrder === "asc" ? 1 : -1
              }
              return 0
            }),
          }
        }
        return prevState
      })
    } else {
      setSortData({
        sortOn: field,
        sortOrder: "asc",
      })

      setData((prevState) => {
        if (prevState) {
          return {
            ...prevState,
            station: prevState.station.sort((a, b) => {
              if (a[field] < b[field]) {
                return -1
              }
              if (a[field] > b[field]) {
                return 1
              }
              return 0
            }),
          }
        }
        return prevState
      })
    }
  }

  return (
    <>
      {
        <section className={javascriptPageStyles.searchSection}>
          <div className="">
            <input
              type="text"
              value={searchData.term}
              onChange={_.debounce(
                (e) =>
                  setSearchData((prevState) => ({
                    ...prevState,
                    term: e.target.value.trim(),
                  })),
                500
              )}
            />
            <select
              name="searchField"
              id="searchField"
              value={searchData.searchField}
              onChange={(e) => {
                setSearchData((prevState) => ({
                  ...prevState,
                  searchField: e.target
                    .value as keyof IRetrieveAllStationsResponse["station"][number],
                }))
              }}
            >
              {stationsFields.map((field) => (
                <option key={field} value={field}>
                  {field}
                </option>
              ))}
            </select>
          </div>
        </section>
      }
      {stations.length ? (
        <table className={javascriptPageStyles.table}>
          <thead>
            <tr>
              {stationsFields.map((field) => (
                <th key={field} className={javascriptPageStyles.tableHeadCell}>
                  <span>{field}</span>
                  {sortData.sortOn === field ? (
                    <button onClick={() => sortHandler(field)}>
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
                    <button onClick={() => sortHandler(field)}>
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
            {stations
              .filter((station) =>
                station[searchData.searchField].includes(searchData.term)
              )
              .map((station) => (
                <tr key={station.id}>
                  {stationsFields.map((field) => {
                    if (field === "notes") {
                      return (
                        <td key={field}>
                          <input
                            type="text"
                            defaultValue={station[field]}
                            className={javascriptPageStyles.input}
                            onChange={(e) =>
                              addNotesHandler(station.id, e.target.value)
                            }
                          />
                        </td>
                      )
                    } else {
                      return <td key={field}>{station[field]}</td>
                    }
                  })}
                  <td>
                    <Link
                      href={`https://www.google.com/maps?q=${station.locationX},${station.locationY}`}
                      target="_blank"
                      className={javascriptPageStyles.link}
                    >
                      View on google Maps
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      ) : (
        <p className="">No stations found</p>
      )}
    </>
  )
}

export default Javascript
