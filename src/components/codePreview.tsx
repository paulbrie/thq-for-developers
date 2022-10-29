import Editor from "@monaco-editor/react";
import { editor } from "monaco-editor";
import { useEffect, useRef } from "react";

export default function CodePreview({
  fileName,
  fileContent,
  fileType
}: {
  fileName: string;
  fileContent: string;
  fileType: string;
}) {
  const editorInstance = useRef<editor.IStandaloneCodeEditor>(null!);
  const onMount = (editor: editor.IStandaloneCodeEditor) => {
    editorInstance.current = editor;
  };

  useEffect(() => {
    function resize() {
      window.onresize = function () {
        editorInstance.current.layout();
      };
    }

    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  });

  return (
    <div style={{ width: "100%" }}>
      {fileName && (
        <span style={{ marginBottom: 16, display: "flex" }}>{fileName}</span>
      )}
      <div style={{ height: 400, border: "solid 1px #cccccc80" }}>
        <Editor value={fileContent} language={fileType} onMount={onMount} />
      </div>
    </div>
  );
}
