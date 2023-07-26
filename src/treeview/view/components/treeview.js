import React, { useEffect, useState } from "react"

import { Tree } from "primereact/tree"
import { Header } from "./header"

const TreeViewData = ({ tree, callback, search, setNodeSelected }) => {
  const [expandedKeys, setExpandedKeys] = useState({ 0: true, "0-0": true })
  const [nodes, setNodes] = useState([])
  const [nodeSelected, setSelectedKey] = useState()

  useEffect(() => {
    setNodes(onChangeTree(tree))
  }, [tree])

  const onChangeTree = (tree) => {
    let list = []
    if (tree.length > 0) {
      list = tree.map((key) => roundedChildren(key))
    }

    return list
  }

  function roundedChildren(keys) {
    let mount = mountTree(keys)

    if (mount.children.length > 0) {
      mount.children = mapKeys(mount.children)
    }

    return mount
  }

  function mapKeys(keys) {
    return keys.map((key) => {
      if (key.children.length > 0) {
        return roundedChildren(key)
      } else {
        return mountTree(key)
      }
    })
  }

  function mountTree(row) {
    return {
      key: row.referencia,
      label: row.descricao,
      data: row.observacao,
      icon: row.icon,
      children: row.children
    }
  }

  const expandAll = () => {
    let _expandedKeys = {}

    for (let node of nodes) {
      expandNode(node, _expandedKeys)
    }

    setExpandedKeys(_expandedKeys)
  }

  const collapseAll = () => {
    setExpandedKeys({})
  }

  const expandNode = (node, _expandedKeys) => {
    if (node.children && node.children.length) {
      _expandedKeys[node.key] = true

      for (let child of node.children) {
        expandNode(child, _expandedKeys)
      }
    }
  }

  return (
    <div>
      <Header expandAll={expandAll} collapseAll={collapseAll} search={search} callback={callback} />
      <Tree
        value={nodes}
        selectionMode="checkbox"
        selectionKeys={nodeSelected}
        onSelectionChange={(e) => {
          setNodeSelected(e.value)
          setSelectedKey(e.value)
        }}
        dragdropScope="demo"
        onDragDrop={(e) => setNodes(e.value)}
        expandedKeys={expandedKeys}
        onToggle={(e) => setExpandedKeys(e.value)}
        className="w-full md:w-30rem"
      />
    </div>
  )
}

export default TreeViewData
