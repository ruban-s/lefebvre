import React, { useEffect, useRef, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { VscFileSubmodule } from "react-icons/vsc";
import { Input } from "../ui/input";
import { uploadImage } from "@/data/common";
import { Button } from "../ui/button";

interface Props {
  files: string[];
  onChange: (files: string[]) => void;
  disabled?: boolean;
}

const ResourceMultiFileSelect: React.FC<Props> = ({
  files,
  onChange,
  disabled,
}) => {
  console.log(files);
  const imageRef = useRef<HTMLInputElement>(null);
  const popRef = useRef<HTMLButtonElement>(null);

  const [fileList, setFileList] = useState<string[]>(files);
  const [loading, setLoading] = useState<boolean>(false);

  const newData = async (value: FormData, name: string) => {
    setLoading(true);
    const data = await uploadImage(value, name);
    setLoading(false);
    const updatedFiles = [...fileList, data.data];
    setFileList(updatedFiles);
    onChange(updatedFiles);
    popRef.current?.click();
  };

  useEffect(() => {
    console.log(files);
    setFileList(files);
  }, [files]);

  return (
    <Popover>
      <PopoverTrigger
        className="flex justify-start items-center"
        ref={popRef}
        disabled={disabled}>
        {loading ? (
          <div role="status">
            <svg
              aria-hidden="true"
              className="w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          <VscFileSubmodule
            className="p-2 bg-slate-50 shadow-sm rounded-sm text-black"
            size={40}
          />
        )}
        {fileList?.length > 0 && `| selected- ${fileList.length}`}
      </PopoverTrigger>
      <PopoverContent className="relative min-w-[400px] w-full border-2 border-gray-300">
        <Input
          ref={imageRef}
          type="file"
          className="h-[1px] w-[1px] ring-0"
          placeholder=""
          onChange={(e: any) => {
            const formData = new FormData();
            if (e.target?.files[0]) {
              formData.append("file", e.target.files[0]);
              newData(formData, e.target.files[0].name);
            }
          }}
        />
        <div
          className="w-full h-[20px] absolute top-0 left-0 p-4 py-6 cursor-pointer rounded-sm bg-slate-50 flex justify-center items-center shadow-sm border-b-2 border-gray-200"
          onClick={() => {
            imageRef.current?.click();
          }}>
          Add File
        </div>
        <div className="mt-10">
          {fileList?.map((info, index) => (
            <div
              key={index}
              className="flex flex-row justify-between w-full items-center gap-4">
              <div className="w-[90%] flex flex-row gap-2 items-start">
                <span className="font-black">{index + 1}</span>
                {info}
              </div>
              <div
                className="w-5 h-5 justify-center p-3 border-1 border-red-500 border flex items-center bg-red-50 text-red-500 rounded-sm shadow-sm cursor-pointer"
                onClick={() => {
                  const updatedFiles = fileList?.filter((_, i) => i !== index);
                  setFileList(updatedFiles);
                  onChange(updatedFiles);
                  popRef.current?.click();
                }}>
                x
              </div>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ResourceMultiFileSelect;
