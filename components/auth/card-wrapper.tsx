import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import Header from "@/components/auth/header";
import Logo from "./logo";
interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel?: string;
}
const CardWrapper = ({ children, headerLabel }: CardWrapperProps) => {
  return (
    <Card className="w-[400px] shadow-md shadow-white/20  bg-neutral-100/10 backdrop-blur-sm  rounded-lg border-none">
      <CardHeader>
        <Logo />
        <Header label={headerLabel || ""} />
      </CardHeader>
      <CardContent>{children}</CardContent>

      {/* <CardFooter>
        <BackButton label={backButtonlabel} href={backButtonHref} />
      </CardFooter> */}
    </Card>
  );
};

export default CardWrapper;
