"use client";
import AccessDenied from "@/components/common/access-denied";
import SideBar from "@/components/common/sidebar";
import Topbar from "@/components/common/topbar";
import { adminTabs, plannerTabs } from "@/config/const";
import { TabData } from "@/types";
import type { Metadata } from "next";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const metadata: Metadata = {
  title: "Admin",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [tabs, setTabs] = useState<TabData[]>();
  const session = useSession();
  const path = usePathname();
  const router = useRouter();
  useEffect(() => {
    if (session.data?.user.role === "Admin") {
      return setTabs(adminTabs);
    }
    if (session.data?.user.role === "Planner") {
      return setTabs(plannerTabs);
    }
  }, []);
  // if (session.status === "unauthenticated") {
  //   return <AccessDenied />;
  // }
  if (session.data?.user.role !== "Admin" && path !== "/") {
    return <AccessDenied />;
  }
  return (
    <main className="w-full h-full flex flex-row items-center justify-center">
      <SideBar tabs={tabs!} />
      <div className="flex-1 h-full">
        <Topbar tabs={tabs!} />
        <div className="w-full h-[95%] p-2 bg-blue-50">
          <div className="w-full h-[100%]  shadow-sm">{children}</div>
        </div>
      </div>
    </main>
  );
}
