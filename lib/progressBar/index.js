// *React
import React from "react"
import PropTypes from "prop-types"

// *View
import Bar from "./view"

// *Models
import ProgressOptions from "./model/progressOptions"
import ProgressStyles from "./model/progressStyles"

// *STYLES
import "./progressbar.css"

/**
 * ProgressBar component
 *
 * @param {Object|ProgressOptions} props.options options of component
 * @param {Object|ProgressStyles} props.styles styles of component
 * @returns {JSX.Element}
 */

const ProgressBar = (props) => {
  return (
    <div className="mdz-loadingbar">
      <Bar options={props.options} styles={props.styles} />
    </div>
  )
}

ProgressBar.propTypes = {
  // *Options of component
  options: PropTypes.oneOfType([
    PropTypes.instanceOf(ProgressOptions),
    PropTypes.instanceOf(ProgressStyles),
    PropTypes.object
  ]).isRequired
}

export default ProgressBar
