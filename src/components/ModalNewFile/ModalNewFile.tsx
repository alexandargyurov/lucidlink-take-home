import React from "react";
import { Field, Form, Formik } from "formik";

import { useFileBrowser } from "../../lib/useFileBrowser";
import { Modal } from "../Modal/Modal";

type Props = {
  onClose: () => void;
};

export function ModalNewFile({ onClose }: Props): React.JSX.Element {
  const { createFile } = useFileBrowser();

  const handleSubmit = (values: {
    fileName: string;
    fileContent: string;
  }): void => {
    createFile(values.fileName, values.fileContent);
  };

  return (
    <Modal onClose={onClose}>
      <Formik
        initialValues={{ fileName: "", fileContent: "" }}
        onSubmit={handleSubmit}
      >
        <Form>
          <Field type="text" name="fileName" placeholder="Enter file name" />
          <Field
            type="textarea"
            name="fileContent"
            placeholder="File content"
          />
          <button type="submit">Create File</button>
        </Form>
      </Formik>
    </Modal>
  );
}
