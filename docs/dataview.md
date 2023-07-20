# Dataview

[[Retornar]](../README.md)

Componente dinâmico criado através dos componentes do *Primereact* **Dataview** e **Datatable**

## TODO

- [x] Botão refresh
- [x] Opção frozenColumn do `datatable`
- [ ] Opção frozenRow do `datatable`
- [ ] Opção selecionar todos do `datatable`
- [ ] Opção skeleton do `datatable`
- [ ] Opção expandable do `datatable`  
- [ ] Adicionar a funcionalidade do `height` responsivo
- [ ] Adicionar a funcionalidade do `pagination.infinite`, scroll infinito (Virtual Scroller)
- [ ] Documentar a utilização dos `filters` e `fitlerDisplay`

## Utilização

Para você utilizar o componente é necessário passar um objeto com as instruções iniciais do componente. Através desse objeto ele é configurado e executado

**Exemplo de iniciação:**

```jsx
// Moderniza
import 'moderniza-components/dist/index.css'
import { Dataview } from 'moderniza-components'

// Primereact API
import { FilterMatchMode, FilterOperator } from 'primereact/api'

const exempleUseOne = () =>{
    const options = {
        // ...options
    }

    return (
        <Dataview options={options}/>
    )
}
```

### Adicionando template de colunas (tabela)

```jsx
const columns = [
    {
        header: 'Id',
        field: 'id',
        sortable: true,
        sortField: 'id',
        filter: true,
        filterField: 'id',
        filterElement: (options) => {
            return <InputText value={options.value} onChange={() => options.filterCallback(options.value, options.index)} />
        },
        body: (row) => {
            return <span className='text-2xl font-semibold'>{row.id}</span>
        }
    },
    {
        header: 'Title',
        field: 'title',
        sortable: true,
        sortField: 'title',
        body: (row) => {
            return <span className='text-2xl font-semibold'>{row.title}</span>
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
            return <span className='text-2xl font-semibold'>{row._score}</span>
        }
    }
]
```

### Adicionando template de blocos (grid)

```jsx
const grid = (row) => {
    return (
        <Col xs='12' md='6' lg='4' className='p-1'>
            <Card className='mb-0'>
                <CardBody>
                    <CardTitle tag='h5'>{row.title}</CardTitle>
                    <CardSubtitle
                        className='mb-0 text-muted'
                        tag='h6'
                    >{row.api_model}</CardSubtitle>
                </CardBody>
                <img src={'https://picsum.photos/200'} alt={row.title} />
                <CardBody>
                    <CardText>Score: {row._score}</CardText>
                </CardBody>
            </Card>
        </Col>
    )
}
```

### Adicionando template de lista (list)

```jsx
const list = (row) => {
    return (
        <Card className='mb-0 p-1'>
            <Row>
                <Col xs='auto' className='my-auto'>
                    <img className='w-9 shadow-2 rounded-circle' src={'https://picsum.photos/200'} alt={row.title} style={{ height: '50px' }} />
                </Col>
                <Col className='my-auto'>
                    <h2>Title</h2>
                    <p>{row.title}</p>
                </Col>
                <Col className='my-auto'>
                    <h2>Score</h2>
                    <p>{row._score}</p>
                </Col>
            </Row>
        </Card>
    )
}
```

### Configuração completa

```jsx

const options = {
    title: 'Artistas',
    type: 'table',
    height: 'calc(100vh - 130px)',
    templates: {
        columns,
        list,
        grid
    },
    pagination: {
        page: 0,
        peerPage: 30
    },
    filters: {
        global: { value: 'Jose', matchMode: FilterMatchMode.CONTAINS },
        id: { operator: FilterOperator.OR, constraints: [{ value: '', matchMode: FilterMatchMode.EQUALS }] },
        _score: { operator: FilterOperator.AND, constraints: [{ value: '', matchMode: FilterMatchMode.GREATER_THAN }] }
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
        lg: 'list',
        xl: 'table',
        xxl: 'table'
    },
    /**
     * Função que será executada toda vez que 
     * alguma mudança ocorrer no componente
     * 
     * @param {{pagination: {page: Number, peerPage: Number},
     * sorts:{sortField: String, sortOrder: Number},
     * filters: {value: String, operator: Object,
     * matchMode: String, constraints: {value: String,
     * matchMode: String}}[]}} event
     * @returns {Promise<{content: Array, total: Number}>}
     */
    onRequest: async (event) => {
        // async Axios, async Fetch...
        const request = await getData(event)

        // Array de resultados
        const content = request.data.data

        // Quantidade total de resultados
        const total = request.data.pagination.total

        return {
            content,
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
```

