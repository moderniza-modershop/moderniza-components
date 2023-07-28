import React, { useState } from "react"

import TreeViewData from "./components/treeview"
import TreeViewTable from "./components/treetable"

const View = ({ title, tree, callback, setNodeSelected }) => {
  const [typeView, setTypeView] = useState(true)

  return (
    <div>
      {typeView ? (
        <TreeViewData
          title={title}
          tree={tree}
          callback={callback}
          setNodeSelected={setNodeSelected}
          setTypeViewList={setTypeView}
        />
      ) : (
        <TreeViewTable
          title={title}
          tree={tree}
          callback={callback}
          setNodeSelected={setNodeSelected}
          setTypeViewList={setTypeView}
        />
      )}
    </div>
  )
}

export default View
