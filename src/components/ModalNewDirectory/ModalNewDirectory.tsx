import React from "react";
import { Field, Form, Formik } from "formik";

import { useFileBrowser } from "../../lib/useFileBrowser";
import { Modal } from "../Modal/Modal";

type Props = {
  onClose: () => void;
};

export function ModalNewDirectory({ onClose }: Props): React.JSX.Element {
  const { createDirectory } = useFileBrowser();

  const handleSubmit = (values: { folderName: string }): void => {
    createDirectory(values.folderName);
  };

  return (
    <Modal onClose={onClose}>
      <Formik initialValues={{ folderName: "" }} onSubmit={handleSubmit}>
        <Form>
          <Field
            type="text"
            name="folderName"
            placeholder="Enter folder name"
          />
          <button type="submit">Create Folder</button>
        </Form>
      </Formik>
    </Modal>
  );
}
