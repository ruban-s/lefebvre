"use client";
import { signOut, useSession } from "next-auth/react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "../ui/button";
import { VscSignOut } from "react-icons/vsc";
import { MdFullscreen } from "react-icons/md";
import { MdFullscreenExit } from "react-icons/md";

import { useState } from "react";

const Topbar = () => {
  const session = useSession();
  const [isFullScreen, setIsFullScreen] = useState(false);
  const toggleFullScreen = () => {
    if (!isFullScreen) {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    setIsFullScreen((prevState) => !prevState);
  };

  return (
    <div className="w-full   h-[5%] bg-white  flex justify-end items-center pr-4">
      {!isFullScreen ? (
        <Button
          className="bg-white hover:bg-neutral-100 mr-2"
          onClick={toggleFullScreen}>
          <MdFullscreen size={25} className="text-theme font-bold " />
        </Button>
      ) : (
        <Button
          className="bg-white hover:bg-neutral-100 mr-2"
          onClick={toggleFullScreen}>
          <MdFullscreenExit size={25} className="text-theme font-bold " />
        </Button>
      )}
      <HoverCard>
        <HoverCardTrigger className="hover:cursor-pointer" draggable={true}>
          <Avatar className="w-[40px] h-[40px]  border-spacing-1 border-2 border-theme">
            <AvatarImage
              src={
                session.data?.user?.image === ""
                  ? "https://github.com/shadcn.png"
                  : session.data?.user?.image
              }
            />
            <AvatarFallback>
              <p className=" capitalize text-theme font-bold">
                {session.data?.user?.name[0]}
              </p>
            </AvatarFallback>
          </Avatar>
        </HoverCardTrigger>
        <HoverCardContent className="w-[250px] h-[250px] flex flex-col justify-start items-center">
          <Avatar className="w-[70px] h-[70px]  border-spacing-1 border-2 border-theme">
            <AvatarImage
              src={
                session.data?.user?.image === ""
                  ? "https://github.com/shadcn.png"
                  : session.data?.user?.image
              }
            />
            <AvatarFallback>
              <p className=" capitalize text-theme font-bold">
                {session.data?.user?.name[0]}
              </p>
            </AvatarFallback>
          </Avatar>
          <p className="text-theme font-semibold capitalize">
            {session.data?.user?.name}
          </p>
          <p className="bg-blue-100  text-theme shadow-md p-1 text-sm rounded-md capitalize">
            Admin
          </p>
          <div className="p-2  border-t mt-10">
            <Button
              onClick={() => {
                signOut();
              }}
              className="bg-black font-bold">
              sign out{" "}
              <span className="ml-2">
                <VscSignOut size={20} />
              </span>
            </Button>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  );
};

export default Topbar;
