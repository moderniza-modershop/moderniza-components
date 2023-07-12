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

| Nome  | Tipo  | Descrição                                    | Valores possíveis | Padrão |
| ----- | ----- | -------------------------------------------- | ----------------- | ------ |
| value | any[] | Lista de objetos a serem exibidos na tabela. | -                 | -      |

## Diagrama

![imagem do diagrama](/docs/diagrams/out/dataview/dataviewDiagram.svg)