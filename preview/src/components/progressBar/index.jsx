import React, { useState, useEffect, useRef } from "react"
import { ProgressBar } from "@moderniza-components"
import { Slider } from "primereact/slider"
import { InputSwitch } from "primereact/inputswitch"
import { Toast } from "primereact/toast"
import { styles, title } from "./model/options"

const LoadingSample = () => {
  const [value, setValue] = useState(66)
  const [checked, setChecked] = useState(false)
  const [activated, setActivated] = useState(false)
  const [loading, setLoading] = useState(false)
  const [view, setView] = useState(true)

  const interval = useRef(null)
  const toast = useRef(null)

  useEffect(() => {
    if (activated) {
      let _val = value

      interval.current = setInterval(() => {
        _val += Math.floor(Math.random() * 10) + 1

        if (_val >= 100) {
          _val = 100
          toast.current.show({ severity: "info", summary: "Success", detail: "Process Completed" })
          clearInterval(interval.current)
          setView(false)
        }

        setValue(_val)
      }, 1000)

      return () => {
        if (interval.current) {
          clearInterval(interval.current)
          interval.current = null
        }
      }
    }
  }, [activated])

  return (
    <React.Fragment>
      <div className="mb-5">
        <div>
          <div className="d-flex align-itens-center mb-2">
            <InputSwitch checked={view} onChange={(e) => setView(e.value)} />

            <span className="ms-2">Visualizar</span>
          </div>
          <div className="d-flex align-itens-center mb-2">
            <InputSwitch checked={activated} onChange={(e) => setActivated(e.value)} />

            <span className="ms-2">Modo Carregamento</span>
          </div>
          <div className="d-flex align-itens-center mb-2 mt-2">
            <InputSwitch checked={loading} onChange={(e) => setLoading(e.value)} />

            <span className="ms-2">Modo Loading</span>
          </div>
          {!activated && (
            <div className="d-flex align-itens-center mb-2">
              <InputSwitch checked={checked} onChange={(e) => setChecked(e.value)} />

              <span className="ms-2">Definir Valor</span>
            </div>
          )}
          <div>
            {checked && !activated && (
              <div>
                <Slider value={value} onChange={(e) => setValue(e.value)} />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mb-5"></div>
      <Toast ref={toast}></Toast>

      {view && (
        <ProgressBar
          options={{
            value: value,
            visible: false,
            gradient: true,
            type_description: null,
            loading: loading,
            title: title
          }}
          styles={styles}
        />
      )}
    </React.Fragment>
  )
}
export default LoadingSample
