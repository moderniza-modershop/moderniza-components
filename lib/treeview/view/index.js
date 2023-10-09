import React, { useState, forwardRef, useImperativeHandle, useEffect } from "react"

import TreeViewData from "./components/treeview"
import TreeViewTable from "./components/treetable"

const View = forwardRef(({ tree, columns, callback, setNodeSelected, changeTypeView, button, hide_ref }, ref) => {
  const [typeView, setTypeView] = useState(true)
  const [result, setResult] = useState([])

  useEffect(() => {
    setResult(tree)
  }, [tree])

  const freshComponent = () => {
    setResult(tree)
  }

  useImperativeHandle(ref, () => ({
    refresh() {
      freshComponent()
    }
  }))

  changeTypeView(typeView)

  const renderTree = (value) => {
    if (value) {
      return (
        <TreeViewTable
          tree={result}
          columns={columns}
          callback={callback}
          setNodeSelected={setNodeSelected}
          setTypeViewList={setTypeView}
          button={button}
        />
      )
    } else {
      return (
        <TreeViewData
          tree={result}
          callback={callback}
          setNodeSelected={setNodeSelected}
          setTypeViewList={setTypeView}
          button={button}
          hide_ref={hide_ref}
        />
      )
    }
  }
  return <div>{renderTree(typeView)}</div>
})

export default View
