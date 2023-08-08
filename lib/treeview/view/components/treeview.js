import React, { useEffect, useState } from "react"

import { Tree } from "primereact/tree"
import { Header } from "./header"

const TreeViewData = ({ tree, callback, setNodeSelected, setTypeViewList }) => {
  const [expandedKeys, setExpandedKeys] = useState({ 0: true, "0-0": true })
  const [nodes, setNodes] = useState([])
  const [nodeSelected, setSelectedKey] = useState()
  const [search, setSearchInput] = useState(false)
  function mountTree(row) {
    return {
      key: row.referencia,
      label: row.descricao,
      data: row.observacao,
      icon: row.icon,
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
    console.log("tree", tree)
  }, [tree])

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

  const searchInput = (value) => {
    setSearchInput(value)
  }

  return (
    <div className="p-card">
      <Header
        expandAll={expandAll}
        collapseAll={collapseAll}
        setSearch={searchInput}
        callback={callback}
        setTypeViewList={setTypeViewList}
      />

      <Tree
        value={nodes}
        filter={search}
        filterMode="strict"
        filterPlaceholder="Pesquisar..."
        selectionMode="single"
        selectionKeys={nodeSelected}
        onSelectionChange={(e) => {
          setNodeSelected(e.value)
          setSelectedKey(e.value)
        }}
        // dragdropScope="demo"
        // onDragDrop={(e) => setNodes(e.value)}
        expandedKeys={expandedKeys}
        onToggle={(e) => setExpandedKeys(e.value)}
        className="w-full md:w-30rem pt-1 px-1"
        loading={!tree}
        style={{ fontWeight: "bold", fontSize: "16px" }}
      />
    </div>
  )
}

export default TreeViewData
