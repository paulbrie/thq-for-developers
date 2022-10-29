import ProjectTypeSelector from "../components/projectTypeSelector";
import store from "../store";
import { fileTypes } from "../constants";
import project from "../uidlSamples/project.json";
import { useEffect, useState } from "react";
import CodePreview from "../components/codePreview";
import { parse } from "../utils";
import { ProjectType, ProjectUIDL } from "@teleporthq/teleport-types";
export default function Home() {
  const [filesList, setFilesList] = useState<Record<string, string>>({});
  const [selectedFile, setSelectedFile] = useState(-1);
  const projectType = store.projectType.hook();

  let fileType =
    (Object.keys(filesList)
      // eslint-disable-next-line
      [selectedFile]?.split(".")
      .pop() as keyof typeof fileTypes) || "html";

  useEffect(() => {
    parse((project as unknown) as ProjectUIDL, ProjectType.REACT)
      .then(setFilesList)
      .catch((err) => {});
  }, []);

  useEffect(() => {
    (async () => {
      const list = await parse(
        (project as unknown) as ProjectUIDL,
        projectType
      );
      if (list) {
        setFilesList(list);
      }
    })();
    setSelectedFile(0);
  }, [projectType]);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "320px 1fr",
        width: "100%"
      }}
    >
      <div>
        <ProjectTypeSelector
          selected={projectType}
          onChange={(projectType) => {
            store.projectType.next(projectType);
          }}
        />
        <li style={{ marginTop: 32 }}>
          {Object.keys(filesList).map((fileName, index) => {
            return (
              <ul
                style={{
                  lineHeight: "24px",
                  cursor: "default",
                  fontWeight: selectedFile === index ? "bold" : ""
                }}
                onClick={() => setSelectedFile(index)}
                key={index}
              >
                {fileName}
              </ul>
            );
          })}
        </li>
      </div>
      <CodePreview
        fileName={Object.keys(filesList)[selectedFile]}
        fileContent={Object.values(filesList)[selectedFile]}
        fileType={fileTypes[fileType]}
      />
    </div>
  );
}
