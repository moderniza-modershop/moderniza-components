import React, { useEffect, useState } from "react"
import Toggler from "./templates/toggler"
import { Tree } from "primereact/tree"
import { Card, CardBody, Col, Row } from "reactstrap"
import { Button } from "primereact/button"
import { isMobile } from "../../../utils"

const TreeViewData = ({ tree, callback, setNodeSelected, setTypeViewList, button }) => {
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
    if (nodes.length > 0) {
      expandAll()
    }
  }, [nodes])

  const searchInput = (value) => {
    setSearchInput(value)
  }

  return (
    <div>
      <Card className="mb-0">
        <CardBody>
          <Row className="mx-0 px-0 d-flex justify-content-between my-auto">
            <Col xs="12" sm="12" lg="12" className="d-flex justify-content-between align-itens-center p-0 my-auto">
              <Col className="d-flex justify-content-start align-itens-center p-0 my-auto">
                <Button
                  type="button"
                  icon="pi pi-search"
                  size="small"
                  severity="primary"
                  className="me-50 mr-50"
                  onClick={() => {
                    searchInput(!search)
                  }}
                />

                <Button
                  type="button"
                  icon="pi pi-plus"
                  size="small"
                  severity="primary"
                  outlined
                  className="me-50 mr-50"
                  onClick={() => expandAll()}
                />

                <Button
                  type="button"
                  icon="pi pi-minus"
                  size="small"
                  severity="secondary"
                  outlined
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
            </Col>
          </Row>
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
            style={{ fontWeight: "bold", fontSize: "16px", border: "none" }}
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
