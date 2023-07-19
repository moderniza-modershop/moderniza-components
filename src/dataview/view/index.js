import React, { useState, useEffect, useRef } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { DataView } from 'primereact/dataview'
import PropTypes from 'prop-types'

// *Controllers
import DataviewRequest from '../controller/DataviewRequest'
import DataviewDeviceSize from '../controller/DataviewDeviceSize'
import DataviewResponsive from '../controller/DataviewResponsive'

// *Models
import DataviewOptions from '../model/DataviewOptions'
import DataviewRequestEvent from '../model/DataviewRequestEvent'

// *HEADER
import { header } from './header.js'

// *FOOTER
import { footer } from './footer.js'

/**
 * View component
 *
 * @param {Object|DataviewOptions} props.options view options
 * @returns {JSX.Element}
 */
const View = (props) => {
  /**
   * Component options
   * @type {DataviewOptions}
   */
  const options = props.options.build ? props.options : new DataviewOptions(props.options)
  console.log('options', options)
  const templates = options.templates

  // *REFERENCES
  const dataTableRef = useRef(null)
  const dataViewRef = useRef(null)
  const exportOverPanelRef = useRef(null)

  const exportColumns = options.templates.columns ? options.templates.columns.map((col) => {
    return { title: col.header, dataKey: col.field }
  }) : []

  // *LAYOUTS
  const [layout, setLayout] = useState(options.type)
  const [loading, setLoading] = useState(true)
  const [title] = useState(options.title || false)

  // *PAGINATION
  const [peerPageOptions] = useState(options.pagination.peerPageOptions)
  const [page, setPage] = useState(0)
  const [first, setFirst] = useState(0)
  const [rows, setRows] = useState(options.pagination.peerPage || 5)
  const [totalRecords, setTotalRecords] = useState(0)

  // *SORTS
  const [sortKey, setSortKey] = useState('')
  const [sortField, setSortField] = useState(options.sorts.sortField || null)
  const [sortOrder, setSortOrder] = useState(options.sorts.sortOrder || 1)

  // * FILTERS
  const [filters, setFilters] = useState(options.filters || [])

  // *GLOBAL FILTER
  const [globalFilterValue, setGlobalFilterValue] = useState(options.search.value || '')

  // *DATAVIEW RESULTS
  const [results, setResults] = useState([])

  // *RESPONSIVE
  const lastDeviceSize = DataviewDeviceSize()
  const [deviceSize, setDeviceSize] = useState(lastDeviceSize)

  useEffect(() => {
    // console.log('lastDeviceSize', lastDeviceSize)
    if (typeof lastDeviceSize.width === 'number' &&
      typeof lastDeviceSize.height === 'number' &&
      options.responsive) {
      // console.log('passei aqui')
      setDeviceSize(lastDeviceSize)
      DataviewResponsive((viewportLayout) => {
        // console.log('viewportLayout', viewportLayout)
        if (layout !== viewportLayout) {
          setLayout(viewportLayout)
        }
      }, options.type, lastDeviceSize, options.responsive)
    }
  }, [lastDeviceSize])

  // *FRESH THE COMPONENT
  const freshComponent = async () => {
    setLoading(true)
    setResults([])
    setTotalRecords(0)

    const request = await DataviewRequest(
      options.onRequest,
      new DataviewRequestEvent({
        search: {
          value: globalFilterValue
        },
        pagination: {
          page,
          peerPage: rows
        },
        sorts: {
          sortField,
          sortOrder
        },
        filters
      })
    )

    if (request.content && request.total) {
      setResults(request.content)
      setTotalRecords(request.total)
    }

    setLoading(false)
  }

  // *EFFECT TO SEARCH WHEN USER STOPS TYPING
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (options.search && options.search.value !== globalFilterValue) freshComponent()
    }, 3000)
    return () => clearTimeout(delayDebounceFn)
  }, [globalFilterValue])

  // *START EFFECT
  useEffect(() => {
    freshComponent()
  }, [page, sortField, sortOrder, rows, filters])

  // *SORT CALLBACK
  const onSortChange = (e) => {
    if (options.onSortChange) options.onSortChange(e)
    if (e.sortKey) setSortKey(e.sortKey)
    setSortField(e.sortField)
    setSortOrder(e.sortOrder)
  }

  // *PAGE CALLBACK
  const onPageChange = (e, index) => {
    if (e.page !== page) {
      setPage(e.page)
      setFirst(e.first)
      setRows(e.rows)
      if (options.onPageChange) options.onPageChange(e, index)
    }
  }

  //* FILTER CALLBACK
  const onFilterChange = (e) => {
    if (e.filters) setFilters(e.filters)
    if (options.onFilterChange) options.onFilterChange(e)
  }

  // *GLOBAL FILTER CALLBACK
  // const onGlobalFilterChange = (e) => {
  //   const value = e.target.value
  //   let _filters = {}
  //   _filters = { ...filters }
  //   setGlobalFilterValue(value)
  //   setFilters(_filters)
  //   setGlobalFilterValue(value)
  // }

  const onGlobalFilterChange = (e) => {
    setGlobalFilterValue(e.target.value)
  }

  // *LAYOUT CALLBACK
  const onChangeLayout = (newLayout) => {
    setLayout(newLayout)
  }

  // *PEERPAGE CALLBACK
  const onChangePeerPageCallback = (e) => {
    setFirst(0)
    setRows(e.value)
  }

  const getGlobalFiltersFields = () => {
    return Object.keys(filters).filter(function (item) {
      return item !== 'global'
    })
  }

  const itemTemplate = (row, actualLayout) => {
    return options.templates[actualLayout](row)
  }

  return (
    <div>
      {/* {
                console.log('sortField', sortField, 'sortOrder', sortOrder)
            }
            {
                console.log('sortKey', sortKey, 'layout', layout, 'device', deviceSize, 'results', results, 'first', first, 'rows', rows, 'total', totalRecords, 'options', options)
            } */}
      {
        layout === 'grid' || layout === 'list' ? (
          <DataView
            className='mdz-dataview-component'
            ref={dataViewRef}
            loading={loading}
            value={results}
            layout={layout}
            itemTemplate={itemTemplate}
            header={header(
              title,
              loading,
              layout,
              onChangeLayout,
              globalFilterValue,
              onGlobalFilterChange,
              options.export,
              options.sorts,
              sortKey,
              onSortChange,
              undefined,
              options.sorts,
              options.add,
              lastDeviceSize,
              options.search
            )}
            footer={footer(
              first,
              rows,
              totalRecords,
              onPageChange,
              peerPageOptions,
              onChangePeerPageCallback,
              options.pagination,
              deviceSize
            )}
          />
        ) : (
          <DataTable
            className='mdz-datatable-component'
            ref={dataTableRef}
            loading={loading}
            header={header(
              title,
              loading,
              layout,
              onChangeLayout,
              globalFilterValue,
              onGlobalFilterChange,
              options.export,
              dataTableRef,
              exportOverPanelRef,
              !options.export ? [] : results,
              exportColumns,
              options.sorts,
              options.add,
              lastDeviceSize,
              options.search
            )}
            value={results}
            filters={filters}
            exportFilename={!options.export ? '' : options.export.fileName}
            globalFilterFields={getGlobalFiltersFields()}
            filterDisplay={options.filterDisplay || 'row'}
            footer={footer(
              first,
              rows,
              totalRecords,
              onPageChange,
              peerPageOptions,
              onChangePeerPageCallback,
              options.pagination,
              deviceSize
            )}
            onSort={onSortChange}
            onFilter={onFilterChange}
            sortField={sortField}
            sortOrder={sortOrder}
          >
            {templates.columns.map((col) => (
              <Column
                key={col.field}
                dataType={col.dataType || undefined}
                field={col.field}
                filter={col.filter || false}
                filterField={col.filterField}
                filterElement={col.filterElement || undefined}
                filterFunction={col.filterFunction || undefined}
                showFilterOperator={col.showFilterOperator || false}
                showFilterMatchModes={col.showFilterMatchModes || false}
                showAddButton={col.showAddButton || false}
                sortable={col.sortable || false}
                sortField={col.sortField}
                header={col.header}
                headerStyle={col.headerStyle || {}}
                headerClassName={col.headerClassName || ''}
                body={col.body}
                bodyStyle={col.bodyStyle || {}}
                bodyClassName={col.bodyClassName || ''}
              />
            ))}
          </DataTable>
        )
      }
      {
        <style>{`.mdz-datatable-component, .mdz-dataview-component{height: ${options.height} !important;}`}</style>
      }
    </div>
  )
}

View.propTypes = {
  // *Options of component
  options: PropTypes.oneOfType([
    PropTypes.instanceOf(DataviewOptions),
    PropTypes.object
  ]).isRequired
}

export default View
