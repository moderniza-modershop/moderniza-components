import { InputText } from 'primereact/inputtext'
import { InputNumber } from 'primereact/inputnumber'

const columns = [
    {
        header: 'Coluna fixa',
        field: 'api_model',
        sortable: false,
        style: { minWidth: '500px' },
        frozen: true,
        sortField: '',
        filter: false,
        filterField: '',
        exportable: false,
        body: () => {
            return <span className="text-2xl font-semibold">Valor fixado na esquerda, veja como é legal congelar um valor</span>
        }
    },
    {
        header: 'Titulo',
        style: { minWidth: '150px' },
        field: 'id',
        sortable: false,
        sortField: '',
        filter: false,
        filterField: '',
        body: () => {
            return <span className="text-2xl font-semibold">Um texto</span>
        }
    },
    {
        header: 'Descrição',
        style: { minWidth: '400px' },
        field: 'id',
        sortable: false,
        sortField: '',
        filter: false,
        filterField: '',
        body: () => {
            return <span className="text-2xl font-semibold">Um texto um pouco maior para ocupar espaço</span>
        }
    },
    {
        header: 'Price',
        style: { width: '500px' },
        field: 'price',
        sortable: false,
        sortField: '',
        filter: false,
        filterField: '',
        body: (row) => {
            return <span className="text-2xl font-semibold">{row.price}</span>
        }
    },
    {
        header: 'Discount',
        field: 'price',
        sortable: false,
        sortField: '',
        filter: false,
        filterField: '',
        body: (row) => {
            return <span className="text-2xl font-semibold">{row.price}</span>
        }
    },
    {
        header: 'Scale',
        field: 'scale',
        sortable: false,
        sortField: '',
        filter: false,
        filterField: '',
        body: (row) => {
            return <span className="text-2xl font-semibold">{row.scale}</span>
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