## Opções (options)

Veja abaixo as opções disponíveis para o componente

| Nome  | Tipo  | Descrição | Valores possíveis | Padrão |
| ----- | ----- | --------- | ----------------- | ------ |
| type | `String` | Tipo de visualização | `'grid'`, `'list'`, `'table'` | --- |
| height | `String` | Altura do componente | --- | `'75vh'` |
| title | `String|Boolean` | Título | --- | `''` |
| pagination | `Object` | Objeto de paginação | --- | --- |
| pagination.page | `Number` | Página atual | --- | --- |
| pagination.peerPage | `Number` | Numéro de resultados por página | --- | --- |
| pagination.peerPageOptions | `Number[]` | Opções de quantidade por página | --- | `[5, 10, 20, 30]` |
| filters | `Object[]` | Lista de filtros do datatable | --- | --- |
| filters.value | `String` | Valor do filtro | --- | --- |
| filters.matchMode | `String` | Matchmode do filtro | --- | --- |
| filters.operator | `String` | Operator do filtro | --- | --- |
| filters.contraints | `Object[]` | Contraints do filtro | --- | --- |
| filters.contraints.value | `String` | Valor do filtro contraints | --- | --- |
| filters.contraints.matchMode | `String` | Matchmode do filtro contraints | --- | --- |
| sorts | `Object` | Objeto de configuração da ordenação | --- | --- |
| sorts.visible | `Boolean` | Visibilidade do botão | --- | `true` |
| sorts.placeholder | `String` | Texto do dropdown de ordenação | --- | `'Ordenar resultados'` |
| sorts.optionLabel | `String` | Chave do campo que representa o texto da opção | --- | `'label'` |
| sorts.className | `String` | Classe CSS | --- | `''` |
| sorts.style | `Object` | Style do dropdown | --- | `{}` |
| sorts.sortField | `String` | Campo a ser ordenado | --- | --- |
| sorts.sortOrder | `Number` | Ordenação (1: ASC, -1: DESC) | `-1`, `1` | --- |
| sorts.sortOptions | `Object[]` | Opções de ordenação | --- | --- |
| sorts.sortOptions.label | `String` | Nome da opção de ordenação | --- | --- |
| sorts.sortOptions.value | `String` | Valor da opção de ordenação | --- | --- |
| sorts.sortOptions.sorts | `Object` | Instrução de ordenação | --- | --- |
| sorts.sortOptions.sorts.sortField | `String` | Campo a ser ordenado | --- | --- |
| sorts.sortOptions.sorts.sortOrder | `Number` | Ordenação (1: ASC, -1: DESC) | `-1`, `1` | --- |
| templates | `Object` | Objeto dos templates | --- | --- |
| templates.grid | `Function(row)` | Função que renderiza o conteúdo no modo `'grid'` | --- | --- |
| templates.list | `Function(row)` | Função que renderiza o conteúdo no modo `'list'` | --- | --- |
| templates.columns | `Object[]` | Opções de colunas | --- | --- |
| columns[].header | `String` | Texto do cabeçalho | --- | --- |
| columns[].field | `string` | Chave do campo na lista de dados | --- | --- |
| columns[].sortable | `boolean` | Flag que define se é possível ordenar | --- | --- |
| columns[].sortField | `string` | Chave do campo na lista de dados para ordenação | --- | --- |
| columns[].filter | `boolean` | Flag que define se o campo terá um filtro | --- | --- |
| columns[].filterField | `string` | Chave do campo na lista | --- | --- |
| columns[].filterElement | `Function` | Função que renderiza o filtro | --- | --- |
| columns[].body | `Function(row)` | Função que renderiza o conteúdo no modo `'table'` | --- | --- |
| responsive | `Object` | Obejeto de responsividade da opção de visualização `type` | --- | --- |
| responsive.xs | `String` | Tipo de visualização`type` | `'grid'`, `'list'`, `'table'` | --- |
| responsive.sm | `String` | Tipo de visualização`type` | `'grid'`, `'list'`, `'table'` | --- |
| responsive.md | `String` | Tipo de visualização`type` | `'grid'`, `'list'`, `'table'` | --- |
| responsive.lg | `String` | Tipo de visualização`type` | `'grid'`, `'list'`, `'table'` | --- |
| responsive.xl | `String` | Tipo de visualização`type` | `'grid'`, `'list'`, `'table'` | --- |
| responsive.xxl | `String` | Tipo de visualização`type` | `'grid'`, `'list'`, `'table'` | --- |
| add | `Object` | Objeto de configuração de nova entrada | --- | --- |
| add.label | `String` | Texto do botão | --- | `'Novo'` |
| add.icon | `String` | Icone do botão | --- | `'pi pi-plus'` |
| add.severity | `String` | Severidade do botão | `'success'`, `'help'`, `'warning'`, `'secondary'`, `'info'`, `'danger'` | `'primary'` |
| add.className | `String` | Classe CSS do botão | --- | `''` |
| add.style | `Object` | Style do botão | --- | `{}` |
| add.onClick | `Function(event)` | Função ao clicar no botão | --- | --- |
| add.visible | `Boolean` | Visibilidade do botão | --- | `'true'` |
| add.size | `String` | Tamanho do botão | `'small'`, `'large'` | `'small'` |
| export | `Object` | Objeto de configuração de exportar | --- | --- |
| export.visible | `Boolean` | Visibilidade do botão | --- | `true` |
| export.type | `String` | Tipo o botão | --- | `'button'` |
| export.size | `String` | Tamanho do botão | `'small'`, `'large'` | `'small'` |
| export.severity | `String` | Severidade do botão | `'success'`, `'help'`, `'warning'`, `'secondary'`, `'info'`, `'danger'` | `'success'` |
| export.icon | `String` | Icone do botão | --- | `'pi pi-file-export'` |
| export.label | `String` | Texto do botão | --- | `'Exportar'` |
| export.style | `Object` | Style do botão | --- | `{}` |
| export.fileName | `Object` | Nome do arquivo a ser exportado sem extensão | --- | --- |
| export.extensions | `String[]` | Extensões que poderão ser exportadas | `'csv'`, `'xlsx'`, `'pdf'` | --- |
| export.xlsx | `Object` | Objeto de configuração do botão exportar planilha | --- | --- |
| export.xlsx.type | `String` | Tipo do botão |  `'button'`, `'submit'`, `'reset'`, `undefined` | `'button'` |
| export.xlsx.className | `String` | Classe CSS do botão | --- | `''` |
| export.xlsx.size | `String` | Tamanho do botão | `'small'`, `'large'` | `'small'` |
| export.xlsx.severity | `String` | Severidade do botão | `'success'`, `'help'`, `'warning'`, `'secondary'`, `'info'`, `'danger'` | `'success'` |
| export.xlsx.label | `String` | Texto do botão | --- | `'Planilha (.xlsx)'` |
| export.xlsx.icon | `String` | Icone do botão | --- | `'pi pi-file-excel'` |
| export.xlsx.style | `Object` | Style do botão | --- | `{}` |
| export.pdf | `Object` | Objeto de configuração do botão exportar documento | --- | --- |
| export.pdf.type | `String` | Tipo do botão |  `'button'`, `'submit'`, `'reset'`, `undefined` | `'button'` |
| export.pdf.className | `String` | Classe CSS do botão | --- | `''` |
| export.pdf.size | `String` | Tamanho do botão | `'small'`, `'large'` | `'small'` |
| export.pdf.severity | `String` | Severidade do botão | `'success'`, `'help'`, `'warning'`, `'secondary'`, `'info'`, `'danger'` | `'primary'` |
| export.pdf.label | `String` | Texto do botão | --- | `'Documento (.pdf)'` |
| export.pdf.icon | `String` | Icone do botão | --- | `'pi pi-file-pdf'` |
| export.pdf.style | `Object` | Style do botão | --- | `{}` |
| export.csv | `Object` | Objeto de configuração do botão exportar CSV | --- | --- |
| export.csv.type | `String` | Tipo do botão |  `'button'`, `'submit'`, `'reset'`, `undefined` | `'button'` |
| export.csv.className | `String` | Classe CSS do botão | --- | `''` |
| export.csv.size | `String` | Tamanho do botão | `'small'`, `'large'` | `'small'` |
| export.csv.severity | `String` | Severidade do botão | `'success'`, `'help'`, `'warning'`, `'secondary'`, `'info'`, `'danger'` | `'secondary'` |
| export.csv.label | `String` | Texto do botão | --- | `'Arquivo (.csv)'` |
| export.csv.icon | `String` | Icone do botão | --- | `'pi pi-file'` |
| export.csv.style | `Object` | Style do botão | --- | `{}` |

## Diagrama de fluxo

<img src="/docs/diagrams/out/dataview/dataviewDiagram.svg" width="100%">
