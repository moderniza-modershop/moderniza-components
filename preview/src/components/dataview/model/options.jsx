/* eslint-disable no-unused-vars */
import getData from '../controller/getData'
import list from '../view/layouts/list'
import grid from '../view/layouts/grid'
import columns from '../view/layouts/table'
import expand from '../view/layouts/expand'

import { FilterOperator, FilterMatchMode } from 'primereact/api'

export default {
    title: false,
    type: 'table',
    height: 'calc(100vh - 150px)',
    filterDisplay: 'menu',
    scrollable: true,
    dataKey: "id",
    expand: {
        expander: (row) => {
            // mostra apenas o expand se o ID for impar
            return row.id % 2 === 0
        },
        frozen: true
    },
    templates: {
        columns,
        list,
        grid,
        expand
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
                label: 'Score ascendente',
                value: 'score_ascending',
                sorts: {
                    sortOrder: 1,
                    sortField: '_score'
                }
            },
            {
                label: 'Score descendente',
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
                price: Math.floor(Math.random() * 1000000000000),
                scale: Math.floor(Math.random() * 1000000000000)
            }
        })

        return {
            content: newData,
            total
        }

    },
    add: {
        onClick: () => {
            alert('você clicou!')
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
    },
    onRowExpand: (ev) => {
        console.log('onRowExpandExternal', ev);
    },
    onRowCollapse: (ev) => {
        console.log('onRowCollapseExternal', ev);
    }
}