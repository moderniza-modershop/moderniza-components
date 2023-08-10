import React, { useState } from "react"

import TreeViewData from "./components/treeview"
import TreeViewTable from "./components/treetable"

const View = ({ tree, callback, setNodeSelected, setAddLevelKey, setEditKey, changeTypeView, button }) => {
  const [typeView, setTypeView] = useState(true)
  changeTypeView(typeView)
  return (
    <div>
      {!typeView ? (
        <TreeViewData
          tree={tree}
          callback={callback}
          setNodeSelected={setNodeSelected}
          setTypeViewList={setTypeView}
          button={button}
        />
      ) : (
        <TreeViewTable
          tree={tree}
          callback={callback}
          setNodeSelected={setNodeSelected}
          setTypeViewList={setTypeView}
          setAddLevelKey={setAddLevelKey}
          setEditKey={setEditKey}
          button={button}
        />
      )}
    </div>
  )
}

export default View
