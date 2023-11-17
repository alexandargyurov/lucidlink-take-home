import React, { useEffect, useState } from "react";

import { useFileBrowser } from "../../lib/useFileBrowser";
import { Modal } from "../Modal/Modal";

type Props = {
  fileName: string;
  onClose: () => void;
};

export function ModalReadFile({ fileName, onClose }: Props): React.JSX.Element {
  const { readFile } = useFileBrowser();
  const [fileContent, setFileContent] = useState<string>();

  useEffect(() => {
    async function fetchFile(): Promise<void> {
      const content = await readFile(fileName);
      setFileContent(content);
    }

    fetchFile();
  }, []);

  return (
    <Modal onClose={onClose}>
      <p>{fileContent}</p>
    </Modal>
  );
}
