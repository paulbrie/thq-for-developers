import Folder from "./folder";

export default function TreeView(
  data: any,
  onSelectFile: (file: File) => void,
  firstLevelFilesOnly: boolean,
  level = -1
) {
  level++;
  return (
    <>
      {Object.keys(data).map((key) => {
        if (key === "subFolders" && !firstLevelFilesOnly) {
          const subFolders = data[key] as THQ.Subfolder[];
          subFolders.sort(
            // @ts-ignore
            (a, b) => (a.name < b.name ? -1 : 1)
          );
          return subFolders.sort().map((subFolder) => (
            <Folder isOpen={true} folder={subFolder}>
              {TreeView(subFolder, onSelectFile, firstLevelFilesOnly, level)}
            </Folder>
          ));
        }

        if (key === "files") {
          if (!firstLevelFilesOnly && level === 0) {
            return null;
          }
          const files = data[key];
          // sort alphabetically
          files.sort(
            // @ts-ignore
            (a, b) => (a.name + a.fileType < b.name + b.fileType ? -1 : 1)
          );
          return files.map((file: File) => (
            <div
              className="file"
              onClick={() => onSelectFile(file)}
              style={{ marginLeft: level === 0 ? 0 : 8 }}
            >
              <div
                style={{
                  backgroundColor: "#ccc",
                  height: 16,
                  width: 12,
                  marginRight: 8
                }}
              ></div>
              {file.name}.{file.fileType}
            </div>
          ));
        }

        return null;
      })}
    </>
  );
}
