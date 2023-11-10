import React from "react"

import { ProgressBar } from "primereact/progressbar"
import { CardBody, Card } from "reactstrap"

import PropTypes from "prop-types"

// *Models
import ProgressOptions from "../model/progressOptions"
import ProgressStyles from "../model/progressStyles"

import "../progressbar.css"

/**
 * View component
 *
 * @param {Object|ProgressOptions} props.options view options
 * @param {Object|ProgressStyles} props.styles view styles
 * @returns {JSX.Element}
 */
const Bar = (props) => {
  /**
   * Component options
   * @type {ProgressOptions}
   * @type {ProgressStyles}
   */

  const options = props.options.build ? props.options : new ProgressOptions(props.options)
  const styles = props.styles.build ? props.styles : new ProgressStyles(props.styles)

  return (
    <React.Fragment>
      <div className="mb-1">
        <span
          style={{ fontSize: options.title.fontSize, color: options.title.color, fontWeight: options.title.font }}
          id="label_status"
        >
          {options.title.description}
        </span>
      </div>
      <div>
        <ProgressBar
          color={styles.color}
          showValue={options.visible}
          unit={options.type_description}
          aria-labelledby="label_status"
          value={options.value}
          mode={options.mode}
          style={{
            height: styles.height,
            borderRadius: "999px"
          }}
          pt={{
            value:
              options.gradient && options.mode === "determinate"
                ? { style: { background: "linear-gradient(to right, #8e2de2, #4a00e0)" } }
                : options.value
          }}
        />
      </div>
    </React.Fragment>
  )
}

Bar.propTypes = {
  // *Options of component
  options: PropTypes.oneOfType([
    PropTypes.instanceOf(ProgressOptions),
    PropTypes.instanceOf(ProgressStyles),
    PropTypes.object
  ]).isRequired
}

export default Bar
