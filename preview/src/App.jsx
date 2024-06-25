import { useState } from "react";
import Spa from "./spa";

// * Components
import Dumb from "./components/dumb";
import Dataview from "./components/dataview";
import TreeView from "./components/treeview";
import ProgressBar from "./components/progressBar";

// * CSS
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap
import "primereact/resources/primereact.min.css"; // Primereact
import "primeicons/primeicons.css"; // Primeicons
import "../../lib/index.css"; // Moderniza components

const theme = window.localStorage.getItem("theme");
if (theme === "dark") {
  import("../../css/primereact/dark/theme.css");
} else {
  import("../../css/primereact/light/theme.css");
}

function App() {
  const [componentName, setComponentName] = useState(null);
  const [componentView, setComponentView] = useState(null);

  const [components] = useState({
    Dumb: {
      name: "Dumb",
      component: Dumb,
    },
    Dataview: {
      name: "Dataview",
      component: Dataview,
    },
    Treeview: {
      name: "TreeView",
      component: TreeView,
    },
    LoadingBar: {
      name: "ProgressBar",
      component: ProgressBar,
    },
  });

  return (
    <>
      {componentName !== null && componentView !== null ? (
        <Spa
          onRefresh={() => {
            setComponentName(null);
            setComponentView(null);
          }}
          onChange={(name, view) => {
            setComponentName(name);
            setComponentView(view);
          }}
          components={components}
          componentView={componentView.component}
          componentName={componentName}
        />
      ) : (
        <Spa
          onRefresh={() => {
            setComponentName(null);
            setComponentView(null);
          }}
          onChange={(name, view) => {
            setComponentName(name);
            setComponentView(view);
          }}
          components={components}
        />
      )}
    </>
  );
}

export default App;
