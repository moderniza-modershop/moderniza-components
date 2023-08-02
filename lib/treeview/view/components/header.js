/* eslint-disable no-unused-vars */
import { InputText } from "primereact/inputtext"
import React, { useState } from "react"
import { Button } from "primereact/button"

import { Card, CardBody, CardTitle, Col, Row } from "reactstrap"

const Header = ({ expandAll, collapseAll, setSearch, callback, setTypeViewList }) => {
  const [typeView, setTypeView] = useState()
  const [searchInput, setSearchInput] = useState(false)

  return (
    <Card>
      <CardBody>
        <Row className="mx-0 px-0 d-flex justify-content-between my-auto">
          <Col xs="12" sm="12" lg="11" className="d-flex justify-content-between align-itens-center p-0 my-auto">
            <Col className="d-flex justify-content-start align-itens-center p-0 my-auto">
              <Button
                type="button"
                icon="pi pi-search"
                size="small"
                severity="primary"
                className="me-50 mr-50"
                onClick={() => {
                  setSearchInput(!searchInput)
                  setSearch(!searchInput)
                }}
              />

              <Button
                type="button"
                icon="pi pi-plus"
                size="small"
                severity="primary"
                outlined
                className="me-50 mr-50"
                onClick={() => expandAll()}
              />

              <Button
                type="button"
                icon="pi pi-minus"
                size="small"
                severity="secondary"
                outlined
                onClick={(e) => collapseAll()}
              />
            </Col>
            <Col className="d-flex justify-content-end align-itens-center p-0 my-auto">
              <span className="p-buttonset mx-1 my-auto">
                <Button
                  size="small"
                  severity="primary"
                  icon={"pi pi-bars"}
                  outlined={typeView}
                  onClick={() => {
                    setTypeViewList(true)
                  }}
                />
                <Button
                  size="small"
                  severity="primary"
                  icon={"pi pi-table"}
                  outlined={!typeView}
                  onClick={() => {
                    setTypeViewList(false)
                    setTypeView(false)
                  }}
                />
              </span>
            </Col>
          </Col>

          <Col xs="12" sm="12" lg="1" className="d-flex justify-content-end align-itens-center p-0 my-auto">
            <Button
              style={{ width: "100%" }}
              type="button"
              icon={"pi pi-plus"}
              size="small"
              label="Novo"
              severity="primary"
              className="mt-lg-0 mt-1"
              onClick={() => callback(true)}
            />
          </Col>
        </Row>
      </CardBody>
    </Card>
  )
}

export { Header }
