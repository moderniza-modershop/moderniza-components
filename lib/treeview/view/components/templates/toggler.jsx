const Toggler = (node) => {
  if (!node) {
    return
  }

  return (
    <div>
      <span>{node.key}</span>
      <span>{`  - ${node.label}  (${node.data})`}</span>
    </div>
  )
}

export default Toggler
