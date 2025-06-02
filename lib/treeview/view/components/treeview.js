import React, { useEffect, useState, Fragment } from "react"
import Toggler from "./templates/toggler"
import { Tree } from "primereact/tree"
import { Card, CardBody, Col, Row } from "reactstrap"
import { Button } from "primereact/button"
import { isMobile } from "../../../utils"
import { useWindowSize } from "../../../utils/useWindowSize"

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
  const [typeView, setTypeView] = useState()
  const [mobile, setMobile] = useState(false)
  const [width] = useWindowSize()

  useEffect(() => {
    setMobile(isMobile())
  }, [])

  useEffect(() => {
    if (width < 768) {
      setMobile(true)
    } else {
      setMobile(false)
    }
  }, [width])

  function mountTree(row) {
    return {
      id: row.id,
      key: row.referencia,
      label: row.descricao,
      data: {
        name: row.descricao,
        key: row.referencia,
        situation: row.situacao,
        logo: row.logo,
        count: row.count 
      },
      is_edit: false,
      is_situation: false,
      is_reference: hide_ref,
      situacao: row.situacao,
      children: row.children,
      tipo: row.tipo,
      iconType: row.iconType,
      button,
      count: row.count 
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
      <div className="render-mobile w-100">
        <Row className="w-100 mx-0">
          <Col xs="auto" className="pl-0 ps-0">
            <span className="p-buttonset my-auto">
              <Button
                className="button-open-all"
                type="button"
                icon="pi pi-folder-open"
                size="small"
                outlined
                onClick={() => {
                  expandAll()
                  setExpandableSelected(true)
                }}
              />

              <Button
                className="button-close-all"
                type="button"
                icon="pi pi-folder"
                size="small"
                outlined
                onClick={() => {
                  collapseAll()
                  setExpandableSelected(false)
                }}
              />
            </span>
          </Col>
          <Col xs="auto" className="mr-auto me-auto">
            <span className="p-buttonset my-auto w-100">
              <Button
                className="button-list-view"
                size="small"
                icon={"pi pi-bars"}
                outlined={typeView}
                onClick={() => {
                  setTypeViewList(false)
                  setTypeView(false)
                }}
              />
              <Button
                className="button-table-view"
                size="small"
                icon={"pi pi-table"}
                outlined={!typeView}
                onClick={() => {
                  setTypeViewList(true)
                  setTypeView(true)
                }}
              />
            </span>
          </Col>

          <Col xs="auto" className="pe-0 pr-0">
            {button && (
              <Button
                className="button-item-close"
                type="button"
                size="small"
                icon={"pi pi-plus"}
                severity="primary"
                onClick={() => callback(true)}
              />
            )}
            {filterButton && (
              <Button
                className={`button-item-filter ${button && 'ms-1 ml-1'}`}
                type="button"
                size="small"
                icon={"pi pi-filter"}
                outlined
                onClick={() => callbackFilter(true)}
              />
            )}
          </Col>
        </Row>
      </div>
    )
  }

  const renderDesktop = () => {
    return (
      <div className="render-desktop w-100">
        <Row className="w-100 mx-0">
          <Col xs="6" md="6" lg="6" className="my-auto">
            <span className="p-buttonset my-auto">
              <Button
                className="button-open-all"
                type="button"
                icon="pi pi-folder-open"
                size="small"
                outlined
                onClick={() => {
                  expandAll()
                  setExpandableSelected(true)
                }}
              />

              <Button
                className="button-close-all"
                type="button"
                icon="pi pi-folder"
                size="small"
                outlined
                onClick={() => {
                  collapseAll()
                  setExpandableSelected(false)
                }}
              />
            </span>
            <span className="p-buttonset my-auto ms-2 ml-2">
              <Button
                className="button-list-view"
                size="small"
                icon={"pi pi-bars"}
                outlined={typeView}
                onClick={() => {
                  setTypeViewList(false)
                  setTypeView(false)
                }}
              />

              <Button
                className="button-table-view"
                size="small"
                icon={"pi pi-table"}
                outlined={!typeView}
                onClick={() => {
                  setTypeViewList(true)
                  setTypeView(true)
                }}
              />
            </span>
          </Col>

          <Col
            xs="6"
            md="6"
            lg="6"
            className="d-flex justify-content-end align-itens-center my-auto"
          >
            {button && (
              <Button
                className="button-item-add"
                type="button"
                size="small"
                label={"Novo"}
                icon={"pi pi-plus"}
                severity="primary"
                onClick={() => callback(true)}
              />
            )}
            {filterButton && (
              <Button
                className={`ms-50 ml-50 button-item-filter ${button && 'ms-1 ml-1'}`}
                type="button"
                size="small"
                icon={"pi pi-filter"}
                label={"Filtrar"}
                outlined
                onClick={() => callbackFilter(true)}
              />
            )}
          </Col>
        </Row>
      </div>
    )
  }

  return (
    <div className="tree-view">
      <Card className="mb-0 treeview-header">
        <CardBody style={{ background: "none" }}>
          {mobile ? renderMobile() : renderDesktop()}
        </CardBody>
      </Card>
      {nodes.length ? (
        <Card className="card-nodes">
          <Tree
            value={nodes}
            filter={true}
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
            style={{
              fontWeight: "bold",
              fontSize: "16px",
              border: "none",
              background: "none"
            }}
          />
        </Card>
      ) : (
        <Card className="d-flex justify-content-center card-empty">
          <CardBody className="d-flex justify-content-center">
            <strong>Nenhum registro encontrado!</strong>
          </CardBody>
        </Card>
      )}
    </div>
  )
}

export default TreeViewData
