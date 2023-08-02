import React from 'react'
import { Dropdown } from 'primereact/dropdown'

/**
 * Dataview header sort button
 *
 * @param {Object} sorts
 * @param {String} sortBus
 * @param {Function} onSortChange
 *
 * @returns {JSX.Element}
 */
const sortButton = (sorts, sortBus, onSortChange, deviceSize) => {

  const getLabel = (value) => {
    if (deviceSize.width <= 480) {
      return 'Ordenar'
    } else {
      return value
    }
  }

  const getState = (value, sortOptions) => {
    const sortTest = sortOptions.filter((item) => {
      return item.value === value
    })[0]
    return sortTest
  }

  const getOptions = (_options) => {
    const options = []
    _options.forEach((item) => {
      options.push({
        label: item.label,
        value: item.value
      })
    })
    return options
  }

  const getValue = () => {
    let res = null
    sorts.sortOptions.forEach((sort) => {
      if (sort.sorts.sortField === sortBus.sortField && sort.sorts.sortOrder === sortBus.sortOrder) {
        res = sort.value
      }
    })
    return res
  }

  return (
    <Dropdown
      options={getOptions(sorts.sortOptions)}
      value={getValue()}
      placeholder={getLabel(sorts.placeholder)}
      optionLabel={sorts.optionLabel}
      className={sorts.className}
      style={sorts.style}
      onChange={(e) => {
        const actualState = getState(e.value, sorts.sortOptions)
        onSortChange({
          sortField: actualState.sorts.sortField,
          sortOrder: actualState.sorts.sortOrder,
          sortBus: e.value
        })
      }}
    />
  )
}

export default sortButton
