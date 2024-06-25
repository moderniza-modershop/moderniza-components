const theme = window.localStorage.getItem("theme") || "light";

const Header = (ComponentName, onRefresh) => {
  return (
    <div
      className="row m-0 p-0 "
      style={{
        height: "60px",
        borderBottom: "1px solid #eee",
      }}
    >
      <div
        className="d-none d-lg-block col-2 my-auto bg-white"
        style={{
          width: "260px",
          height: "60px",
          lineHeight: "60px",
          textAlign: "center",
          borderRight: "1px solid #eee",
        }}
      >
        <a className="navbar-brand" href="#" onClick={onRefresh}>
          <img src="/assets/logo.png" alt="Bootstrap" height={"30px"} />
        </a>
      </div>
      <div className="col my-auto">
        <h5 className="m-0">{ComponentName || "Início"}</h5>
      </div>
    </div>
  );
};

const Sidebar = (components, ComponentName, onChange, onRefresh) => {
  return (
    <>
      <div>
        <button
          className="btn btn-primary w-100"
          onClick={() => {
            window.localStorage.setItem(
              "theme",
              theme === "light" ? "dark" : "light"
            );
            window.location.reload();
          }}
        >
          Mudar tema {theme === "light" ? "dark" : "light"}
        </button>
      </div>
      <div
        className="nav flex-column nav-pills"
        id="v-pills-tab"
        role="tablist"
        aria-orientation="vertical"
      >
        <a
          href={"#"}
          onClick={onRefresh}
          className={`nav-link text-white`}
          id="v-pills-home-tab"
        >
          Início{" "}
        </a>
        {Object.keys(components).map((key, index) => {
          const comp = components[key];
          return (
            <a
              href={"#" + comp.name.toLowerCase()}
              onClick={() => {
                onChange(comp.name, comp);
              }}
              key={index}
              className={
                ComponentName === comp.name
                  ? "nav-link active"
                  : `nav-link text-white`
              }
              id="v-pills-home-tab"
            >
              {comp.name}
            </a>
          );
        })}
      </div>
    </>
  );
};

const Spa = (props) => {
  const ComponentView = props.componentView;
  const ComponentName = props.componentName;
  const components = props.components;
  const onChange = props.onChange;
  const onRefresh = props.onRefresh;

  const Builder = (Component) => {
    return (
      <div className="container-fluid">
        {/* {console.log('componentView', ComponentView, 'ComponentName', ComponentName)} */}
        <div className={`row bg-${theme === "light" ? "white" : "dark"} text-${theme === "light" ? "dark" : "white"}`}>
          {Header(ComponentName, onRefresh)}
        </div>
        <div className="row">
          <div
            className={`d-none d-lg-block col-2 bg-secondary py-2`}
            style={{
              height: "calc(100vh - 60px)",
              width: "260px",
            }}
          >
            {Sidebar(components, ComponentName, onChange, onRefresh)}
          </div>
          <d className={`col py-3 bg-${theme === "light" ? "white" : "dark"} text-${theme === "light" ? "dark" : "white"}`}>
            {Component ? (
              <Component />
            ) : (
              <p>Selecione um componente para visualizar.</p>
            )}
          </d>
        </div>
      </div>
    );
  };

  return Builder(ComponentView);
};

export default Spa;
