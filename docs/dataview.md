# Dataview

[[Retornar]](../README.md)

Componente dinâmico criado através dos componentes do primereact **Dataview** e **Datatable**.

## Utilização

Para você utilizar o componente é necessário passar um objeto com as instruções iniciais do componente. Através desse objeto ele é configurado e executado.

**Exemplo 01:**
Utilização rápida

```jsx
import { Dataview } from 'moderniza-components'

const exempleUseOne = () =>{
    const options = {
        // options...
    }

    return (
        <Dataview options={options}/>
    )
}
```

**Exemplo 02:**
Utilização com validação do options

```jsx
import {Dataview, DataviewOptions} from 'moderniza-components'

const exempleUseTwo = () =>{
    try{
        const options = new DataviewOptions({
            // options...
        })

        return (
            <Dataview options={options}/>
        )
    }catch(e){
        console.log('Ocorreu um erro ao validar options: ', e.message)
    }
}
```

## Opções (options)

| Nome  | Tipo  | Descrição | Valores possíveis | Padrão |
| ----- | ----- | --------- | ----------------- | ------ |
| type | `String` | Tipo de visualização | `'grid'`, `'list'`, `'table'` | --- |
| height | `String` | Altura do componente | --- | `75vh` |
| pagination | `Object` | Objeto de paginação | --- | --- |
| pagination.page | `Number` | Página atual | --- | --- |
| pagination.peerPage | `Number` | Numéro de resultados por página | --- | --- |
| pagination.peerPageOptions | `Number[]` | Opções de quantidade por página | --- | `[5, 10, 20, 30]` |
| filters | `Object[]` | Lista de filtros do datatable | --- | --- |
| filters[].value | `String` | Valor do filtro | --- | --- |
| filters[].matchMode | `String` | Matchmode do filtro | --- | --- |
| filters[].operator | `String` | Operator do filtro | --- | --- |
| filters[].contraints | `Object` | Contraints do filtro | --- | --- |
| filters[].contraints[].value | `String` | Valor do filtro contraints | --- | --- |
| filters[].contraints[].matchMode | `String` | Matchmode do filtro contraints | --- | --- |

## Diagrama

![imagem do diagrama](/docs/diagrams/out/dataview/dataviewDiagram.svg)