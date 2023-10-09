import React, { useImperativeHandle, forwardRef, useRef } from "react"
import View from "./view"
import Utils from "../utils"
import "./treeview.css"

const TreeView = forwardRef(({ tree, options, columns }, ref) => {
  const viewRef = useRef()

  useImperativeHandle(ref, () => ({
    refresh() {
      if (Utils.readyRef(viewRef)) viewRef.current.refresh()
    }
  }))

  return (
    <div className="mdz-treeview">
      <View
        tree={tree}
        columns={columns}
        callback={options.callback}
        setNodeSelected={options.nodeSelected}
        changeTypeView={options.setTypeView}
        button={options.button}
        hide_ref={options.hide_ref}
        ref={viewRef}
      />
    </div>
  )
})

export default TreeView
