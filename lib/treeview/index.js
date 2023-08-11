import React, { useImperativeHandle, forwardRef, useRef } from "react"
import View from "./view"
import Utils from "../utils"
import "./treeview.css"

const TreeView = forwardRef(({ tree, options }, ref) => {
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
        callback={options.callback}
        setNodeSelected={options.nodeSelected}
        setAddLevelKey={options.addLevelKey}
        setEditKey={options.editKey}
        changeTypeView={options.setTypeView}
        button={options.button}
        ref={viewRef}
      />
    </div>
  )
})

export default TreeView
