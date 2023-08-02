import React from "react"
import View from "./view"
import "./treeview.css"

const TreeView = ({ props }) => {
  return (
    <div className="mdz-treeview">
      <View
        tree={props.tree}
        callback={props.callback}
        setNodeSelected={props.nodeSelected}
        setAddLevelKey={props.addLevelKey}
        setEditKey={props.editKey}
      />
    </div>
  )
}

export default TreeView
