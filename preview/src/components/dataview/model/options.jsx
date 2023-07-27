import getData from '../controller/getData'
import list from '../view/layouts/list'
import grid from '../view/layouts/grid'
import columns from '../view/layouts/table'

import { FilterOperator, FilterMatchMode } from 'primereact/api'

export default {
    title: false,
    type: 'list',
    height: 'calc(100vh - 95px)',
    filterDisplay: 'menu',
    scrollable: true,
    templates: {
        columns,
        list,
        grid
    },
    pagination: {
        visible: true,
        page: 1,
        peerPage: 5
    },
    search: {
        label: 'Pesquise pelo nome...',
        value: ''
    },
    filters: {
        title: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        id: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
        _score: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.GREATER_THAN }] }
    },
    sorts: {
        sortField: 'title',
        sortOrder: 1,
        sortOptions: [
            {
                label: 'Menor score',
                value: 'score_ascending',
                sorts: {
                    sortOrder: 1,
                    sortField: '_score'
                }
            },
            {
                label: 'Maior score',
                value: 'score_descending',
                sorts: {
                    sortOrder: -1,
                    sortField: '_score'
                }
            }
        ]
    },
    export: {
        extensions: ['xlsx', 'pdf', 'csv'],
        fileName: 'artists'
    },
    responsive: {
        xs: 'grid',
        sm: 'grid',
        md: 'list',
        lg: 'table',
        xl: 'table',
        xxl: 'table'
    },
    onRequest: async (event) => {
        const response = await getData(event)
        const content = response.data.data
        const total = response.data.pagination.total

        const newData = content.map((item) => {
            return {
                ...item,
                price: Math.floor(Math.random() * 1000),
                scale: Math.floor(Math.random() * 1000)
            }
        })

        return {
            content: newData,
            total
        }

    },
    onPageChange: (ev, index) => {
        console.log('onPageChangeExternal', ev, index)
    },
    onSortChange: (ev) => {
        console.log('onSortChangeExternal', ev)
    },
    onFilterChange: (ev) => {
        console.log('onFilterChangeExternal', ev)
    }
}