/* eslint-disable no-unused-vars */
import { InputText } from "primereact/inputtext"
import React, { useState } from "react"
import { Button } from "primereact/button"

import { Card, CardBody, CardTitle, Col, Row } from "reactstrap"
import { isMobile } from "../../../utils"

const Header = ({ expandAll, collapseAll, setSearch, callback, setTypeViewList }) => {
  const [typeView, setTypeView] = useState()
  const [searchInput, setSearchInput] = useState(false)

  const mobile = isMobile()

  return (
    <Card>
      <CardBody>
        <Row className="mx-0 px-0 d-flex justify-content-between my-auto">
          <Col xs="7" sm="7" lg="7" className="d-flex justify-content-start align-itens-center p-0 my-auto">
            <div className="me-1 my-auto">
              <Button
                type="button"
                icon="pi pi-search"
                size="small"
                severity="primary"
                outlined
                onClick={() => {
                  setSearchInput(!searchInput)
                  setSearch(!searchInput)
                }}
              />
            </div>
            <div className="mx-1 my-auto">
              <Button
                type="button"
                icon="pi pi-plus"
                size="small"
                severity="primary"
                outlined
                onClick={() => expandAll()}
              />
            </div>
            <div className="mx-1 my-auto">
              <Button
                type="button"
                icon="pi pi-minus"
                size="small"
                severity="secondary"
                outlined
                onClick={(e) => collapseAll()}
              />
            </div>
          </Col>
          <Col xs="5" sm="5" lg="3" className="d-flex justify-content-end align-itens-center p-0 my-auto">
            <span className="p-buttonset mx-1 my-auto">
              <Button
                size="small"
                severity="primary"
                icon={"pi pi-list"}
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
          <Col xs="12" sm="12" lg="2" className="d-flex justify-content-end align-itens-center p-0 my-lg-auto mt-1">
            <Button
              style={{ width: mobile ? "100%" : "80%" }}
              type="button"
              label="Novo"
              severity="primary"
              onClick={() => callback(true)}
            />
          </Col>
        </Row>
      </CardBody>
    </Card>
  )
}

export { Header }
