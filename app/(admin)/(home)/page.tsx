"use client";
import HomeScreen from "@/components/admin/home/home";
import AccessDenied from "@/components/common/access-denied";
import LayoutContainer from "@/components/common/layout-container";
import DashBoardBody from "@/components/production/dashboard/dashboardbody";
import DashboardHeader from "@/components/production/dashboard/dashboardheader";
import DashboardStatus from "@/components/production/dashboard/dashboardstatus";
import { useSession } from "next-auth/react";

const Home = () => {
  const session = useSession();
  if (session.data?.user.role === "Production") {
    return (
      <LayoutContainer>
        <div className="w-full h-full bg-blue-100">
          <div className="w-full">
            <DashboardHeader />
          </div>
          <div className="w-full p-2 h-[25%]">
            <DashboardStatus />
          </div>
          <div className="w-full min-h-[400px] p-2">
            <DashBoardBody />
          </div>
        </div>
      </LayoutContainer>
    );
  }
  return <HomeScreen />;
};

export default Home;
