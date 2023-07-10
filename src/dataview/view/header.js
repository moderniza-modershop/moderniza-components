/* eslint-disable no-unused-vars */
import React from 'react'
import { exportButton, layoutButton, searchBar, sortButton, addButton } from './components'
import { Col, Row } from 'reactstrap'

/**
 * Dataview header view
 *
 * @param {String} title
 * @param {Boolean} loading
 * @param {String} layout
 * @param {Function} onChangeLayout
 * @param {String} globalFilterValue
 * @param {Function} onGlobalFilterChange
 * @param {Object} optionsExport
 * @param {Object} dataTableRefOrSorts
 * @param {Object|String} exportOverPanelRefOrSortKey
 * @param {Array|Function} resultsOrOnSortChange
 * @param {Array} exportColumns
 * @param {{width: Number, height: Number }} deviceSize
 *
 * @returns {JSX.Element}
 */
const header = (title, loading, layout, onChangeLayout, globalFilterValue, onGlobalFilterChange, optionsExport, dataTableRefOrSorts, exportOverPanelRefOrSortKey, resultsOrOnSortChange, exportColumns, sortOptions, addOptions, deviceSize) => {
  return (
    <Row className='m-0'>
      <Col xs='12' lg='' className='mb-1 mb-lg-auto my-auto'>
        <Row>
          <Col xs='auto' sm='' className='my-auto ps-0'>
            {
              title ? (
                <div className='flex'>
                  <h4 className='m-0'>{title}</h4>
                </div>
              ) : ''
            }
          </Col>
          <Col xs='' sm='8' lg='auto' className='my-auto pe-0'>
            {
              searchBar(loading, globalFilterValue, onGlobalFilterChange)
            }
          </Col>
        </Row>
      </Col>
      <Col xs='12' lg='auto' className='ms-auto my-auto'>
        <Row className='justify-content-end'>
          {
            optionsExport && optionsExport.visible && layout === 'table' ? (
              <Col className='col-auto pe-0 my-auto'>
                {
                  exportButton(optionsExport, dataTableRefOrSorts, resultsOrOnSortChange, exportColumns, exportOverPanelRefOrSortKey)
                }
              </Col>
            ) : ''
          }
          {
            sortOptions.visible && layout !== 'table' && dataTableRefOrSorts.sortOptions ? (
              <Col className='col-auto pe-0 my-auto ps-0 ps-lg-1 flex-grow-1 flex-lg-grow-0'>
                {
                  sortButton(dataTableRefOrSorts, exportOverPanelRefOrSortKey, resultsOrOnSortChange, deviceSize)
                }
              </Col>
            ) : ''
          }
          <Col className='col-auto pe-0 my-auto'>
            {
              layoutButton(layout, onChangeLayout, deviceSize)
            }
          </Col>
          {
            addOptions.visible ? (
              <Col className='col-auto pe-0 my-auto'>
                {
                  addButton(addOptions, deviceSize)
                }
              </Col>
            ) : ''
          }
        </Row>
      </Col>
    </Row>
  )
}

export {
  header
}
