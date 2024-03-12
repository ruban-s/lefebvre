"use client";
import Image from "next/image";

const Logo = () => {
  return (
    <Image
      src="/lefebvre-logo.png"
      fill
      alt="LEFEBVRE"
      className="object-contain  rounded-lg "
    />
  );
};

export default Logo;
