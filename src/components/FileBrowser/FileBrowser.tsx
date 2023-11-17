import React, { useState } from "react";
import { useFileBrowser } from "../../lib/useFileBrowser";

import "./FileBrowser.module.css";

import { ModalNewDirectory } from "../ModalNewDirectory/ModalNewDirectory";
import { ModalNewFile } from "../ModalNewFile/ModalNewFile";

const FileBrowser = (): React.JSX.Element => {
  const [showModalDirectory, setShowModalDirectory] = useState(false);
  const [showModalFile, setShowModalFile] = useState(false);
  const { files, deleteFile } = useFileBrowser();

  return (
    <>
      <div style={{ width: "100%" }}>
        <div>
          <button onClick={() => setShowModalDirectory(true)}>
            new directory
          </button>
          <button onClick={() => setShowModalFile(true)}>new file</button>
        </div>

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
                <td>
                  {file.endsWith(".txt") ? (
                    <ion-icon name="document-outline"></ion-icon>
                  ) : (
                    <ion-icon name="folder-outline"></ion-icon>
                  )}
                  {file}
                </td>
                <td>
                  <button onClick={() => deleteFile(file)}>Open</button>
                  <button onClick={() => deleteFile(file)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModalDirectory && (
        <ModalNewDirectory onClose={() => setShowModalDirectory(false)} />
      )}
      {showModalFile && (
        <ModalNewFile onClose={() => setShowModalFile(false)} />
      )}
    </>
  );
};

export default FileBrowser;
