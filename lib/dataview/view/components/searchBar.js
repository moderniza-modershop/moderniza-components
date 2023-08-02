import React from "react"
import { InputText } from "primereact/inputtext"

/**
 * Dataview header search bar
 *
 * @param {Boolean} loading
 * @param {String} globalFilterValue
 * @param {Function} onGlobalFilterChange
 * @param {{label:String, filter: String}} searchOptions
 *
 * @returns {JSX.Element}
 */
const searchBar = (loading, globalFilterValue, onGlobalFilterChange, searchOptions) => {
  return (
    <span
      className="p-input-icon-left"
      style={{
        width: "100%"
      }}
    >
      <i className="pi pi-search" />
      <InputText
        disabled={loading}
        value={globalFilterValue}
        onChange={onGlobalFilterChange}
        placeholder={searchOptions.label}
        style={{
          width: "100%"
        }}
      />
    </span>
  )
}

export default searchBar
