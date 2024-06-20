import React, { useRef, useState } from "react"
import { TreeView, Utils } from "@moderniza-components"
import { Button } from "primereact/button"
import { InputSwitch } from "primereact/inputswitch"
import { UncontrolledTooltip } from "reactstrap"

const TreeViewSample = () => {
  const treeCallRef = useRef()
  const [situation, setSituation] = useState(true)
  const [situationOne, setSituationOne] = useState(false)
  const [situationTwo, setSituationTwo] = useState(false)
  const [situationThree, setSituationThree] = useState(true)
  const [filterButton, setFilterButton] = useState(false)
  const [expandable, setExpandable] = useState(false)
  const [tree, setTree] = useState([])
  const button = true
  const hide_ref = true

  const recarregar = () => {
    if (Utils.readyRef(treeCallRef)) treeCallRef.current.refresh()
    console.log("carregar")
    carregarTree()
    setFilterButton(false)
  }

  const limpar = () => {
    if (Utils.readyRef(treeCallRef)) treeCallRef.current.refresh()
    setTree([])
    setFilterButton(false)
  }

  const carregarTree = () => {
    setTree([
      {
        id: 1,
        referencia: "1",
        descricao: "PAI UM",
        observacao: "Custo",
        icon: false ? "pi pi-arrow-circle-left text-warning" : "pi pi-arrow-circle-right text-success",
        situacao: situation,
        tipo: "1",
        logo: "https://modershop-img.s3.amazonaws.com/97146609000296/categoria/10/1260d32a-4cdb-4a9e-8fdc-e02ea0a0d17d.png",
        children: []
      },
      {
        id: 2,
        referencia: "2",
        descricao: "PAI DOIS",
        observacao: "Parcial",
        icon: true ? "pi pi-arrow-circle-left text-warning" : "pi pi-arrow-circle-right text-success",
        situacao: situationOne,
        tipo: "0",
        logo: "https://modershop-img.s3.amazonaws.com/46016454000151/categoria/339/6781f9ed-82b5-4f0f-a3da-f2d4f3c91558.png",
        children: [
          {
            id: 3,
            referencia: "2-1",
            descricao: "FILHO UM ",
            observacao: "parcial-parcial",
            situacao: situationTwo,
            icon: true ? "pi pi-arrow-circle-left text-warning" : "pi pi-arrow-circle-right text-success",
            tipo: "0",
            iconType: operationType("1"),
            logo: "https://modershop-img.s3.amazonaws.com/97146609000296/categoria/9/3bd5661a-d91e-4ef8-b431-338eee2ed100.png",
            children: [
              {
                id: 4,
                referencia: "2-1-1",
                descricao: "NETO UM",
                observacao: "Custo",
                icon: true ? "pi pi-arrow-circle-left text-warning" : "pi pi-arrow-circle-right text-success",
                situacao: situationThree,
                tipo: "0",
                iconType: operationType("0"),
                logo: "https://modershop-img.s3.amazonaws.com/46016454000151/categoria/785/a533b7e9-af87-477a-bb0a-4c79f53d488c.png",
                children: [
                  {
                    id: 5,
                    referencia: "2-1-1-1",
                    descricao: "BISNETO UM",
                    observacao: "Custo",
                    icon: true ? "pi pi-arrow-circle-left text-warning" : "pi pi-arrow-circle-right text-success",
                    situacao: situationThree,
                    tipo: "0",
                    iconType: operationType("0"),
                    logo: "https://modershop-img.s3.amazonaws.com/97146609000296/categoria/11/3fa0cb87-4228-424a-9a5a-4f8466adb261.png",
                    children: []
                  }
                ]
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
      if (typeof e.data === "object") {
        console.log("event selected object", e)
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
      }
      if (typeof e.data === "string") {
        console.log("event selected string", e)
        switch (e.key) {
          case "1":
            setSituation(e.situacao)
            break
          case "2":
            setSituationOne(e.situacao)
            break
          case "2-1":
            setSituationTwo(e.situacao)
            break
          case "2-1-1":
            setSituationThree(e.situacao)
            break
        }
      }
    },
    addLevelKey: (e) => {
      console.log("event addLevel", e)
    },
    editKey: (e) => {
      console.log("event edit Key", e)
    },
    callbackFilter: (e) => {
      console.log("event callback filter", e)
    },
    setExpandableSelected: (e) => {
      console.log("event Open Closed", e)
      setExpandable(e)
    },
    tree
  }

  const operationType = (node) => {
    return (
      <Button
        id="tooltipSituation"
        type="button"
        icon={node === "0" ? "pi pi-arrow-circle-left text-warning" : "pi pi-arrow-circle-right text-info"}
        size="small"
        severity={node === "0" ? "warning" : "success"}
        outlined
        style={{ border: "none", paddingRight: "0" }}
      >
        <UncontrolledTooltip placement="right" target="tooltipSituation">
          {node === "0" ? "Entrada" : "Saída"}
        </UncontrolledTooltip>
      </Button>
    )
  }

  const renderType = (row) => {
    return (
      <div className="flex justify-content-center align-items-center">
        <Button
          id="tooltipgerar"
          type="button"
          size="small"
          icon={row.data.type === "0" ? "pi pi-arrow-circle-left text-warning" : "pi pi-arrow-circle-right text-info"}
          severity={row.data.type === "0" ? "warning" : "info"}
          rounded
          outlined
          style={{ padding: "10px" }}
        >
          <UncontrolledTooltip placement="right" target="tooltipgerar">
            {row.data.type === "0" ? "Entrada" : "Saída"}
          </UncontrolledTooltip>
        </Button>
      </div>
    )
  }

  const RenderImageTable = (img) => {
    return <img className="user-avatar mr-1" src={img ? img : ""} alt="user profile avatar" height="40" width="40" />
  }

  const columns = [
    {
      field: "type",
      header: "Tipo",
      expander: false,
      sortable: false,
      style: { color: "black", width: "70px" },
      bodyStyle: "",
      headerClassName: "w-10rem",
      body: (row) => renderType(row)
    },
    {
      field: "",
      header: "Editar",
      style: { width: "90px" },
      expander: false,
      sortable: false,
      headerClassName: "w-10rem",
      bodyStyle: "",
      body: (row) => {
        return (
          <div className="flex flex-wrap gap-2">
            <span className="p-buttonset mx-1 my-auto">
              <Button
                type="button"
                size="small"
                icon="pi pi-pencil text-success"
                severity="primary"
                outlined
                // rounded
                onClick={() => {
                  opt.editKey(row)
                }}
                style={{ border: "none" }}
              />
            </span>
          </div>
        )
      }
    },
    {
      field: "",
      header: "Add filho",
      style: { width: "115px" },
      expander: false,
      sortable: false,
      headerClassName: "w-10rem",
      bodyStyle: "",
      body: (row) => {
        return (
          <div className="flex flex-wrap gap-2">
            <span className="p-buttonset mx-1 my-auto">
              <Button
                type="button"
                size="small"
                icon="pi pi-plus text-primary"
                outlined
                // rounded
                onClick={() => {
                  opt.addLevelKey(row)
                }}
                style={{ border: "none" }}
              />
            </span>
          </div>
        )
      }
    },
    {
      field: "key",
      header: "Referência",
      expander: true,
      sortable: false,
      style: { width: "160px", color: "primary" },
      bodyStyle: "",
      headerClassName: "w-10rem",
      body: ""
    },
    {
      field: "",
      header: "",
      expander: false,
      sortable: false,
      style: { width: "80px" },
      bodyStyle: "",
      headerClassName: "w-10rem",
      body: (row) => {
        return <div className="d-flex justify-content-left align-items-center">{RenderImageTable(row.data.logo)}</div>
      }
    },
    {
      field: "name",
      header: "Descrição",
      expander: false,
      sortable: false,
      style: { color: "black" },
      bodyStyle: "",
      headerClassName: "w-10rem",
      body: ""
    },

    {
      field: "",
      header: "Ativo",
      expander: false,
      sortable: false,
      style: { width: "80px" },
      bodyStyle: "",
      headerClassName: "w-10rem",
      body: (row) => {
        return (
          <div className="flex flex-wrap gap-2">
            <InputSwitch
              checked={row.data.situation}
              onChange={(e) => {
                row.data.situation = e.target.value
                opt.nodeSelected(row)
              }}
            />
          </div>
        )
      }
    }
  ]

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
          className="btn btn-primary mx-1"
          onClick={() => {
            setFilterButton(true)
          }}
        >
          Filtros
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
          button: button,
          hide_ref: hide_ref,
          expandableSelected: expandable,
          setExpandableSelected: opt.setExpandableSelected,
          filterButton: filterButton,
          callbackFilter: opt.callbackFilter,
          theme: "light"
        }}
        columns={columns}
        ref={treeCallRef}
      />
    </div>
  )
}

export default TreeViewSample
