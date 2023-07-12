# Dataview

[[Retornar]](../README.md)

## TODO:

O que ainda falta documentar:

- [ ] Valores padrões passados dentro do `DataviewOptions`
- [ ] Terminar exemplo prático
- [ ] Ajustar diagrama: adicionar estrutura do (view)


Componente dinâmico criado através dos componentes do primereact **Dataview** e **Datatable**

## Utilização

Para você utilizar o componente é necessário passar um objeto com as instruções iniciais do componente. Através desse objeto ele é configurado e executado

**Exemplo:**

```jsx
import 'moderniza-components/dist/index.css'
import { Dataview } from 'moderniza-components'

const exempleUseOne = () =>{
    const options = {
        // ...options
    }

    return (
        <Dataview options={options}/>
    )
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
| sorts | --- | --- | --- | --- |
| sorts.visible | `Boolean` | Visibilidade do botão | --- | --- |
| sorts.placeholder | `String` | Texto do dropdown de ordenação | --- | --- |
| sorts.optionLabel | `String` | Chave do campo que representa o texto da opção | --- | --- |
| sorts.className | `String` | Classe CSS | --- | --- |
| sorts.style | `Object` | Style do dropdown | --- | --- |
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
| add | `Object` | Objeto de configuração do botão 'novo' | --- | --- |
| add.label | `String` | Texto do botão | --- | --- |
| add.icon | `String` | Icone do botão | --- | --- |
| add.severity | `String` | Severidade do botão | `'success'`, `'help'`, `'warning'`, `'secondary'`, `'info'`, `'danger'` | ---- |
| add.className | `String` | Classe CSS do botão | --- | --- |
| add.style | `Object` | Style do botão | --- | --- |
| add.onClick | `Function(event)` | Função ao clicar no botão | --- | --- |
| add.visible | `Boolean` | Visibilidade do botão | --- | --- |
| add.size | `String` | Tamanho do botão | `'small'`, `'large'` | --- |
| export | `Object` | Objeto de configuração do botão 'exportar' | --- | --- |
| export.visible | `Boolean` | Visibilidade do botão | --- | --- |
| export.type | `String` | Tipo de exportação | `'csv'`, `'xlsx'`, `'pdf'` | --- |
| export.size | `String` | Tamanho do botão | `'small'`, `'large'` | --- |
| export.severity | `String` | Severidade do botão | `'success'`, `'help'`, `'warning'`, `'secondary'`, `'info'`, `'danger'` | ---- |
| export.icon | `String` | Icone do botão | --- | --- |
| export.label | `String` | Texto do botão | --- | --- |
| export.extensions | `String[]` | Extensões que poderão ser exportadas | `'csv'`, `'xlsx'`, `'pdf'` | --- |
| export.xlsx | `Objeto` | Objeto de configuração do botão 'exportar planilha' | --- | --- |
| export.xlsx.type | `String` | Tipo do botão |  `"button"`, `"submit"`, `"reset"`, `undefined` | --- |
| export.xlsx.className | `String` | Classe CSS do botão | --- | --- |
| export.xlsx.size | `String` | Tamanho do botão | `'small'`, `'large'` | --- |
| export.xlsx.severity | `String` | Severidade do botão | `'success'`, `'help'`, `'warning'`, `'secondary'`, `'info'`, `'danger'` | ---- |
| export.xlsx.label | `String` | Texto do botão | --- | --- |
| export.xlsx.icon | `String` | Icone do botão | --- | --- |
| export.xlsx.style | `Object` | Style do botão | --- | --- |
| export.pdf | `Objeto` | Objeto de configuração do botão 'exportar documento' | --- | --- |
| export.pdf.type | `String` | Tipo do botão |  `"button"`, `"submit"`, `"reset"`, `undefined` | --- |
| export.pdf.className | `String` | Classe CSS do botão | --- | --- |
| export.pdf.size | `String` | Tamanho do botão | `'small'`, `'large'` | --- |
| export.pdf.severity | `String` | Severidade do botão | `'success'`, `'help'`, `'warning'`, `'secondary'`, `'info'`, `'danger'` | ---- |
| export.pdf.label | `String` | Texto do botão | --- | --- |
| export.pdf.icon | `String` | Icone do botão | --- | --- |
| export.pdf.style | `Object` | Style do botão | --- | --- |
| export.csv | `Objeto` | Objeto de configuração do botão 'exportar arquivo' | --- | --- |
| export.csv.type | `String` | Tipo do botão |  `"button"`, `"submit"`, `"reset"`, `undefined` | --- |
| export.csv.className | `String` | Classe CSS do botão | --- | --- |
| export.csv.size | `String` | Tamanho do botão | `'small'`, `'large'` | --- |
| export.csv.severity | `String` | Severidade do botão | `'success'`, `'help'`, `'warning'`, `'secondary'`, `'info'`, `'danger'` | ---- |
| export.csv.label | `String` | Texto do botão | --- | --- |
| export.csv.icon | `String` | Icone do botão | --- | --- |
| export.csv.style | `Object` | Style do botão | --- | --- |

## Diagrama de fluxo
 
![imagem do diagrama](/docs/diagrams/out/dataview/dataviewDiagram.svg)