import React, { useState } from "react"
import TreeViewData from "../treeview"

// *STYLES

const TreeCall = () => {
  const [situation, setSituation] = useState(true)
  const [situationOne, setSituationOne] = useState(false)
  const [situationTwo, setSituationTwo] = useState(false)
  const [situationThree, setSituationThree] = useState(true)

  const tree = [
    {
      referencia: "1",
      descricao: "PAI UM",
      observacao: "Custo",
      icon: "pi pi-chevron-circle-right",
      situacao: situation,
      tipo: "Entrada",
      children: []
    },
    {
      referencia: "2",
      descricao: "PAI DOIS",
      observacao: "Parcial",
      icon: "pi pi-chevron-circle-right",
      situacao: situationOne,
      tipo: "Entrada",
      children: [
        {
          referencia: "2-1",
          descricao: "FILHO UM ",
          observacao: "parcial-parcial",
          situacao: situationTwo,
          icon: "pi pi-chevron-circle-right",
          children: [
            {
              referencia: "2-1-1",
              descricao: "NETO UM",
              observacao: "Custo",
              icon: "pi pi-chevron-circle-right",
              situacao: situationThree,
              tipo: "Entrada",
              children: []
            }
          ]
        }
      ]
    }
  ]

  const opt = {
    callback: (e) => {
      console.log("event callback", e)
    },
    search: (e) => {
      console.log("event search", e)
    },
    nodeSelected: (e) => {
      console.log("event selected", e)

      switch (e.key) {
        case "1":
          setSituation(e.data.situation)
          break
        case "2":
          setSituationOne(e.data.situation)
          break
        case "2-1":
          setSituationTwo(e.data.situation)
          break
        case "2-1-1":
          setSituationThree(e.data.situation)
          break
      }
    },
    addLevelKey: (e) => {
      console.log("event addLevel", e)
    },
    editKey: (e) => {
      console.log("event edit Key", e)
    },
    tree
  }

  return (
    <div>
      <TreeViewData
        props={{
          tree: opt.tree,
          callback: opt.callback,
          nodeSelected: opt.nodeSelected,
          addLevelKey: opt.addLevelKey,
          editKey: opt.editKey
        }}
      />
    </div>
  )
}

export default TreeCall
