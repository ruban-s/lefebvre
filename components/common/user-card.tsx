"use client";

import { useSession } from "next-auth/react";
import Header from "../auth/header";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const UserCard = () => {
  const session = useSession();

  return (
    <Card className="w-full h-full shadow-md">
      {/* <CardHeader>
      </CardHeader> */}
      <CardContent className="flex h-[200px] flex-col justify-evenly items-center">
        <Avatar className="w-[100px] h-[100px]  border-spacing-1 border-2 border-theme">
          {session.data?.user?.image !== "" && (
            <AvatarImage src="https://github.com/shadcn.png" />
          )}
          <AvatarFallback>
            <p className=" capitalize text-theme font-bold">
              {session.data?.user?.name[0]}
            </p>
          </AvatarFallback>
        </Avatar>
        <p className="text-theme font-semibold capitalize">
          {session.data?.user?.name}
        </p>
        <p className="bg-blue-100  text-theme shadow-md p-2 rounded-md capitalize">
          Admin
        </p>
      </CardContent>
    </Card>
  );
};

export default UserCard;
