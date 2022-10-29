import { useState, useEffect } from "react";
import { Subject } from "subjecto";
import { ProjectType, ProjectUIDL } from "@teleporthq/teleport-types";
//import defaultProject from "../uidlSamples/project.json";
import marketingLP from "../uidlSamples/marketingLP.json";

// extend with React hooks
Subject.prototype.hook = function () {
  // eslint-disable-next-line
  const [value, setValue] = useState(this.value);
  // eslint-disable-next-line
  useEffect(() => this.subscribe(setValue).unsubscribe, []);
  return value;
};

const store = {
  projectType: new Subject<ProjectType>(ProjectType.REACT),
  view: new Subject("UIDL", "view", [(v: string) => v, (v: string) => v]),
  uidlProject: new Subject<ProjectUIDL>(
    (marketingLP as unknown) as ProjectUIDL
  ),
  // holds a selected sub-node from the the full project UIDL
  uidlFragment: new Subject<any>((marketingLP as unknown) as ProjectUIDL)
};

export default store;
