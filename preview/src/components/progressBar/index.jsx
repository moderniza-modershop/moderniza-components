import React, { useState, useEffect, useRef } from "react"
import { ProgressBar } from "@moderniza-components"
import { InputText } from "primereact/inputtext"
import { ColorPicker } from "primereact/colorpicker"
import { Slider } from "primereact/slider"
import { InputSwitch } from "primereact/inputswitch"
import { Toast } from "primereact/toast"
import { title } from "./model/options"
import { Col, Row } from "reactstrap"

const LoadingSample = () => {
  const [value, setValue] = useState(37)
  const [valueHeight, setValueHeight] = useState(55)
  const [color, setColor] = useState()
  const [colorTitle, setColorTitle] = useState()
  const [checked, setChecked] = useState(false)
  const [activated, setActivated] = useState(false)
  const [loading, setLoading] = useState(false)
  const [view, setView] = useState(true)
  const [valueView, setValueView] = useState(true)
  const [gradient, setGradient] = useState(true)
  const [titleDescription, setTitleDescription] = useState("Processando...")

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
          <Row>
            <Col lg="2" className="d-flex align-itens-center justify-content-start mb-2 ms-3">
              <Slider value={valueHeight} onChange={(e) => setValueHeight(e.value)} orientation="vertical" />

              <span className="ms-2">Altura</span>
            </Col>
            <Col>
              <InputText value={titleDescription} onChange={(e) => setTitleDescription(e.target.value)} />
              <ColorPicker format="hex" value={colorTitle} onChange={(e) => setColorTitle(e.value)} />
            </Col>
          </Row>
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
          <div className="d-flex align-itens-center mb-2">
            <InputSwitch checked={valueView} onChange={(e) => setValueView(e.value)} />

            <span className="ms-2">Ver valor</span>
          </div>
          <div className="d-flex align-itens-center mb-2">
            <InputSwitch checked={gradient} onChange={(e) => setGradient(e.value)} />

            <span className="ms-2">Gradiente</span>
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
          <ColorPicker format="hex" value={color} onChange={(e) => setColor(e.value)} />
        </div>
      </div>

      <div className="mb-5"></div>
      <Toast ref={toast}></Toast>

      {view && (
        <ProgressBar
          options={{
            value: value,
            visible: valueView,
            gradient: gradient,
            type_description: null,
            loading: loading,
            title: {
              description: titleDescription,
              font: title.font,
              fontSize: title.fontSize,
              color: `#${colorTitle}`
            }
          }}
          styles={{
            color: `#${color}`,
            height: `${valueHeight}px`
          }}
        />
      )}
    </React.Fragment>
  )
}
export default LoadingSample
