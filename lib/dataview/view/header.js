/* eslint-disable no-unused-vars */
import React from 'react'
import { exportButton, layoutButton, searchBar, sortButton, addButton, refreshButton, expandButton } from './components'
import { Col, Row } from 'reactstrap'

/**
 * Dataview header view
 *
 * @param {String} title
 * @param {Boolean} loading
 * @param {String} layout
 * @param {Object} optionsResponsive
 * @param {Function} onChangeLayout
 * @param {String} globalFilterValue
 * @param {Function} onGlobalFilterChange
 * @param {Object} optionsExport
 * @param {Object} dataTableRefOrSorts
 * @param {Object|String} exportOverPanelRefOrSortKey
 * @param {Array|Function} resultsOrOnSortChange
 * @param {Array} exportColumns
 * @param {{width: Number, height: Number }} deviceSize
 * @param {{label:String, filter: String}} searchOptions
 * @param {Function} onRefresh
 * @param {Object} refreshOptions
 * @param {Function} onExpandAll
 * @param {Function} onCollapseAll
 * @param {Object} expandOptions
 *
 * @returns {JSX.Element}
 */
const header = (title, loading, optionsResponsive, layout, onChangeLayout, globalFilterValue, onGlobalFilterChange, optionsExport, dataTableRefOrSorts, exportOverPanelRefOrSortKey, resultsOrOnSortChange, exportColumns, sortOptions, addOptions, deviceSize, searchOptions, onRefresh, refreshOptions, onExpandAll, onCollapseAll, expandOptions, optionsTemplates) => {

  return (
    <Row className='m-0'>
      <Col xs='12' lg='' className='mb-1 mb-lg-auto mt-lg-auto'>
        <Row className='m-0'>
          {
            title ?
              (
                <Col className='my-auto ps-0 pl-0 me-auto'>
                  <div className='flex'>
                    <h4 className='m-0'>{title}</h4>
                  </div>
                </Col>
              )
              : ''
          }
          <Col xs='' sm={title ? '' : '12'} lg='' xl='auto' className={title ? 'my-auto pe-0 pr-0' : 'my-auto pe-0 pr-0 ps-0 pl-0'}>
            {
              searchBar(loading, globalFilterValue, onGlobalFilterChange, searchOptions)
            }
          </Col>
        </Row>
      </Col>
      <Col xs='12' lg='auto' className='ms-auto my-auto'>
        <Row className='justify-content-end m-0'>
          {
            optionsExport && optionsExport.visible && layout === 'table' ? (
              <Col className='col-auto pe-0 pr-0 my-auto'>
                {
                  exportButton(optionsExport, dataTableRefOrSorts, resultsOrOnSortChange, exportColumns, exportOverPanelRefOrSortKey, deviceSize)
                }
              </Col>
            ) : ''
          }
          {
            sortOptions.visible && layout !== 'table' && dataTableRefOrSorts.sortOptions ? (
              <Col className='col-auto pe-0 pr-0 my-auto ps-0 ps-lg-1 flex-grow-1 flex-lg-grow-0'>
                {
                  sortButton(dataTableRefOrSorts, exportOverPanelRefOrSortKey, resultsOrOnSortChange, deviceSize)
                }
              </Col>
            ) : ''
          }
          <Col className='col-auto pe-0 pr-0 my-auto'>
            {
              refreshButton(onRefresh, refreshOptions)
            }
          </Col>
          {
            layout === 'table' && expandOptions ? (
              <Col className='col-auto pe-0 pr-0 my-auto'>
                {
                  expandButton(onExpandAll, onCollapseAll, expandOptions)
                }
              </Col>
            ) : ''
          }
          {
            deviceSize.width > 768 ?
              (
                <Col className='col-auto pe-0 pr-0 my-auto'>
                  {
                    layoutButton(optionsTemplates, layout, onChangeLayout, deviceSize)
                  }
                </Col>
              )
              : ''
          }
          {
            addOptions ? (
              <Col className='col-auto pe-0 pr-0 my-auto'>
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
