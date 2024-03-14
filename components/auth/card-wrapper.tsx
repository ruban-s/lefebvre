import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import Header from "@/components/auth/header";
interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel?: string;
}
const CardWrapper = ({ children, headerLabel }: CardWrapperProps) => {
  return (
    <Card className="w-[400px] shadow-md rounded-none">
      <CardHeader>
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
