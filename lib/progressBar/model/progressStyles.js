class ProgressStyles {
  /**
   * @param {Object} styles
   */

  constructor(styles) {
    try {
      if (this.validate(styles)) this.dispatch(styles)
    } catch (e) {
      const error = e
      throw new Error(error.message)
    }
  }
  /**
   * Validate Progress Styles
   *
   * @param {ProgressStyles} styles
   * @returns {Boolean}
   */
  validate(styles) {
    // !height (required)
    if (styles.height) {
      if (typeof styles.height !== "string") {
        throw new Error("[styles.height] must be typeof string")
      }
    }

    // !height (required)
    if (styles.color) {
      if (typeof styles.color !== "string") {
        throw new Error("[styles.color] must be typeof string")
      }
    }

    return true
  }

  /**
   * Mixs the current Styles with defaults
   *
   * @param {ProgressStyles} styles
   * @returns {ProgressStyles}
   */
  defaults(styles) {
    const defaultStyles = {
      height: "16px",
      color: "primary"
    }

    //DEFAULT HEIGHT
    if (!styles.height) {
      styles.height = defaultStyles.height
    }

    //DEFAULT COLOR
    if (!styles.color) {
      styles.color = defaultStyles.color
    }

    return styles
  }

  /**
   * Dispatch the values
   * @param {ProgressStyles} originalStyles
   */
  dispatch(originalStyles) {
    const styles = this.defaults(originalStyles)
    // *CONFIG
    this.height = styles.height
    this.color = styles.color
    // !FLAG: only for read
    this.build = true
  }
}

export default ProgressStyles
