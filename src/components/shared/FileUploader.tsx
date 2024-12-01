import { useCallback, useState } from "react";
import { useDropzone, FileWithPath } from "react-dropzone";
import { Button } from "../ui/button";

type FileUploaderProps = {
  fieldChange: (FILES: [File]) => void;
  mediaUrl: string;
};

const FileUploader = ({ fieldChange, mediaUrl }: FileUploaderProps) => {
  const [fileUrl, setFileUrl] = useState(mediaUrl); // set mediaUrl as default state to populate fileUrl on post edit
  const [file, setFile] = useState<File[]>([]);

  // ACCEPT FILES ON DROP
  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      setFile(acceptedFiles);
      if (acceptedFiles.length > 0) {
        fieldChange([acceptedFiles[0]]);
      }
      setFileUrl(URL.createObjectURL(acceptedFiles[0]));
    },
    [file]
  );

  // SET ALLOWED FILE TYPES
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".svg", ".jpeg", ".gif"],
    },
  });

  return (
    <div
      {...getRootProps()}
      className="flex flex-center flex-col bg-dark-3 rounded-xl cursor-pointer"
    >
      <input {...getInputProps()} className="cursor-pointer" />
      {fileUrl ? (
        <>
          <div className="flex flex-1 w-full justify-center p-5 lg:p-10">
            <img src={fileUrl} alt="image" className="file_uploader-img" />
          </div>
          <p className="file_uploader-label">Click or drag photo to replace</p>
        </>
      ) : (
        <div className="file_uploader-box">
          <img
            src="/assets/icons/file-upload.svg"
            alt="file-upload"
            width={96}
            height={77}
          />
          <h3 className="base-medium text-light-2 mt-6 mb-2">
            Drag n Drop photo here.
          </h3>
          <p className="small-regular text-light-4 mb-6">PNG, JPG, SVG</p>

          <Button className="shad-button_dark_4">Select from files</Button>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
