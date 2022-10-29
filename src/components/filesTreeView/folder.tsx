import { useState } from "react";
import { FolderIcon } from "../svgIcons";
export default function Folder({
  children,
  folder,
  isOpen
}: {
  children: React.ReactElement<any, any>;
  folder: { name: string };
  isOpen: boolean;
}) {
  const [localIsOpen, setLocalIsOpen] = useState(isOpen);
  const toggle = () => setLocalIsOpen(!localIsOpen);
  return (
    <div>
      <div className="folder" onClick={toggle}>
        <FolderIcon />
        {folder.name}
      </div>
      <div style={{ display: localIsOpen ? "" : "none" }}>{children}</div>
    </div>
  );
}
