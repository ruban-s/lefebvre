"use client";
import React, { useEffect, useRef, useState } from "react";
import { Input } from "../ui/input";
import Image from "next/image";
import { CiImageOn } from "react-icons/ci";
import { Button } from "../ui/button";
import { IoIosWarning } from "react-icons/io";
import { MdDelete } from "react-icons/md";

interface CustomImageInputProps {
  value: string;
  onChange: Function;
}

const CustomImageInput = ({ value, onChange }: CustomImageInputProps) => {
  const [image, setImage] = useState<any>(value);

  const imageRef = useRef<HTMLInputElement>(null);

  function fileToBase64(file: any) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        const base64String = reader?.result;
        resolve(base64String);
      };

      reader.onerror = (error) => {
        reject(error);
      };

      file && reader.readAsDataURL(file);
    });
  }
  useEffect(() => {
    setImage(value);
  }, [value]);

  return (
    <div
      className=" w-[150px] h-[150px] bg-[url('/cog-bg2.png')] bg-im flex justify-center items-center mr-2 rounded-lg  border-dotted border-1 border-ne p-2 mt-4 relative cursor-pointer"
      onClick={() => imageRef.current?.click()}>
      <Input
        ref={imageRef}
        type="file"
        className="absolute"
        accept="image/*"
        onChange={async (value: any) => {
          const file = value.target?.files[0];
          const base64String = await fileToBase64(file);
          setImage(base64String);
          onChange(base64String);
        }}
      />
      <Image
        alt="emp-img"
        src={value ? value : image ? image : "https://github.com/shadcn.png"}
        fill
        className="object-cover rounded-lg group bg-neutral-200"
      />
      {image && (
        <Button
          variant={"destructive"}
          className="absolute right-0 bottom-0 m-1  flex"
          onClick={(e) => {
            e.stopPropagation();
            setImage("");
            onChange(() => {
              onChange("");
            });
          }}>
          <MdDelete />
        </Button>
      )}
    </div>
  );
};

export default CustomImageInput;
