import React, { useState } from "react";
import { S3 } from "aws-sdk";
import { Field, Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";

import styles from "./Login.module.css";

export function PageLogin(): React.JSX.Element {
  const navigate = useNavigate();
  const [error, setError] = useState<string>();

  const initialValues = {
    AWS_SECRET_ACCESS_KEY: "",
    AWS_ACCESS_KEY_ID: "",
    AWS_REGION: "",
    AWS_BUCKET: "",
  };

  const handleSubmit = (values: typeof initialValues): void => {
    const s3 = new S3({
      accessKeyId: values.AWS_ACCESS_KEY_ID,
      secretAccessKey: values.AWS_SECRET_ACCESS_KEY,
      region: values.AWS_REGION,
    });

    s3.listObjects({ Bucket: values.AWS_BUCKET }, (err) => {
      if (err) {
        console.error(err);
        setError("Error logging in, please check credentials");
        // Display the error message to the user
      } else {
        localStorage.setItem(
          "AWS_SECRET_ACCESS_KEY",
          values.AWS_SECRET_ACCESS_KEY
        );
        localStorage.setItem("AWS_ACCESS_KEY_ID", values.AWS_ACCESS_KEY_ID);
        localStorage.setItem("AWS_REGION", values.AWS_REGION);
        localStorage.setItem("AWS_BUCKET", values.AWS_BUCKET);
        navigate("/");
      }
    });
  };

  return (
    <div className={styles.loginPage}>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form className={styles.form}>
          <div>
            <label htmlFor="AWS_SECRET_ACCESS_KEY">AWS Secret Access Key</label>
            <Field
              type="text"
              id="AWS_SECRET_ACCESS_KEY"
              name="AWS_SECRET_ACCESS_KEY"
            />
          </div>

          <div>
            <label htmlFor="AWS_ACCESS_KEY_ID">AWS Access Key ID</label>
            <Field
              type="text"
              id="AWS_ACCESS_KEY_ID"
              name="AWS_ACCESS_KEY_ID"
            />
          </div>

          <div>
            <label htmlFor="AWS_REGION">AWS Region</label>
            <Field type="text" id="AWS_REGION" name="AWS_REGION" />
          </div>

          <div>
            <label htmlFor="AWS_BUCKET">AWS Bucket</label>
            <Field type="text" id="AWS_BUCKET" name="AWS_BUCKET" />
          </div>

          {error}

          <button type="submit">Login</button>
        </Form>
      </Formik>
    </div>
  );
}
