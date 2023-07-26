import React from "react"

import View from "./view"

const TreeView = ({ props }) => {
  return (
    <div className="mdz-treeview">
      <View tree={props.tree} callback={props.callback} search={props.search} setNodeSelected={props.nodeSelected} />
    </div>
  )
}

export default TreeView
