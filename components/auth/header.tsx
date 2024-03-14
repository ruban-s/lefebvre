"use client";

import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

import React from "react";

interface headerProps {
  label: string;
}

const Header = ({ label }: headerProps) => {
  return (
    <div className=" w-full flex flex-col justify-center items-center space-y-4">
      <h1 className={cn("font-semibold text-3xl", font.className)}>⚙️ Login</h1>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
};

export default Header;
