/* eslint-disable no-unused-vars */
import { InputText } from "primereact/inputtext"
import React from "react"
import { Button } from "primereact/button"

import { Card, Col, Row } from "reactstrap"

const Header = ({ expandAll, collapseAll, search, callback }) => {
  return (
    <Card>
      <Row className="m-1 p-1 d-flex justify-content-between">
        <Col xs="12" sm="12" lg="6" className="d-flex justify-content-start align-itens-center p-0">
          <Col xs="12" sm="12" lg="12" className="my-auto ps-0">
            <span
              className="p-input-icon-left"
              style={{
                width: "100%"
              }}
            >
              <i className="pi pi-search" />
              <InputText
                disabled={false}
                onChange={(e) => {
                  search(e.target.value)
                }}
                placeholder={"Pesquisar..."}
                style={{
                  width: "100%"
                }}
              />
            </span>
          </Col>
        </Col>
        <Col xs="12" sm="12" lg="6" className="d-flex justify-content-end align-itens-center p-0 mt-lg-0 mt-1">
          <div className="mx-1 mt-1">
            <Button
              type="button"
              icon="pi pi-plus"
              size="small"
              severity="primary"
              outlined
              onClick={() => expandAll()}
            />
          </div>
          <div className="mx-1 mt-1">
            <Button
              type="button"
              icon="pi pi-minus"
              size="small"
              severity="secondary"
              outlined
              onClick={(e) => collapseAll()}
            />
          </div>
          <Button type="button" label="Novo" size={200} severity="primary" onClick={() => callback(true)} />
        </Col>
      </Row>
    </Card>
  )
}

export { Header }
