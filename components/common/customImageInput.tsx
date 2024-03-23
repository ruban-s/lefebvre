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
    <div className="w-auto h-auto mr-3">
      <p className="mb-2">Image</p>
      <div className=" w-[100px] h-[100px]  bg-black flex justify-center items-center ring-2 ring-black rounded-lg  relative cursor-pointer">
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
          src={value ? value : image ? image : "/user.png"}
          fill
          className="object-cover rounded-lg group bg-neutral-200"
        />
        {image && image !== "/user.png" && (
          <div
            className="absolute right-7 bottom-0 m-1  flex bg-red-500 rounded-sm p-1"
            onClick={(e) => {
              e.stopPropagation();
              setImage("");
              onChange(() => {
                onChange("/user.png");
              });
            }}>
            <MdDelete className="text-white" />
          </div>
        )}
        <div
          className="absolute right-0 bottom-0 m-1  flex bg-neutral-300 rounded-sm p-1"
          onClick={(e) => {
            e.stopPropagation();
            imageRef.current?.click();
          }}>
          <CiImageOn className="text-theme" />
        </div>
      </div>
    </div>
  );
};

export default CustomImageInput;
