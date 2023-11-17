import React from "react";

import styles from "./Sidebar.module.css";

import { buildTree } from "../../lib/buildTree";
import { useFileBrowser } from "../../lib/useFileBrowser";
import { SidebarNode } from "../SidebarNode/SidebarNode";

export function Sidebar(): React.JSX.Element {
  const { directories } = useFileBrowser();

  const directoriesTree = buildTree(directories);

  return (
    <div className={styles.sidebarContainer}>
      <h2>Directories</h2>

      <div className={styles.directoriesContainer}>
        <SidebarNode
          node={{
            label: "/",
            path: "/",
          }}
        />
        {directoriesTree.map((node, index) => (
          <SidebarNode node={node} key={index} />
        ))}
      </div>
    </div>
  );
}
