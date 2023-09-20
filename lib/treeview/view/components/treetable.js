import React, { useState, useEffect } from "react"
import { TreeTable } from "primereact/treetable"
import { Column } from "primereact/column"
import { Button } from "primereact/button"
import { classNames } from "primereact/utils"

import { InputText } from "primereact/inputtext"
import { Card, CardBody, Col, Row } from "reactstrap"
import { isMobile } from "../../../utils"

export default function TemplateDemo({ tree, columns, callback, setNodeSelected, setTypeViewList, button }) {
  const [nodes, setNodes] = useState([])
  const [globalFilter, setGlobalFilter] = useState("")
  const [nodeSelected, setSelectedKey] = useState()
  const [typeView, setTypeView] = useState(true)
  const [expandedKeys, setExpandedKeys] = useState({ 0: true, "0-0": true })
  const [search, setSearchInput] = useState(false)
  const mobile = isMobile()

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

  const expandNode = (node, _expandedKeys) => {
    if (node.children && node.children.length) {
      _expandedKeys[node.key] = true

      for (const child of node.children) {
        expandNode(child, _expandedKeys)
      }
    }
  }

  const collapseAll = () => {
    setExpandedKeys({})
  }

  const expandAll = () => {
    const _expandedKeys = {}

    for (const node of nodes) {
      expandNode(node, _expandedKeys)
    }

    setExpandedKeys(_expandedKeys)
  }

  useEffect(() => {
    setNodes(onChangeTree(tree))
  }, [tree])

  useEffect(() => {
    if (nodes.length > 0) {
      expandAll()
    }
  }, [nodes])

  const togglerTemplate = (node, options) => {
    if (!node) {
      return
    }

    const expanded = options.expanded
    const iconClassName = classNames("p-treetable-toggler-icon pi pi-fw text-primary", {
      "pi-chevron-right": !expanded,
      "pi-chevron-down": expanded
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

  const filterSearch = () => {
    return (
      <div className="p-input-icon-left px-0 my-auto w-100">
        <i className="pi pi-search"></i>
        <InputText
          className="w-100"
          type="search"
          onInput={(e) => setGlobalFilter(e.target.value)}
          placeholder="Pesquisar..."
        />
      </div>
    )
  }

  const getHeader = () => {
    return (
      <Card>
        <CardBody>
          <Row className="mx-0 px-0 d-flex justify-content-between my-auto">
            <Col xs="12" md="12" lg="12" className="d-flex justify-content-between align-itens-end p-0 mt-lg-0 mt-1">
              <Col className="d-flex justify-content-start align-itens-center p-0 my-auto">
                <Button
                  type="button"
                  icon="pi pi-search"
                  size="small"
                  severity="primary"
                  className="me-lg-50 mr-lg-50"
                  onClick={() => {
                    setSearchInput(!search)
                  }}
                />
                <Button
                  type="button"
                  icon="pi pi-plus"
                  size="small"
                  severity="primary"
                  outlined
                  onClick={() => expandAll()}
                />

                <Button
                  type="button"
                  icon="pi pi-minus"
                  size="small"
                  severity="secondary"
                  outlined
                  className="ms-lg-50 ml-lg-50"
                  onClick={() => collapseAll()}
                />
              </Col>
              <Col className="d-flex justify-content-end align-itens-center p-0 my-auto">
                <span className="p-buttonset my-auto">
                  <Button
                    size="small"
                    severity="primary"
                    icon={"pi pi-bars"}
                    outlined={typeView}
                    onClick={() => {
                      setTypeViewList(false)
                      setTypeView(false)
                    }}
                  />
                  <Button
                    size="small"
                    severity="primary"
                    icon={"pi pi-table"}
                    outlined={!typeView}
                    onClick={() => {
                      setTypeViewList(true)
                      setTypeView(true)
                    }}
                  />
                </span>
              </Col>
              {button && (
                <Button
                  type="button"
                  size="small"
                  label={!mobile ? "Novo" : ""}
                  icon={"pi pi-plus"}
                  severity="primary"
                  className="ms-1"
                  onClick={() => callback(true)}
                />
              )}
            </Col>
          </Row>
          {search && <Row className="mx-0 px-0 d-flex justify-content-between my-1">{filterSearch()}</Row>}
        </CardBody>
      </Card>
    )
  }

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
        header={getHeader()}
        togglerTemplate={togglerTemplate}
        filterMode="strict"
        globalFilter={globalFilter}
        tableStyle={{ minWidth: "50rem" }}
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
      >
        {columns.map((col, i) => (
          <Column
            key={i}
            field={col.field}
            header={col.header}
            style={col.style}
            expander={col.expander}
            body={col.body}
            bodyStyle={col.bodyStyle}
            sortable={col.sortable}
            headerClassName={col.className}
          />
        ))}
      </TreeTable>
    </div>
  )
}
