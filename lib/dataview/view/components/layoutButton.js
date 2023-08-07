import React from 'react'
import { Button } from 'primereact/button'

/**
 * Dataview header layout button
 *
 * @param {Object} optionsResponsive
 * @param {String} layout
 * @param {Function} callback
 * @param {Object} deviceSize
 *
 * @returns {JSX.Element}
 */
const layoutButton = (optionsResponsive, layout, callback, deviceSize) => {
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
    const res = []
    Object.keys(optionsResponsive).forEach((key) => {
      if (!res.includes(optionsResponsive[key])) {
        res.push(optionsResponsive[key])
      }
    })
    console.log('res', res)
    return res
  }

  layouts()

  return (
    <div className='p-buttonset'>
      {
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
      }
    </div>
  )
}

export default layoutButton
