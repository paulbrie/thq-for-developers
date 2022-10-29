import JsonView from "react-json-view";
import defaultProject from "../uidlSamples/project.json";
import marketingLP from "../uidlSamples/marketingLP.json";
import store from "../store";
import { useRef, useState } from "react";
import { ProjectUIDL } from "@teleporthq/teleport-types";
import SwitchButton from "../components/switchButton";

export default function UidlPage() {
  const [error, setError] = useState("");
  const [collapsed, setCollapsed] = useState(false);
  const [uploadView, setUploadView] = useState(false);
  const [viewJsonAsString, setViewJsonAsString] = useState(true);
  const uidlProject = store.uidlProject.hook();
  const textareaRef = useRef<HTMLTextAreaElement>(null!);

  const onUploadClick = () => {
    if (!uploadView) {
      setUploadView(true);
    } else {
      try {
        store.uidlProject.next(
          (JSON.parse(textareaRef.current.value) as unknown) as ProjectUIDL
        );
        setUploadView(false);
        setError("");
      } catch (error) {
        // @ts-ignore
        setError(error + "");
      }
    }
  };

  const useDefaultUidl = () => {
    store.uidlProject.next((defaultProject as unknown) as ProjectUIDL);
    setUploadView(false);
    setError("");
  };

  const useMarketingLpUidl = () => {
    store.uidlProject.next((marketingLP as unknown) as ProjectUIDL);
    setUploadView(false);
    setError("");
  };

  const editCurrentUidl = () => {
    textareaRef.current.value = JSON.stringify(
      store.uidlProject.value,
      null,
      2
    );
    setUploadView(true);
    setError("");
  };

  return (
    <div>
      <div style={{ marginBottom: 16, gap: 8, display: "flex" }}>
        <button onClick={onUploadClick}>
          {uploadView ? "Save" : "Upload UIDL"}
        </button>
        {!uploadView && (
          <>
            <button onClick={useDefaultUidl}>Use default UIDL</button>
            <button onClick={useMarketingLpUidl}>Use Marketing LP UIDL</button>
            <button onClick={editCurrentUidl}>Edit current UIDL</button>
            {!viewJsonAsString && (
              <>
                <button onClick={() => setCollapsed(true)}>Collapse</button>
                <button onClick={() => setCollapsed(false)}>Expand</button>
              </>
            )}
          </>
        )}
        {uploadView && (
          <button onClick={() => setUploadView(false)}>Cancel</button>
        )}
      </div>
      {error && (
        <div style={{ marginBottom: 16 }} className="error">
          {error}
        </div>
      )}
      {!uploadView && (
        <div
          style={{
            display: "flex",
            gap: 8,
            marginTop: 32,
            marginBottom: 16,
            padding: "8px 0"
          }}
        >
          Parsed <i>(slow)</i>
          <SwitchButton
            on={viewJsonAsString}
            onClick={() => setViewJsonAsString(!viewJsonAsString)}
          />
          String <i>(fast)</i>
        </div>
      )}
      <textarea
        ref={textareaRef}
        style={{
          width: "100%",
          height: 320,
          display: uploadView ? "" : "none"
        }}
        placeholder="Paste your UIDL here"
      ></textarea>
      {!uploadView && (
        <>
          {viewJsonAsString ? (
            <textarea
              style={{ width: "100%", height: 600 }}
              defaultValue={JSON.stringify(uidlProject, null, 2)}
            ></textarea>
          ) : (
            <JsonView collapsed={collapsed} src={uidlProject} />
          )}
        </>
      )}
    </div>
  );
}
