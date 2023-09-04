import React from 'react'
import { Button } from 'primereact/button'
import { supportedLayouts } from '../../model/DataviewOptions'

/**
 * Dataview header layout button
 *
 * @param {Object} optionsTemplates
 * @param {String} layout
 * @param {Function} callback
 * @param {Object} deviceSize
 *
 * @returns {JSX.Element}
 */
const layoutButton = (optionsTemplates, layout, callback, deviceSize) => {

  const items = [
    { icon: 'pi pi-th-large', value: 'grid' },
    { icon: 'pi pi-bars', value: 'list' },
    { icon: 'pi pi-table', value: 'table' }
  ]

  /**
   * 
   * @returns {Array}
   */
  const layouts = () => {
    return Object.keys(optionsTemplates).map((layout) => {
      return layout === 'columns' ? 'table' : layout
    }).filter((layout) => {
      return supportedLayouts.includes(layout)
    })
  }

  return (
    <div className='p-buttonset'>
      {
        layouts().length > 1 ? (
          items.map((item, index) => {
            if (!(item.value === 'table' && deviceSize.width < 767.98) && layouts().includes(item.value)) {
              return (
                <Button
                  key={index}
                  size='small'
                  severity='primary'
                  icon={item.icon}
                  outlined={item.value !== layout}
                  onClick={() => callback(item.value)}
                />
              )
            }
          })
        ) : null
      }
    </div>
  )
}

export default layoutButton
