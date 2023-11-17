import React from "react";
import { useFileBrowser } from "../../lib/useFileBrowser";

import "./FileBrowser.module.css";

const FileBrowser = (): React.JSX.Element => {
  const { files, deleteFile } = useFileBrowser();

  return (
    <div style={{ width: "100%" }}>
      <table>
        <thead>
          <tr>
            <th>File Name</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {files.map((file, index) => (
            <tr key={index}>
              <td>{file}</td>
              <td>
                <button onClick={() => deleteFile(file)}>Open</button>
                <button onClick={() => deleteFile(file)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FileBrowser;
