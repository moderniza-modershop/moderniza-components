import { InputText } from 'primereact/inputtext'
import { InputNumber } from 'primereact/inputnumber'

const columns = [
    {
        header: 'Id',
        field: 'id',
        sortable: false,
        sortField: '',
        filter: false,
        filterField: '',
        body: (row) => {
            return <span className="text-2xl font-semibold">{row.id}</span>
        }
    },
    {
        header: 'Title',
        field: 'title',
        sortable: true,
        sortField: 'title',
        filter: true,
        filterField: 'title',
        filterElement: (options) => {
            return <InputText value={options.value} onChange={() => options.filterCallback(options.value, options.index)} />
        },
        body: (row) => {
            return <span className="text-2xl font-semibold">{row.title}</span>
        }
    },
    {
        header: 'Score',
        field: '_score',
        dataType: 'numeric',
        sortable: true,
        sortField: '_score',
        filter: true,
        filterField: '_score',
        filterElement: (options) => {
            return <InputNumber value={options.value} onChange={() => options.filterCallback(options.value, options.index)} />
        },
        body: (row) => {
            return <span className="text-2xl font-semibold">{row._score}</span>
        }
    }
]

export default columns