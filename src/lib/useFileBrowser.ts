import { useState, useEffect, useMemo } from "react";
import { S3 } from "aws-sdk";
import { useLocation } from "react-router-dom";

const s3 = new S3({
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  region: process.env.REACT_APP_AWS_REGION,
});

type FileBrowser = {
  directories: string[];
  files: string[];
  createFile: (fileName: string, content: string) => Promise<void>;
  createDirectory: (directory: string) => Promise<void>;
  deleteFile: (fileName: string) => Promise<void>;
  deleteDirectory: (directory: string) => Promise<void>;
};

export function useFileBrowser(): FileBrowser {
  const [directories, setDirectories] = useState<string[]>([]);
  const [files, setFiles] = useState<string[]>([]);
  const location = useLocation();
  const currentDir = useMemo(() => location.pathname, [location]);

  useEffect(() => {
    fetchFiles();
  }, [currentDir]);

  useEffect(() => {
    fetchDirectories();
  }, [currentDir]);

  const fetchDirectories = async (): Promise<void> => {
    const response = await s3
      .listObjectsV2({
        Bucket: process.env.REACT_APP_AWS_BUCKET as string,
        Delimiter: "/",
        Prefix: "/",
      })
      .promise();

    setDirectories(
      response.CommonPrefixes?.map((prefix) => prefix.Prefix || "") || []
    );
  };

  const fetchFiles = async (): Promise<void> => {
    const response = await s3
      .listObjectsV2({
        Bucket: process.env.REACT_APP_AWS_BUCKET as string,
        Prefix: currentDir,
        Delimiter: "/",
      })
      .promise();

    const folders =
      response.CommonPrefixes?.map((prefix) => prefix.Prefix || "") || [];
    const files = response.Contents?.map((file) => file.Key || "") || [];
    const filteredFiles = files.filter((file) => !file.endsWith("/.keep"));

    setFiles([...folders, ...filteredFiles]);
  };

  const createDirectory = async (directory: string): Promise<void> => {
    await s3
      .putObject({
        Bucket: process.env.REACT_APP_AWS_BUCKET as string,
        Key: `${currentDir}${directory}/.keep`,
        Body: "",
      })
      .promise();
    fetchFiles();
  };

  const createFile = async (
    fileName: string,
    content: string
  ): Promise<void> => {
    await s3
      .putObject({
        Bucket: process.env.REACT_APP_AWS_BUCKET as string,
        Key: `${currentDir}${fileName}.txt`,
        Body: content,
      })
      .promise();
    fetchFiles();
  };

  const deleteDirectory = async (prefix: string): Promise<void> => {
    const response = await s3
      .listObjectsV2({
        Bucket: process.env.REACT_APP_AWS_BUCKET as string,
        Prefix: prefix,
      })
      .promise();

    if (response.Contents) {
      const objectsToDelete = response.Contents.map((object) => ({
        Key: object.Key as string,
      }));

      await s3
        .deleteObjects({
          Bucket: process.env.REACT_APP_AWS_BUCKET as string,
          Delete: { Objects: objectsToDelete },
        })
        .promise();
    }
    fetchFiles();
  };

  const deleteFile = async (fileName: string): Promise<void> => {
    await s3
      .deleteObject({
        Bucket: process.env.REACT_APP_AWS_BUCKET as string,
        Key: fileName,
      })
      .promise();
    fetchFiles();
  };

  return {
    directories,
    files,
    createFile,
    createDirectory,
    deleteFile,
    deleteDirectory,
  };
}
