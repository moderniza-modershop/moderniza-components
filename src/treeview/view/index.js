import React from "react"

import TreeViewData from "./components/treeview"

const View = ({ tree, callback, search, setNodeSelected }) => {
  return (
    <div>
      <TreeViewData tree={tree} callback={callback} search={search} setNodeSelected={setNodeSelected} />
    </div>
  )
}

export default View
