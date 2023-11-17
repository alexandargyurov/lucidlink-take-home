import React from "react";
import { useNavigate } from "react-router-dom";

import styles from "./Sidebar.module.css";
import { useFileBrowser } from "../../lib/useFileBrowser";

export function Sidebar(): React.JSX.Element {
  const navigate = useNavigate();

  const { directories } = useFileBrowser();

  function handleDoubleClick(directory: string): void {
    navigate(directory);
  }

  return (
    <div className={styles.sidebarContainer}>
      <h2>File Directories</h2>

      <button onDoubleClick={() => handleDoubleClick("/")}>/</button>

      {directories.map((directory) => (
        <button
          key={directory}
          onDoubleClick={() => handleDoubleClick(directory)}
        >
          {directory}
        </button>
      ))}
    </div>
  );
}
