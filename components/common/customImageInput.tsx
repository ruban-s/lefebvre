"use client";
import React, { useEffect, useRef, useState } from "react";
import { Input } from "../ui/input";
import Image from "next/image";
import { CiImageOn } from "react-icons/ci";
import { Button } from "../ui/button";
import { IoIosWarning } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { uploadImage } from "@/data/common";
import { useMutation } from "@tanstack/react-query";
import { getAllProject, getAllProject2 } from "@/data/projects";

interface CustomImageInputProps {
  array?: boolean;
  value: string;
  disable?: boolean;
  onChange: Function;
}

const CustomImageInput = ({
  array = false,
  value,
  onChange,
  disable = false,
}: CustomImageInputProps) => {
  const [image, setImage] = useState<any>("/user.png");

  const imageRef = useRef<HTMLInputElement>(null);
  const toBase64 = (file: File) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();

      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  const newData = async (value: FormData, name: string) => {
    var data = await uploadImage(value, name);
    onChange(data.data);
  };

  useEffect(() => {
    setImage(value);
  }, [value]);

  return (
    <div className="w-auto h-auto mr-3">
      {!disable && <p className="mb-2">Image</p>}
      <div className=" w-[100px] h-[100px]  bg-black flex justify-center items-center ring-2 ring-black rounded-lg  relative cursor-pointer">
        <Input
          ref={imageRef}
          type="file"
          className="absolute"
          onChange={(e: any) => {
            const formData = new FormData();
            e.target?.files[0] &&
              formData.append("file", e.target?.files[0] as File);
            e.target?.files[0] && newData(formData, e.target?.files[0].name);
          }}
        />
        <Image
          alt="emp-img"
          src={image || "/user.png"}
          fill
          className="object-cover rounded-lg group bg-neutral-200"
        />
        {!disable && image && image !== "/user.png" && (
          <div
            className="absolute right-7 bottom-0 m-1  flex bg-red-500 rounded-sm p-1"
            onClick={(e) => {
              e.stopPropagation();
              setImage("");
              onChange(() => {
                onChange("");
              });
            }}>
            <MdDelete className="text-white" />
          </div>
        )}
        {!disable && (
          <div
            className="absolute right-0 bottom-0 m-1  flex bg-neutral-300 rounded-sm p-1"
            onClick={(e) => {
              e.stopPropagation();
              imageRef.current?.click();
            }}>
            <CiImageOn className="text-theme" />
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomImageInput;
