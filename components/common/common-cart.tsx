import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Button } from "../ui/button";

interface CommanCardContainerProps {
  children: React.ReactNode;
  headerLabel?: string;
  footer?: boolean;
  primaryActionLable?: string;
  primaryAction?: Function;
  secondayActionLable?: string;
  secondaryAction?: Function;
}
const CommanCardContainer = ({
  children,
  headerLabel,
  footer = false,
  primaryAction,
  primaryActionLable = "",
  secondaryAction,
  secondayActionLable = "",
}: CommanCardContainerProps) => {
  return (
    <Card className="w-full h-full ">
      <CardHeader>
        <p className="font-bold text-lg ">{headerLabel}</p>
      </CardHeader>
      <CardContent>{children}</CardContent>
      {footer && (
        <CardFooter>
          <div className="w-full h-full  flex justify-end items-center">
            {secondaryAction && (
              <Button
                className="bg-neutral-300 mr-2 hover:bg-neutral-300 hover:shadow-md"
                onClick={() => secondaryAction()}>
                <p className="text-sm font-bold text-black ">
                  {secondayActionLable}
                </p>
              </Button>
            )}
            {primaryAction && (
              <Button className="bg-theme" onClick={() => primaryAction()}>
                <p className="text-sm font-bold text-white">
                  {primaryActionLable}
                </p>
              </Button>
            )}
          </div>
        </CardFooter>
      )}
    </Card>
  );
};

export default CommanCardContainer;
