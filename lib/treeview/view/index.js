import React, { useState } from "react"

import TreeViewData from "./components/treeview"
import TreeViewTable from "./components/treetable"

const View = ({ tree, callback, setNodeSelected, setAddLevelKey, setEditKey }) => {
  const [typeView, setTypeView] = useState(true)

  return (
    <div>
      {typeView ? (
        <TreeViewData tree={tree} callback={callback} setNodeSelected={setNodeSelected} setTypeViewList={setTypeView} />
      ) : (
        <TreeViewTable
          tree={tree}
          callback={callback}
          setNodeSelected={setNodeSelected}
          setTypeViewList={setTypeView}
          setAddLevelKey={setAddLevelKey}
          setEditKey={setEditKey}
        />
      )}
    </div>
  )
}

export default View
