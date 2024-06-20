import React, { useState, useEffect, Fragment } from "react"
import { TreeTable } from "primereact/treetable"
import { Column } from "primereact/column"
import { Button } from "primereact/button"
import { classNames } from "primereact/utils"

import { InputText } from "primereact/inputtext"
import { Card, CardBody, Col, Row } from "reactstrap"
import { isMobile } from "../../../utils"

export default function TemplateDemo({
  tree,
  columns,
  callback,
  setNodeSelected,
  setTypeViewList,
  button,
  expandableSelected,
  setExpandableSelected,
  filterButton,
  callbackFilter
}) {
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
        situation: row.situacao,
        logo: row.logo
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
    if (expandableSelected) expandAll()
    else collapseAll()
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

  const renderMobile = () => {
    return (
      <Fragment>
        <Row className="mx-0 px-0 my-1">{filterSearch()}</Row>
        <Row>
          <Col xs="4" md="4" lg="4" className="d-flex justify-content-start align-itens-center my-auto">
            <span className="p-buttonset my-auto w-100">
              <Button
                size="small"
                icon={"pi pi-bars"}
                outlined={typeView}
                className="w-50"
                onClick={() => {
                  setTypeViewList(false)
                  setTypeView(false)
                }}
                style={{ borderRadius: "8px" }}
              />
              <Button
                size="small"
                icon={"pi pi-table"}
                outlined={!typeView}
                className="w-50"
                onClick={() => {
                  setTypeViewList(true)
                  setTypeView(true)
                }}
                style={{ borderRadius: "8px" }}
              />
            </span>
          </Col>
          <Col xs="4" md="4" lg="4" className="d-flex justify-content-center align-itens-center my-auto pe-0 pl-0">
            <span className="p-buttonset my-auto w-100">
              <Button
                type="button"
                icon="pi pi-folder-open"
                size="small"
                outlined
                onClick={() => {
                  expandAll()
                  setExpandableSelected(true)
                }}
                style={{ borderRadius: "8px" }}
              />

              <Button
                type="button"
                icon="pi pi-folder"
                size="small"
                outlined
                onClick={() => {
                  collapseAll()
                  setExpandableSelected(false)
                }}
                style={{ borderRadius: "8px" }}
              />
            </span>
          </Col>
          <Col xs="4" md="4" lg="4" className="d-flex justify-content-end align-itens-center my-auto">
            {button && (
              <Button
                type="button"
                size="small"
                icon={"pi pi-plus"}
                severity="primary"
                onClick={() => callback(true)}
                style={{ borderRadius: "8px" }}
              />
            )}
            {filterButton && (
              <Button
                type="button"
                size="small"
                icon={"pi pi-filter"}
                outlined
                className=" me-50 ml-50"
                onClick={() => callbackFilter(true)}
                style={{ borderRadius: "8px" }}
              />
            )}
          </Col>
        </Row>
      </Fragment>
    )
  }

  const renderDesktop = () => {
    return (
      <Fragment>
        {search && <Row className="mx-0 px-0 d-flex justify-content-between my-1">{filterSearch()}</Row>}
        <Row>
          <Col xs="6" md="6" lg="6" className="d-flex justify-content-start align-itens-center my-auto">
            <Button
              type="button"
              icon="pi pi-search"
              size="small"
              severity="primary"
              className="me-50 mr-50"
              onClick={() => {
                setSearchInput(!search)
              }}
              style={{ borderRadius: "8px" }}
            />
            <span className="p-buttonset my-auto">
              <Button
                type="button"
                icon="pi pi-folder-open"
                size="small"
                className="ms-50 ml-50"
                outlined
                onClick={() => {
                  expandAll()
                  setExpandableSelected(true)
                }}
                style={{ borderRadius: "8px" }}
              />

              <Button
                type="button"
                icon="pi pi-folder"
                size="small"
                outlined
                onClick={() => {
                  collapseAll()
                  setExpandableSelected(false)
                }}
                style={{ borderRadius: "8px" }}
              />
            </span>
            <span className="p-buttonset my-auto ms-1 ml-1">
              <Button
                size="small"
                icon={"pi pi-bars"}
                outlined={typeView}
                onClick={() => {
                  setTypeViewList(false)
                  setTypeView(false)
                }}
                style={{ borderRadius: "8px" }}
              />

              <Button
                size="small"
                icon={"pi pi-table"}
                outlined={!typeView}
                onClick={() => {
                  setTypeViewList(true)
                  setTypeView(true)
                }}
                style={{ borderRadius: "8px" }}
              />
            </span>
          </Col>

          <Col xs="6" md="6" lg="6" className="d-flex justify-content-end align-itens-center my-auto">
            {button && (
              <Button
                type="button"
                size="small"
                label={"Novo"}
                icon={"pi pi-plus"}
                severity="primary"
                onClick={() => callback(true)}
                style={{ borderRadius: "8px" }}
              />
            )}
            {filterButton && (
              <Button
                type="button"
                size="small"
                icon={"pi pi-filter"}
                label={"Filtrar"}
                outlined
                className="ms-1 ml-1"
                onClick={() => callbackFilter(true)}
                style={{ borderRadius: "8px" }}
              />
            )}
          </Col>
        </Row>
      </Fragment>
    )
  }

  const getHeader = () => {
    return (
      <Card style={{ background: "none" }} className="mb-0">
        <CardBody className="px-50">{mobile ? renderMobile() : renderDesktop()}</CardBody>
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
