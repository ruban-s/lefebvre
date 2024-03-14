import SideBar from "@/components/common/sidebar";
import Topbar from "@/components/common/topbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin",
  description: "",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="w-full h-full flex flex-row items-center justify-center">
      <SideBar />

      <div className="flex-1 h-full">
        <Topbar />
        <div className="w-full h-[95%] p-2 bg-white">
          <div className="w-full h-[100%] bg-neutral-100 shadow-sm">
            {children}
          </div>
        </div>
      </div>
    </main>
  );
}
