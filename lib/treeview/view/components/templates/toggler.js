import React from "react"
import { Checkbox } from "primereact/checkbox"
import { Button } from "primereact/button"
import { UncontrolledTooltip } from "reactstrap"

const Toggler = (node) => {
  if (!node) {
    return
  }

  let margin = 20
  switch (node.key.length) {
    case 3:
      margin = 30
      break
    case 5:
      margin = 45
      break
    case 7:
      margin = 60
      break
    case 9:
      margin = 70
      break
  }

  return (
    <div className="d-flex align-items-center">
      {node.iconType ? <div>{node.iconType}</div> : ""}
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

      <span className="ms-1 ml-1 text-primary" style={{ minWidth: margin }}>
        {node.key}
      </span>
      {node.data !== "" ? (
        <span style={{ minWidth: "300px" }}>{`${node.label}  (${node.data})`}</span>
      ) : (
        <span style={{ minWidth: "300px" }}>{`${node.label}`}</span>
      )}
    </div>
  )
}

export default Toggler
