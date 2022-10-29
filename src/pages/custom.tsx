import React, { useEffect, useState } from "react";
import { customGenerator } from "../generators/custom";
import { createProjectPacker } from "@teleporthq/teleport-project-packer";
import store from "../store";
import sample1 from "../uidlSamples/sample1.json";
import CodePreview from "../components/codePreview";
import { fileTypes } from "../constants";
import { ProjectUIDL } from "@teleporthq/teleport-types";
import { customJsPreProcessor } from "../generators/custom/preProcessors";
import TreeView from "../components/filesTreeView/treeView";
// the custom generator will parse the UIDL structure
// and generate the code
const generator = customGenerator();

// the packer will "pack" all the generated files together
const packer = createProjectPacker();

// @ts-ignore
packer.setGenerator(generator);

export default function Custom() {
  const uidlProject = store.uidlProject.hook();
  const [files, setFiles] = useState<THQ.ProjectFiles | null>(null);
  const [selectedFile, setSelectedFile] = useState<{
    name: string;
    type: string;
    content: string;
  }>({
    name: "",
    type: "js",
    content: "// select a file"
  });

  const onSelectFile = (file: THQ.File) => {
    setSelectedFile({
      name: file.name,
      content: file.content,
      // @ts-ignore
      type: fileTypes[file.fileType] || "javascript"
    });
  };

  useEffect(() => {
    // work with a specific sample
    store.uidlProject.next((sample1 as unknown) as ProjectUIDL);
  }, []);

  useEffect(() => {
    packer
      .pack(customJsPreProcessor(uidlProject))
      .then(({ success, payload }) => {
        if (success) {
          // console.log(payload);
          setFiles((payload as unknown) as THQ.ProjectFiles);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [uidlProject]);

  return (
    <div>
      <h1>Custom</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "240px auto",
          width: "100%"
        }}
      >
        <div>
          {/* folders first */}
          {files && TreeView(files, onSelectFile, false)}
          {/* then first level files */}
          {files && TreeView(files, onSelectFile, true)}
        </div>
        <CodePreview
          fileName={""}
          fileContent={selectedFile.content}
          fileType={selectedFile.type}
        />
      </div>
    </div>
  );
}
