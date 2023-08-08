/* eslint-disable no-unused-vars */

/**
 * Change the layout when vieport changes
 *
 * @param {Function} callback
 * @param {String} currentLayout
 * @param {{width: Number, height: Number}} deviceSize
 * @param {{xs: String, sm: String, lg: String, xl: String, xxl:String}} optionsResponsive
 * @returns {String}
 */
const DataviewResponsive = (callback, currentLayout, deviceSize, optionsResponsive) => {
  /**
     * Clean mode the handdle defaults
     *
     * @param {String} current
     * @param {String} actual
     * @returns {String}
     */
  const fromDefault = (current, actual) => {
    return current !== actual ? actual : current
  }

  if (deviceSize.width > 0 && deviceSize.width < 576) {
    callback(fromDefault(
      currentLayout,
      optionsResponsive.xs
    ))
  } else if (deviceSize.width > 576 && deviceSize.width < 768) {
    callback(fromDefault(
      currentLayout,
      optionsResponsive.sm
    ))
  } else if (deviceSize.width > 768 && deviceSize.width < 992) {
    callback(fromDefault(
      currentLayout,
      optionsResponsive.md
    ))
  } else if (deviceSize.width > 992 && deviceSize.width < 1200) {
    callback(fromDefault(
      currentLayout,
      optionsResponsive.lg
    ))
  } else if (deviceSize.width > 1200 && deviceSize.width < 1400) {
    callback(fromDefault(
      currentLayout,
      optionsResponsive.xl
    ))
  } else {
    callback(fromDefault(
      currentLayout,
      optionsResponsive.xxl
    ))
  }
}

export default DataviewResponsive
