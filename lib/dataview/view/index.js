import React, { useState, useEffect, useRef, useImperativeHandle, forwardRef } from "react"
import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column"
import { DataView } from "primereact/dataview"
import PropTypes from "prop-types"

// *Controllers
import DataviewRequest from "../controller/DataviewRequest"
import DataviewDeviceSize from "../controller/DataviewDeviceSize"
import DataviewResponsive from "../controller/DataviewResponsive"

// *Models
import DataviewOptions, { supportedLayouts } from "../model/DataviewOptions"
import DataviewRequestEvent from "../model/DataviewRequestEvent"

// *HEADER
import { header } from "./header"

// *FOOTER
import { footer } from "./footer"

/**
 * View component
 *
 * @param {Object|DataviewOptions} props.options view options
 * @param {Array} props.values
 * @param {Function} props.onChangeValues
 * @returns {JSX.Element}
 */
const View = forwardRef((props, ref) => {
  /**
   * Component options
   * @type {DataviewOptions}
   */
  const options = props.options.build ? props.options : new DataviewOptions(props.options)
  const templates = options.templates

  // *REFERENCES
  const dataTableRef = useRef(null)
  const dataViewRef = useRef(null)
  const exportOverPanelRef = useRef(null)

  const exportColumns = options.templates.columns
    ? options.templates.columns.map((col) => {
      return { title: col.header, dataKey: col.field, exportable: col.exportable }
    }).filter((col) => {
      return col.exportable
    })
    : []

  // *LAYOUTS
  const [layout, setLayout] = useState(options.type)
  const [localLayout, setLocalLayout] = useState(localStorage.getItem(btoa(`${window.location.pathname}|mdz-dataview-layout`)))
  const [loading, setLoading] = useState(true)
  const [title] = useState(options.title || false)

  // *PAGINATION
  const [peerPageOptions] = useState(options.pagination.peerPageOptions)
  const [page, setPage] = useState(0)
  const [first, setFirst] = useState(0)
  const [rows, setRows] = useState(options.pagination.peerPage || 5)
  const [totalRecords, setTotalRecords] = useState(0)

  // *SORTS
  const [sortKey, setSortKey] = useState("")
  const [sortField, setSortField] = useState(options.sorts.sortField || null)
  const [sortOrder, setSortOrder] = useState(options.sorts.sortOrder || 1)
  const [sortBus, setSortBus] = useState({
    sortKey,
    sortField,
    sortOrder
  })

  // * FILTERS
  const [filters, setFilters] = useState(options.filters || [])

  // *GLOBAL FILTER
  const [globalFilterValue, setGlobalFilterValue] = useState(options.search.value || "")
  const [lastSearch, setLastSearch] = useState(options.search.value || "")

  // *DATAVIEW RESULTS
  const [results, setResults] = useState([])
  const [values, setValues] = useState(props.values || [])

  // *RESPONSIVE
  const lastDeviceSize = DataviewDeviceSize()
  const [deviceSize, setDeviceSize] = useState(lastDeviceSize)

  // *EXPAND
  const [expandedRows, setExpandedRows] = useState(null)

  // *RESPONSIVE LAYOUTS
  useEffect(() => {
    if (typeof lastDeviceSize.width === "number" && typeof lastDeviceSize.height === "number" && options.responsive) {
      setDeviceSize(lastDeviceSize)
      if (!(localLayout && supportedLayouts.includes(localLayout))) {
        DataviewResponsive(
          (viewportLayout) => {
            if (layout !== viewportLayout && Object.keys(templates).map((layout) => {
              return layout === 'columns' ? 'table' : layout
            }).includes(viewportLayout)) {
              setLayout(viewportLayout)
            }
          },
          options.type,
          lastDeviceSize,
          options.responsive
        )
      }
    }
  }, [lastDeviceSize])

  // *FRESH THE COMPONENT
  const freshComponent = async (_page) => {
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
          page: _page ? _page : page,
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
      setValues(request.content)
      setTotalRecords(request.total)
    }

    setLastSearch(globalFilterValue)
    setLoading(false)
  }

  // *EFFECT TO USE VALUES
  if (props.onChangeValues) {
    useEffect(() => {
      props.onChangeValues(results)
    }, [results])
  }

  // *EFFECT TO RETRIVRE LAYOUT FROM LOCALSTORAGE
  useEffect(() => {
    if (localLayout && supportedLayouts.includes(localLayout) && Object.keys(templates).map((layout) => {
      return layout === 'columns' ? 'table' : layout
    }).includes(localLayout)) setLayout(localLayout)
  }, [])

  // *EFFECT TO SEARCH WHEN USER STOPS TYPING
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (lastSearch !== globalFilterValue) freshComponent()
    }, 1500)
    return () => clearTimeout(delayDebounceFn)
  }, [globalFilterValue])

  // *START EFFECT
  useEffect(() => {
    freshComponent()
  }, [page, sortField, sortKey, sortOrder, rows, filters])

  // *SORT CALLBACK
  const onSortChange = (e) => {
    setSortKey(e.sortKey)
    setSortField(e.sortField)
    setSortOrder(e.sortOrder)
    setSortBus({
      sortKey: e.sortKey,
      sortField: e.sortField,
      sortOrder: e.sortOrder
    })
    if (options.onSortChange) options.onSortChange(e)
  }

  // *PAGE CALLBACK
  const onPageChange = (e, index) => {
    setPage(e.page)
    setFirst(e.first)
    setRows(e.rows)
    if (options.onPageChange) options.onPageChange(e, index)
  }

  //* FILTER CALLBACK
  const onFilterChange = (e) => {
    if (e.filters) setFilters(e.filters)
    if (options.onFilterChange) options.onFilterChange(e)
  }

  // *REFRESH THE RESULTS
  const onRefresh = () => {
    setPage(0)
    setFirst(0)
    setRows(rows)
    localStorage.removeItem(btoa(`${window.location.pathname}|mdz-dataview-layout`))
    setLocalLayout(null)
    setLayout(options.type)
  }

  // * REFRESH COMPONENT FROM OUTSIDE
  useImperativeHandle(ref, () => ({
    refresh() {
      freshComponent()
    }
  }))

  // *GLOBAL FILTER CHANGE
  const onGlobalFilterChange = (e) => {
    setGlobalFilterValue(e.target.value)
  }

  // *LAYOUT CALLBACK
  const onChangeLayout = (newLayout) => {
    setLayout(newLayout)
    localStorage.setItem(btoa(`${window.location.pathname}|mdz-dataview-layout`), newLayout)
  }

  // *PEERPAGE CALLBACK
  const onChangePeerPageCallback = (e) => {
    setPage(0)
    setFirst(0)
    setRows(e.value)
  }

  const getGlobalFiltersFields = () => {
    return Object.keys(filters).filter(function (item) {
      return item !== "global"
    })
  }

  const onRowExpand = (event) => {
    if (options.onRowExpand) options.onRowExpand(event)
    if (options.onRowCollapse) options.onRowCollapse(event)
  }

  const onRowCollapse = () => { }

  const onExpandAll = () => {
    const _expandedRows = {}
    results.forEach((r) => {
      if (options.expand.expander(r)) {
        _expandedRows[`${r[options.dataKey]}`] = true
      }
    })
    setExpandedRows(_expandedRows)
  }

  const onCollapseAll = () => {
    setExpandedRows(null)
  }

  const itemTemplate = (row, actualLayout) => {
    return options.templates[actualLayout](row)
  }

  const defaultEmpty = () => {
    return <div>Nenhum resultado foi encontrado.</div>
  }

  return (
    <React.Fragment>
      {layout === "grid" || layout === "list" ? (
        <DataView
          className="mdz-dataview-component"
          ref={dataViewRef}
          loading={loading}
          value={values}
          layout={layout}
          itemTemplate={itemTemplate}
          header={header(
            title,
            loading,
            options.responsive,
            layout,
            onChangeLayout,
            globalFilterValue,
            onGlobalFilterChange,
            options.export,
            options.sorts,
            sortBus,
            onSortChange,
            undefined,
            options.sorts,
            options.add,
            lastDeviceSize,
            options.search,
            onRefresh,
            options.refresh,
            onExpandAll,
            onCollapseAll,
            options.expand,
            templates
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
          expandedRows={expandedRows}
          onRowToggle={(e) => setExpandedRows(e.data)}
          onRowExpand={onRowExpand}
          onRowCollapse={onRowCollapse}
          rowExpansionTemplate={templates.expand || ""}
          dataKey={options.dataKey || "id"}
          size={options.size || "normal"}
          className="mdz-datatable-component"
          scrollable={options.scrollable || true}
          emptyMessage={templates.empty || defaultEmpty}
          ref={dataTableRef}
          loading={loading}
          header={header(
            title,
            loading,
            options.responsive,
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
            options.search,
            onRefresh,
            options.refresh,
            onExpandAll,
            onCollapseAll,
            options.expand,
            templates
          )}
          value={results}
          filters={filters}
          exportFilename={!options.export ? "" : options.export.fileName}
          globalFilterFields={getGlobalFiltersFields()}
          filterDisplay={options.filterDisplay || "row"}
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
          {options.expand ? (
            <Column
              expander={options.expand.expander}
              frozen={options.expand.frozen}
              style={{ minWidth: "50px", maxWidth: "50px" }}
            />
          ) : (
            null
          )}
          {templates.columns.map((col, index) => (
            <Column
              key={index}
              style={col.style || {}}
              dataType={col.dataType || undefined}
              field={col.field}
              filter={col.filter || false}
              filterField={col.filterField}
              filterElement={col.filterElement || undefined}
              filterFunction={col.filterFunction || undefined}
              frozen={col.frozen || false}
              showFilterOperator={col.showFilterOperator || false}
              showFilterMatchModes={col.showFilterMatchModes || false}
              showAddButton={col.showAddButton || false}
              sortable={col.sortable || false}
              sortField={col.sortField}
              header={col.header}
              headerStyle={col.headerStyle || {}}
              headerClassName={col.headerClassName || ""}
              body={col.body}
              bodyStyle={col.bodyStyle || {}}
              bodyClassName={col.bodyClassName || ""}
              exportable={col.exportable || true}
            />
          ))}
        </DataTable>
      )}
      {
        <style>{`
        .mdz-datatable-component, .mdz-dataview-component
          {
            height: ${options.height} !important;
          }
        `}</style>
      }
    </React.Fragment>
  )
})

View.propTypes = {
  values: PropTypes.array,
  onChange: PropTypes.func,
  // *Options of component
  options: PropTypes.oneOfType([PropTypes.instanceOf(DataviewOptions), PropTypes.object]).isRequired
}

export default View
