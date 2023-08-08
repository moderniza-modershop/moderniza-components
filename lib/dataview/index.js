// *React
import React, {  useImperativeHandle, forwardRef, useRef } from 'react'
import PropTypes from 'prop-types'

// *View
import View from './view'

// *Models
import DataviewOptions from './model/DataviewOptions'

// *STYLES
import './dataview.css'

/**
 * Dataview component
 *
 * @param {Object|DataviewOptions} props.options options of component
 * @param {Array} props.values
 * @param {Function} props.onChangeValues
 * @returns {JSX.Element}
 */
const Dataview = forwardRef((props, ref) => {

  const viewRef = useRef()

  useImperativeHandle(ref, () => ({
    refresh() {
      if (viewRef.current) viewRef.current.refresh()
    }
  }))

  return (
    <div className='mdz-dataview'>
      <View
        options={props.options}
        values={props.values}
        onChangeValues={props.onChangeValues}
        ref={viewRef}
      />
    </div>
  )
})

Dataview.propTypes = {
  values: PropTypes.array,
  onChangeValues: PropTypes.func,
  // *Options of component
  options: PropTypes.oneOfType([
    PropTypes.instanceOf(DataviewOptions),
    PropTypes.object
  ]).isRequired
}

export default Dataview
