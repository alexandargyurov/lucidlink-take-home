import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useBreadcrumbs from "use-react-router-breadcrumbs";
import styles from "./FileBrowser.module.css";
import { useFileBrowser } from "../../lib/useFileBrowser";

import { ModalNewDirectory } from "../ModalNewDirectory/ModalNewDirectory";
import { ModalNewFile } from "../ModalNewFile/ModalNewFile";
import { ModalReadFile } from "../ModalReadFile/ModalReadFile";

const FileBrowser = (): React.JSX.Element => {
  const [showModalDirectory, setShowModalDirectory] = useState(false);
  const [showModalFile, setShowModalFile] = useState(false);
  const [fileName, setShowModalRead] = useState<string>();
  const { files, deleteFile, deleteDirectory } = useFileBrowser();
  const breadcrumbs = useBreadcrumbs();
  const navigate = useNavigate();

  return (
    <>
      <div className={styles.fileBrowser}>
        <div className={styles.header}>
          <div className={styles.breadcrums}>
            {breadcrumbs.map(({ breadcrumb }) => breadcrumb)}
          </div>

          <div>
            <button onClick={() => setShowModalDirectory(true)}>
              new directory
            </button>
            <button onClick={() => setShowModalFile(true)}>new file</button>
          </div>
        </div>

        <table className={styles.table}>
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
                  <button
                    onClick={() =>
                      file.endsWith(".txt")
                        ? setShowModalRead(file)
                        : navigate(file)
                    }
                  >
                    Open
                  </button>
                  <button
                    onClick={() =>
                      file.endsWith(".txt")
                        ? deleteFile(file)
                        : deleteDirectory(file)
                    }
                  >
                    Delete
                  </button>
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

      {fileName && (
        <ModalReadFile
          fileName={fileName}
          onClose={() => setShowModalRead(undefined)}
        />
      )}
    </>
  );
};

export default FileBrowser;
