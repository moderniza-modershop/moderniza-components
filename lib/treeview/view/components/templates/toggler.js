import React from "react"
import { Checkbox } from "primereact/checkbox"
import { Button } from "primereact/button"

const Toggler = (node) => {
  if (!node) {
    return
  }

  return (
    <div className="d-flex align-items-center">
      {node.button ? (
        <Button
          type="button"
          size="small"
          icon="pi pi-pencil text-success"
          severity="primary"
          outlined
          // rounded
          onClick={() => {
            node.is_edit = true
          }}
          style={{ border: "none" }}
        />
      ) : (
        ""
      )}
      <Checkbox
        onChange={(e) => {
          node.situacao = e.checked
          node.is_situation = true
        }}
        checked={node.situacao}
      ></Checkbox>
      <span className="ms-1 ml-1 text-primary">{node.key}</span>
      {node.data !== "" ? <span>{`  - ${node.label}  (${node.data})`}</span> : <span>{`  - ${node.label}`}</span>}
    </div>
  )
}

export default Toggler
