import React, { useEffect, useState, Fragment } from "react"
import Toggler from "./templates/toggler"
import { Tree } from "primereact/tree"
import { Card, CardBody, Col, Row } from "reactstrap"
import { Button } from "primereact/button"
import { isMobile } from "../../../utils"

const TreeViewData = ({
  tree,
  callback,
  setNodeSelected,
  setTypeViewList,
  button,
  hide_ref,
  expandableSelected,
  setExpandableSelected,
  filterButton,
  callbackFilter
}) => {
  const [expandedKeys, setExpandedKeys] = useState({ 0: true, "0-0": true })
  const [nodes, setNodes] = useState([])
  const [nodeSelected, setSelectedKey] = useState()
  const [search, setSearchInput] = useState(false)
  const [typeView, setTypeView] = useState()
  const mobile = isMobile()

  function mountTree(row) {
    return {
      id: row.id,
      key: row.referencia,
      label: row.descricao,
      data: row.observacao,
      is_edit: false,
      is_situation: false,
      is_reference: hide_ref,
      situacao: row.situacao,
      children: row.children,
      tipo: row.tipo,
      iconType: row.iconType,
      button
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
                outlined
                className="ms-50 ml-50"
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

  return (
    <div>
      <Card className="mb-0">
        <CardBody style={{ background: "none" }} className="px-50">
          {mobile ? renderMobile() : renderDesktop()}
        </CardBody>
      </Card>
      {nodes.length ? (
        <Card>
          <Tree
            value={nodes}
            filter={search}
            filterMode="strict"
            filterPlaceholder="Pesquisar..."
            selectionMode="single"
            selectionKeys={nodeSelected}
            onSelect={(e) => setNodeSelected(e.node)}
            onSelectionChange={(e) => {
              setSelectedKey(e.value)
            }}
            expandedKeys={expandedKeys}
            nodeTemplate={Toggler}
            onToggle={(e) => setExpandedKeys(e.value)}
            className="w-full md:w-30rem pt-1 px-1"
            style={{ fontWeight: "bold", fontSize: "16px", border: "none", background: "none" }}
          />
        </Card>
      ) : (
        <Card className="d-flex justify-content-center">
          <CardBody className="d-flex justify-content-center">
            <strong>Nenhum registro encontrado!</strong>
          </CardBody>
        </Card>
      )}
    </div>
  )
}

export default TreeViewData
