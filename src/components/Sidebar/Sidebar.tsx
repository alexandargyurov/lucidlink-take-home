import React from "react";

import { useNavigate } from "react-router-dom";

import styles from "./Sidebar.module.css";

import { buildTree } from "../../lib/buildTree";
import { useFileBrowser } from "../../lib/useFileBrowser";
import { SidebarNode } from "../SidebarNode/SidebarNode";

export function Sidebar(): React.JSX.Element {
  const navigate = useNavigate();
  const { directories } = useFileBrowser();

  const directoriesTree = buildTree(directories);

  return (
    <div className={styles.sidebarContainer}>
      <h2>File Directories</h2>

      <div className={styles.directoriesContainer}>
        <button onDoubleClick={() => navigate("/")}>/</button>
        {directoriesTree.map((node, index) => (
          <SidebarNode node={node} key={index} />
        ))}
      </div>
    </div>
  );
}
