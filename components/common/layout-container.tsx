import React from "react";
import { ScrollArea } from "../ui/scroll-area";

interface LayoutContainerProps {
  children: React.ReactNode;
}

const LayoutContainer = ({ children }: LayoutContainerProps) => {
  return (
    <div className="w-full h-full bg-neutral-100 flex flex-col justify-center items-center">
      {children}
    </div>
  );
};

export default LayoutContainer;
