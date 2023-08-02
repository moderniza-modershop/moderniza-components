import { useState, useEffect } from "react"
import Spa from "./spa"

// * Components
import Dumb from "./components/dumb"
import Dataview from "./components/dataview"
import Treeview from "./components/treeviewcall"

// * CSS
import "bootstrap/dist/css/bootstrap.min.css" // Bootstrap
import "primereact/resources/primereact.min.css" // Primereact
import "primeicons/primeicons.css" // Primeicons
import "../../css/primereact-theme.css" //Tema primereact
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
      name: "Treeview",
      component: Treeview
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
    window.addEventListener("load", handleHashChange)

    return () => {
      window.removeEventListener("hashchange", handleHashChange)
      window.removeEventListener("load", handleHashChange)
    }
  }, [])

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
