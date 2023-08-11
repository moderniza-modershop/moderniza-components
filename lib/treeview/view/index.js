import React, { useState, forwardRef, useImperativeHandle, useEffect } from "react"

import TreeViewData from "./components/treeview"
import TreeViewTable from "./components/treetable"

const View = forwardRef(
  ({ tree, callback, setNodeSelected, setAddLevelKey, setEditKey, changeTypeView, button }, ref) => {
    const [typeView, setTypeView] = useState(false)
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
            callback={callback}
            setNodeSelected={setNodeSelected}
            setTypeViewList={setTypeView}
            setAddLevelKey={setAddLevelKey}
            setEditKey={setEditKey}
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
          />
        )
      }
    }
    return <div>{renderTree(typeView)}</div>
  }
)

export default View
