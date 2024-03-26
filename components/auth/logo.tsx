"use client";
import Image from "next/image";

const Logo = () => {
  return (
    <Image
      src="/lefebvre-logo.png"
      width={400}
      height={410}
      alt="LEFEBVRE"
      className="object-contain rounded-lg  "
    />
  );
};

export default Logo;
