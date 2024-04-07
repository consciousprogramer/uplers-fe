import React from "react"
import javascriptPageStyles from "@/components/Stations/station.module.css"
import { ISearchData } from "@/interfaces/hooks/useManageSearch.interfaces"
import { IStationKeys } from "@/interfaces/components/station.interfaces"

const SearchPanel: React.FC<{
  searchData: ISearchData
  setSearchField: (e: React.ChangeEvent<HTMLSelectElement>) => void
  setSearchTerm: (e: React.ChangeEvent<HTMLInputElement>) => void
  stationsFields: IStationKeys[]
}> = ({ searchData, setSearchField, setSearchTerm, stationsFields }) => {
  const { searchField, term } = searchData
  return (
    <section className={javascriptPageStyles.searchSection}>
      <div className="">
        <input
          type="text"
          value={term}
          placeholder="search"
          onChange={setSearchTerm}
        />
        <select
          name="searchField"
          id="searchField"
          value={searchField}
          onChange={setSearchField}
        >
          {stationsFields.map((field) => (
            <option key={field} value={field}>
              {field}
            </option>
          ))}
        </select>
      </div>
    </section>
  )
}

export default SearchPanel
