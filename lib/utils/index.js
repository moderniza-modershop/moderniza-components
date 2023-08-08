export const isMobile = () => {
  if (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ||
    /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.platform)
  ) {
    return true
  } else return false
}

const readyValues = (values) => {
  return !!((values && values.constructor.name === 'Array' && values.length > 0))
}

const readyRef = (ref) => {
  return !!ref.current
}

export default {
  isMobile,
  readyValues,
  readyRef
}