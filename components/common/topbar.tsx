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
import Image from "next/image";
import { TiThMenu } from "react-icons/ti";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import SideBar from "./sidebar";
import { IconType } from "react-icons";
import { FaHome } from "react-icons/fa";
import { GiThermometerScale } from "react-icons/gi";
import { IoCalendar } from "react-icons/io5";
import { GiCoffeeCup } from "react-icons/gi";
import {
  FaUsers,
  FaCogs,
  FaUserCog,
  FaAngleDoubleLeft,
  FaUsersCog,
} from "react-icons/fa";
import { TbReportAnalytics } from "react-icons/tb";
import { MdSpaceDashboard } from "react-icons/md";
import { TabData } from "@/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { adminTabs } from "@/config/const";

const Topbar = () => {
  const session = useSession();
  const path = usePathname();

  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isOpen, setOpen] = useState(false);

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
    <div className="w-full   h-[10%] md:h-[5%] bg-white  flex  justify-between items-center pr-4">
      <Dialog open={isOpen}>
        <DialogTrigger
          className="flex md:hidden p-4 bg-neutral-100 rounded-sm shadow-md m-1"
          onClick={() => setOpen(!isOpen)}>
          <TiThMenu />
        </DialogTrigger>
        <DialogContent className="w-[400px] rounded-sm">
          {adminTabs.map(({ icon: Icon, ...value }, index: number) => {
            return (
              <Link
                key={index}
                onClick={() => setOpen(!isOpen)}
                style={{
                  transition: "width 300ms cubic-bezier(0.2, 0, 0, 1) 0s",
                }}
                href={value.link}
                className={`w-full  flex justify-start items-center  cursor-pointer  mb-1 p-2 rounded-md ${
                  path === value.link &&
                  "bg-theme border-spacing-1 border-2 border-theme"
                } ${
                  path !== value.link && "hover:bg-neutral-200 border-b-[1px]"
                }`}>
                <p
                  className={`${
                    path === value.link ? "text-white" : "text-theme"
                  } ml-4  font-medium`}>
                  {value.label}
                </p>
              </Link>
            );
          })}
        </DialogContent>
      </Dialog>

      <div className="flex ml-auto">
        {!isFullScreen ? (
          <Button
            className="bg-white hover:bg-neutral-100 mr-2"
            onClick={toggleFullScreen}
            asChild>
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
    </div>
  );
};

export default Topbar;
