/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react'
import { Button } from 'primereact/button'

/**
 * Add header button
 *
* @param {{label:String, icon: String, severity: String, className: String, style: Object, onClick: Function, size: String, type: String}} addOptions
 * @returns {JSX.Element}
 */
const addButton = (addOptions, deviceSize) => {

  const getLabel = (value) => {
    if (deviceSize.width <= 380) {
      return ''
    } else {
      return value
    }
  }

  return (
    <Button
      type={addOptions.type}
      label={getLabel(addOptions.label)}
      icon={addOptions.icon}
      size={addOptions.size}
      severity={addOptions.severity}
      className={addOptions.className}
      style={addOptions.style}
      onClick={(e) => {
        if (addOptions.onClick) {
          addOptions.onClick(e)
        }
      }}
    />
  )
}

export default addButton
