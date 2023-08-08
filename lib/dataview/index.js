/* eslint-disable no-unused-vars */
// *React
import React from 'react'
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
 * @param {Function} props.onChange
 * @returns {JSX.Element}
 */
const Dataview = (props) => {
  return (
    <div className='mdz-dataview'>
      <View options={props.options} values={props.values} onChange={props.onChange}/>
    </div>
  )
}

Dataview.propTypes = {
  values: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  // *Options of component
  options: PropTypes.oneOfType([
    PropTypes.instanceOf(DataviewOptions),
    PropTypes.object
  ]).isRequired
}

export default Dataview
