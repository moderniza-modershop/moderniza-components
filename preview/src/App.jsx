import { useState, useEffect } from "react"
import Spa from "./spa"

// * Components
import Dumb from "./components/dumb"
import Dataview from "./components/dataview"
import TreeView from "./components/treeview"
import ProgressBar from "./components/progressBar"

// * CSS
import "bootstrap/dist/css/bootstrap.min.css" // Bootstrap
import "primereact/resources/primereact.min.css" // Primereact
import "primeicons/primeicons.css" // Primeicons
import "../../css/light/theme.css" //Tema primereact
import "../../lib/index.css" // Moderniza components

function App() {
  const [componentName, setComponentName] = useState(null)
  const [componentView, setComponentView] = useState(null)

  const [components] = useState({
    Dumb: {
      name: "Dumb",
      component: Dumb
    },
    Dataview: {
      name: "Dataview",
      component: Dataview
    },
    Treeview: {
      name: "TreeView",
      component: TreeView
    },
    LoadingBar: {
      name: "ProgressBar",
      component: ProgressBar
    }
  })

  const handleHashChange = () => {
    let hash = String(window.location.hash).replace("#", "")
    hash = hash.charAt(0).toUpperCase() + hash.slice(1)
    // console.log('hash', hash)
    if (hash && hash !== "" && components[hash]) {
      // console.log('existo')
      setComponentName(components[hash].name)
      setComponentView(components[hash])
    }
  }

  useEffect(() => {
    window.addEventListener("hashchange", handleHashChange)

    return () => {
      window.removeEventListener("hashchange", handleHashChange)
    }
  }, [componentName, componentView])

  return (
    <>
      {componentName !== null && componentView !== null ? (
        <Spa
          onRefresh={() => {
            setComponentName(null)
            setComponentView(null)
          }}
          onChange={(name, view) => {
            setComponentName(name)
            setComponentView(view)
          }}
          components={components}
          componentView={componentView.component}
          componentName={componentName}
        />
      ) : (
        <Spa
          onRefresh={() => {
            setComponentName(null)
            setComponentView(null)
          }}
          onChange={(name, view) => {
            setComponentName(name)
            setComponentView(view)
          }}
          components={components}
        />
      )}
    </>
  )
}

export default App
