class ProgressOptions {
  /**
   * @param {Object} options
   */

  constructor(options) {
    try {
      if (this.validate(options)) this.dispatch(options)
    } catch (e) {
      const error = e
      throw new Error(error.message)
    }
  }
  /**
   * Validate Progress options
   *
   * @param {ProgressOptions} options
   * @returns {Boolean}
   */
  validate(options) {
    // !value (required)
    if (options.value) {
      if (typeof options.value !== "number") {
        throw new Error("[options.value] must be typeof number")
      }
    }

    // !loading(required)
    if (options.loding) {
      if (typeof options.loading !== "boolean") {
        throw new Error("[options.loading] must be typeof boolean")
      }
    }

    // !visible(required)
    if (options.visible) {
      if (typeof options.visible !== "boolean") {
        throw new Error("[options.visible] must be typeof boolean")
      }
    }

    // !gradient (required)
    if (options.gradient) {
      if (typeof options.gradient !== "boolean") {
        throw new Error("[options.gradient] must be typeof boolean")
      }
    }

    // !type_description(required)
    if (options.type_description) {
      if (typeof options.type_description !== "string") {
        throw new Error("[options.type_description] must be typeof string")
      }
    }

    // !title(required)
    if (options.title.description) {
      if (typeof options.title.description !== "string") {
        throw new Error("[options.title.description] must be typeof string")
      }
    }
    if (options.title.font) {
      if (typeof options.title.font !== "string") {
        throw new Error("[options.title.font] must be typeof string")
      }
    }
    if (options.title.fontSize) {
      if (typeof options.title.fontSize !== "string") {
        throw new Error("[options.title.fontSize] must be typeof string")
      }
    }
    if (options.title.color) {
      if (typeof options.title.color !== "string") {
        throw new Error("[options.title.color] must be typeof string")
      }
    }

    return true
  }

  /**
   * Mixs the current options with defaults
   *
   * @param {ProgressOptions} options
   * @returns {ProgressOptions}
   */
  defaults(options) {
    const defaultBar = {
      value: 0,
      mode: "determinate",
      type_description: "%",
      title: {
        description: "",
        fontSize: "16px",
        font: "400",
        color: "text-primary"
      }
    }

    //DEFAULT MODE
    if (!options.mode) {
      options.mode = defaultBar.mode
    }

    //SET MODE
    if (options.loading) {
      options.mode = "indeterminate"
    }

    //DEFAULT VALUE
    if (!options.value) {
      options.value = defaultBar.value
    }

    //DEFAUL TYPE_DESCRIPTION
    if (!options.type_description) {
      options.type_description = defaultBar.type_description
    }

    if (options.title) {
      //DEFAULT TITLE
      if (!options.title.description) {
        options.title.description = defaultBar.title.description
      }
      if (!options.title.font) {
        options.title.font = defaultBar.title.font
      }
      if (!options.title.color) {
        options.title.color = defaultBar.title.color
      }
      if (!options.title.fontSize) {
        options.title.fontSizer = defaultBar.title.fontSize
      }
    }

    return options
  }

  /**
   * Dispatch the values
   * @param {ProgressOptions} originalOptions
   */
  dispatch(originalOptions) {
    const options = this.defaults(originalOptions)
    // *CONFIG
    this.value = options.value
    this.mode = options.mode
    this.title = options.title
    this.visible = options.visible
    this.gradient = options.gradient
    this.type_description = options.type_description
    // !FLAG: only for read
    this.build = true
  }
}

export default ProgressOptions
