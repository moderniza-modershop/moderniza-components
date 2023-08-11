import { Dataview, Utils } from "@moderniza-components"
import sampleOptions from "./model/options"
import React, { useEffect, useRef, useState } from "react"

const DataviewSample = () => {
  //requisicao store... redux....
  const dataviewRef = useRef()
  const [values, setValues] = useState(null)

  useEffect(() => {
    if (Utils.readyValues(values)) {
      console.log("readable", values)
    }
  }, [values])

  const zerar = () => {
    setValues(
      values.map((item) => {
        item.price = 0
        return item
      })
    )
  }

  const recarregar = () => {
    if (Utils.readyRef(dataviewRef)) dataviewRef.current.refresh()
  }

  return (
    <React.Fragment>
      <div className="mb-2">
        <button
          className="btn btn-primary me-2"
          onClick={() => {
            zerar()
          }}
        >
          Zerar preços
        </button>
        <button
          className="btn btn-primary"
          onClick={() => {
            recarregar()
          }}
        >
          Recarregar
        </button>
      </div>
      <Dataview
        options={sampleOptions}
        values={values}
        onChangeValues={(state) => {
          if (state) setValues(state)
        }}
        ref={dataviewRef}
      />
    </React.Fragment>
  )
}

export default DataviewSample
