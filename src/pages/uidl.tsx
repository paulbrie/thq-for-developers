import store from "../store";
// import UidlTreeView from "../components/uidlTreeView";
// import SwitchButton from "../components/switchButton";
import CodePreview from "../components/codePreview";
import UidlFragments from "../components/uidlFragments";

export default function Uidl() {
  const uidlFragment = store.uidlFragment.hook();

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        flexDirection: "column"
      }}
    >
      <div>
        <span style={{ fontSize: 10, fontWeight: 700, color: "#00000080" }}>
          QUICK ACCESS
        </span>
      </div>
      <UidlFragments />
      <div id="here" style={{ display: "flex", flex: 1 }}>
        <CodePreview
          fileContent={JSON.stringify(uidlFragment, null, 2)}
          fileName=""
          fileType={"json"}
        />
      </div>
    </div>
  );
}
