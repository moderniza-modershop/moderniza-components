import React, { useRef, useState } from "react"
import { TreeView, Utils } from "@moderniza-components"

const TreeViewSample = () => {
  const treeCallRef = useRef()
  const [situation, setSituation] = useState(true)
  const [situationOne, setSituationOne] = useState(false)
  const [situationTwo, setSituationTwo] = useState(false)
  const [situationThree, setSituationThree] = useState(true)
  const [tree, setTree] = useState([])
  const button = true

  const recarregar = () => {
    if (Utils.readyRef(treeCallRef)) treeCallRef.current.refresh()
    carregarTree()
  }

  const limpar = () => {
    if (Utils.readyRef(treeCallRef)) treeCallRef.current.refresh()
    setTree([])
  }

  const carregarTree = () => {
    setTree([
      {
        id: 1,
        referencia: "1",
        descricao: "PAI UM",
        observacao: "Custo",
        icon: situation ? "pi pi-power-off text-success" : "pi pi-ban text-danger",
        situacao: situation,
        tipo: "Entrada",
        children: []
      },
      {
        id: 2,
        referencia: "2",
        descricao: "PAI DOIS",
        observacao: "Parcial",
        icon: situationOne ? "pi pi-power-off text-success" : "pi pi-ban text-danger",
        situacao: situationOne,
        tipo: "Entrada",
        children: [
          {
            id: 3,
            referencia: "2-1",
            descricao: "FILHO UM ",
            observacao: "parcial-parcial",
            situacao: situationTwo,
            icon: situationTwo ? "pi pi-power-off text-success" : "pi pi-ban text-danger",
            children: [
              {
                id: 4,
                referencia: "2-1-1",
                descricao: "NETO UM",
                observacao: "Custo",
                icon: situationThree ? "pi pi-power-off text-success" : "pi pi-ban text-danger",
                situacao: situationThree,
                tipo: "Entrada",
                children: []
              }
            ]
          }
        ]
      }
    ])
  }

  const opt = {
    callback: (e) => {
      console.log("event callback", e)
    },
    search: (e) => {
      console.log("event search", e)
    },
    typeView: (e) => {
      console.log("event typeView", e)
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
      <div className="mb-2">
        <button
          className="btn btn-primary mx-1"
          onClick={() => {
            recarregar()
          }}
        >
          Recarregar
        </button>

        <button
          className="btn btn-primary"
          onClick={() => {
            limpar()
          }}
        >
          Limpar
        </button>
      </div>
      <TreeView
        tree={tree}
        options={{
          callback: opt.callback,
          nodeSelected: opt.nodeSelected,
          addLevelKey: opt.addLevelKey,
          editKey: opt.editKey,
          setTypeView: opt.typeView,
          button
        }}
        // onChangeValues={(state) => {
        //   if (state) setValues(state)
        // }}
        ref={treeCallRef}
      />
    </div>
  )
}

export default TreeViewSample
