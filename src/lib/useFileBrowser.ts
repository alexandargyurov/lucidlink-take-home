import { useState, useEffect, useMemo } from "react";
import { S3 } from "aws-sdk";
import { useLocation } from "react-router-dom";

type FileBrowser = {
  directories: string[];
  files: string[];
  createFile: (fileName: string, content: string) => Promise<void>;
  createDirectory: (directory: string) => Promise<void>;
  readFile: (fileName: string) => Promise<string>;
  deleteFile: (fileName: string) => Promise<void>;
  deleteDirectory: (directory: string) => Promise<void>;
};

export function useFileBrowser(): FileBrowser {
  const [directories, setDirectories] = useState<string[]>([]);
  const [files, setFiles] = useState<string[]>([]);
  const location = useLocation();
  const currentDir = useMemo(() => location.pathname, [location]);

  const s3 = new S3({
    accessKeyId: localStorage.getItem("AWS_ACCESS_KEY_ID") as string,
    secretAccessKey: localStorage.getItem("AWS_SECRET_ACCESS_KEY") as string,
    region: localStorage.getItem("AWS_REGION") as string,
  });
  const Bucket = localStorage.getItem("AWS_BUCKET") as string;

  useEffect(() => {
    fetchFiles();
  }, [currentDir]);

  useEffect(() => {
    fetchDirectories();
  }, []);

  const fetchDirectories = async (): Promise<void> => {
    const response = await s3
      .listObjectsV2({
        Bucket,
      })
      .promise();

    const directoriesSet = new Set<string>();
    response.Contents?.forEach((content) => {
      const key = content.Key || "";
      const parts = key.split("/");
      for (let i = 1; i < parts.length; i++) {
        directoriesSet.add(parts.slice(0, i).join("/") + "/");
      }
    });

    setDirectories(Array.from(directoriesSet));
  };

  const fetchFiles = async (): Promise<void> => {
    const response = await s3
      .listObjectsV2({
        Bucket,
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
        Bucket,
        Key: `${currentDir}/${directory}/.keep`,
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
        Bucket,
        Key: `${currentDir}/${fileName}.txt`,
        Body: content,
      })
      .promise();
    fetchFiles();
  };

  const deleteDirectory = async (prefix: string): Promise<void> => {
    const response = await s3
      .listObjectsV2({
        Bucket,
        Prefix: prefix,
      })
      .promise();

    if (response.Contents) {
      const objectsToDelete = response.Contents.map((object) => ({
        Key: object.Key as string,
      }));

      await s3
        .deleteObjects({
          Bucket,
          Delete: { Objects: objectsToDelete },
        })
        .promise();
    }
    fetchFiles();
  };

  const readFile = async (fileName: string): Promise<string> => {
    const response = await s3
      .getObject({
        Bucket,
        Key: fileName,
      })
      .promise();

    return response.Body?.toString() || "";
  };

  const deleteFile = async (fileName: string): Promise<void> => {
    await s3
      .deleteObject({
        Bucket,
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
    readFile,
    deleteFile,
    deleteDirectory,
  };
}
