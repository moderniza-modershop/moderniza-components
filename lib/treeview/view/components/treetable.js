import React, { useState, useEffect } from "react"
import { TreeTable } from "primereact/treetable"
import { Column } from "primereact/column"
import { Button } from "primereact/button"
import { classNames } from "primereact/utils"

import { InputText } from "primereact/inputtext"
import { Card, CardBody, Col, Row } from "reactstrap"
import { InputSwitch } from "primereact/inputswitch"

export default function TemplateDemo({ tree, callback, setNodeSelected, setTypeViewList, setAddLevelKey, setEditKey }) {
  const [nodes, setNodes] = useState([])
  const [globalFilter, setGlobalFilter] = useState("")
  const [nodeSelected, setSelectedKey] = useState()
  const [typeView, setTypeView] = useState(false)
  const [expandedKeys, setExpandedKeys] = useState({ 0: true, "0-0": true })

  function mountTree(row) {
    return {
      key: row.referencia,
      id: row.id,
      data: {
        icon: row.icon,
        name: row.descricao,
        key: row.referencia,
        type: row.tipo,
        situation: row.situacao
      },

      children: row.children
    }
  }

  function mapKeys(keys) {
    return keys.map((key) => {
      if (key.children.length > 0) {
        // eslint-disable-next-line no-use-before-define
        return roundedChildren(key)
      } else {
        return mountTree(key)
      }
    })
  }

  function roundedChildren(keys) {
    const mount = mountTree(keys)

    if (mount.children.length > 0) {
      mount.children = mapKeys(mount.children)
    }

    return mount
  }

  const onChangeTree = (tree) => {
    let list = []
    if (tree.length > 0) {
      list = tree.map((key) => roundedChildren(key))
    }

    return list
  }

  useEffect(() => {
    setNodes(onChangeTree(tree))
  }, [])

  const columns = [
    { field: "key", header: "Referência", expander: true },
    { field: "name", header: "Descrição" }
  ]

  const actionTemplate = (row) => {
    return (
      <div className="flex flex-wrap gap-2">
        <InputSwitch
          checked={row.data.situation}
          onChange={(e) => {
            row.data.situation = e.target.value
            setNodeSelected(row)
          }}
        />
      </div>
    )
  }

  const actionEdit = (row) => {
    return (
      <div className="flex flex-wrap gap-2">
        <span className="p-buttonset mx-1 my-auto">
          <Button
            type="button"
            size="small"
            icon="pi pi-pencil"
            severity="primary"
            outlined
            // rounded
            onClick={() => {
              setEditKey(row)
            }}
          />
          <Button
            type="button"
            size="small"
            icon="pi pi-plus"
            // outlined
            // rounded
            onClick={() => {
              setAddLevelKey(row)
            }}
          />
        </span>
      </div>
    )
  }

  const togglerTemplate = (node, options) => {
    if (!node) {
      return
    }

    actionEdit(node)
    actionTemplate(node)

    const expanded = options.expanded
    const iconClassName = classNames("p-treetable-toggler-icon pi pi-fw text-primary", {
      "pi-caret-right ": !expanded,
      "pi-caret-down": expanded
    })

    return (
      <button
        type="button"
        className="p-treetable-toggler p-link"
        style={options.buttonStyle}
        tabIndex={-1}
        onClick={options.onClick}
      >
        <span className={iconClassName} aria-hidden="true"></span>
      </button>
    )
  }

  const getHeader = () => {
    return (
      <Card>
        <CardBody>
          <Row className="mx-0 px-0 d-flex justify-content-between my-auto">
            <Col xs="12" sm="12" lg="11" className="d-flex justify-content-between align-itens-center p-0 my-auto">
              <Col xs="8" sm="8" lg="8" className="d-flex justify-content-start align-itens-center p-0 my-auto">
                <div className="p-input-icon-left px-0 my-auto w-100">
                  <i className="pi pi-search"></i>
                  <InputText
                    className="w-100"
                    type="search"
                    onInput={(e) => setGlobalFilter(e.target.value)}
                    placeholder="Pesquisar..."
                  />
                </div>
              </Col>
              <Col xs="4" sm="4" lg="4" className="d-flex justify-content-end align-itens-center p-0 my-auto">
                <span className="p-buttonset mx-1 my-auto">
                  <Button
                    size="small"
                    severity="primary"
                    icon={"pi pi-bars"}
                    outlined={!typeView}
                    onClick={() => {
                      setTypeViewList(false)
                    }}
                  />
                  <Button
                    size="small"
                    severity="primary"
                    icon={"pi pi-table"}
                    outlined={typeView}
                    onClick={() => {
                      setTypeViewList(true)
                      setTypeView(true)
                    }}
                  />
                </span>
              </Col>
            </Col>
            <Col xs="12" sm="12" lg="1" className="d-flex justify-content-end align-itens-center p-0 my-auto">
              <Button
                style={{ width: "100%" }}
                type="button"
                size="small"
                label="Novo"
                icon={"pi pi-plus"}
                severity="primary"
                className="mt-lg-0 mt-1"
                onClick={() => callback(true)}
              />
            </Col>
          </Row>
        </CardBody>
      </Card>
    )
  }

  const header = getHeader()
  // const footer = (
  //   <div className="flex justify-content-start">
  //     {/* <Button icon="pi pi-refresh" label="Reload" severity="warning" /> */}
  //   </div>
  // )

  const message = () => {
    return (
      <Col className="d-flex justify-content-center">
        <strong>Nenhum registro encontrado!</strong>
      </Col>
    )
  }

  return (
    <div className="card">
      <TreeTable
        value={nodes}
        header={header}
        // footer={footer}
        togglerTemplate={togglerTemplate}
        filterMode={"strict"}
        globalFilter={globalFilter}
        tableStyle={{ minWidth: "50rem" }}
        // selectionMode="checkbox"
        selectionKeys={nodeSelected}
        onSelectionChange={(e) => {
          setNodeSelected(e.value)
          setSelectedKey(e.value)
        }}
        expandedKeys={expandedKeys}
        onToggle={(e) => setExpandedKeys(e.value)}
        resizableColumns
        loading={!tree}
        emptyMessage={message()}
        // showGridlines
      >
        <Column header="Editar/Adicionar" body={actionEdit} headerClassName="w-10rem" style={{ width: "120px" }} />

        {columns.map((col, i) => (
          <Column
            key={i}
            field={col.field}
            header={col.header}
            expander={col.expander}
            sortable
            bodyStyle={{ fontWeight: "bolder", fontSize: "15px" }}
            style={{ width: i === 0 ? "150px" : "300px" }}
          />
        ))}
        <Column header="Situação" body={actionTemplate} headerClassName="w-10rem" style={{ width: "80px" }} />
      </TreeTable>
    </div>
  )
}
