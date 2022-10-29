import store from "../store";
import { useState, useMemo, useEffect } from "react";
const Fragment = ({
  name,
  onClick,
  selected
}: {
  name: string;
  onClick: (frament: string) => void;
  selected: boolean;
}) => (
  <span
    style={{
      fontSize: 12,
      backgroundColor: selected ? "#000" : "#cccccc50",
      color: selected ? "#fff" : "",
      border: "solid 1px #cccccc",
      padding: "4px 8px",
      borderRadius: 4,
      cursor: "pointer",
      display: "flex-inline"
    }}
    onClick={() => onClick(name)}
  >
    {name}
  </span>
);

export default function UidlFragments() {
  const projectUidl = store.uidlProject.hook();
  const [fragment, setFragment] = useState("all");

  const fragmentsList = useMemo(() => {
    return {
      all: projectUidl,
      globals: projectUidl?.globals || {},
      assets: projectUidl?.globals.assets || {},
      root: projectUidl?.root || {},
      "root.node": projectUidl?.root?.node || {},
      components: projectUidl?.components || {},
      customCode: projectUidl?.globals.customCode || {},
      "customCode.body": projectUidl?.globals?.customCode?.body || {},
      styleDefinitions: projectUidl?.root?.styleSetDefinitions || {},
      designLanguage: projectUidl?.root?.designLanguage || {},
      stateDefinitions: projectUidl?.root?.stateDefinitions || {},
      seo: projectUidl?.root?.seo || {}
    };
  }, [projectUidl]);

  useEffect(() => {
    // @ts-ignore
    store.uidlFragment.next(fragmentsList[fragment]);
  }, [fragment, fragmentsList]);

  return (
    <div
      style={{
        marginTop: 4,
        display: "flex",
        flexWrap: "wrap",
        padding: 8,
        gap: 8,
        borderRadius: 4,
        border: "solid 1px #ccc",
        marginBottom: 16
      }}
    >
      {Object.keys(fragmentsList).map((fragmentName) => (
        <Fragment
          selected={fragment === fragmentName}
          name={fragmentName}
          onClick={setFragment}
        />
      ))}
    </div>
  );
}
