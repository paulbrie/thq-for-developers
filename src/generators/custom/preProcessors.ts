import { UIDLUtils } from "@teleporthq/teleport-shared";
import { ProjectUIDL } from "@teleporthq/teleport-types";
import parse from "html-dom-parser";

export const customJsPreProcessor = (uidlProject: ProjectUIDL) => {
  UIDLUtils.traverseNodes(uidlProject.root.node, (node) => {
    if (node.type === "raw") {
      parse(node.content, {
        withStartIndices: true,
        withEndIndices: true
      }).forEach((element) => {
        if (element.type === "script") {
          console.log(element.attribs, element.children);
          // node.content = "// comment \n" + node.content;
          if (element.startIndex && element.endIndex) {
            console.log(
              node.content.substring(element.startIndex, element.endIndex)
            );
          }
        }
      });
      parse("<p>Hello, World!</p>");
    }
  });
  return uidlProject;
};
