import React from "react"
import View from "./view"
import "./treeview.css"

const TreeView = ({ props }) => {
  return (
    <div className="mdz-treeview">
      <View
        typeView={props.typeView}
        title={props.title}
        tree={props.tree}
        callback={props.callback}
        setNodeSelected={props.nodeSelected}
      />
    </div>
  )
}

export default TreeView
