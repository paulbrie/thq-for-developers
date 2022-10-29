import Code from "../pages/code";
import Uidl from "../pages/uidl";
import About from "../pages/about";
import Custom from "../pages/custom";
import store from "../store";

const views: Record<string, JSX.Element> = {
  UIDL: <Uidl />,
  CODE: <Code />,
  CUSTOM: <Custom />,
  ABOUT: <About />
};

export default function Tabs() {
  const view = store.view.hook();
  return (
    <div
      style={{
        display: "flex",
        flex: 1,
        flexDirection: "column",
        height: "100%"
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 8,
          fontWeight: 400,
          marginBottom: 16,
          backgroundColor: "#000",
          color: "#ccc",
          paddingLeft: 16
        }}
      >
        {Object.keys(views).map((key, index) => {
          return (
            <div
              key={index}
              style={{
                height: 32,
                fontSize: 12,
                padding: "0 16px",
                display: "flex",
                alignItems: "center",
                color: key === view ? "#000" : "",
                backgroundColor: key === view ? "#fff" : "",
                cursor: "pointer"
              }}
              onClick={() => store.view.next(key)}
            >
              {key}
            </div>
          );
        })}
      </div>
      <div
        style={{
          height: "100%",
          padding: 16
        }}
      >
        {views[view] || views["REACT"]}
      </div>
    </div>
  );
}
