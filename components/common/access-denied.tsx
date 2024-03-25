import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const AccessDenied = () => {
  return (
    <div className="w-full h-full bg-white flex flex-col justify-center items-center">
      <p className="text-lg text-theme font-bold">
        You do not have permission for this page!
      </p>
      <div className="w-[350px] relative h-[300px] flex justify-center items-center">
        <Image
          alt="access-denaied"
          src="/access-denied.png"
          fill
          className="object-cover"
        />
      </div>
      <Button>
        <Link href={"/"}>Go to home</Link>
      </Button>
    </div>
  );
};

export default AccessDenied;
