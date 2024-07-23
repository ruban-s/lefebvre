"use client";
import LayoutContainer from "@/components/common/layout-container";
import DashBoardBody from "@/components/production/dashboard/dashboardbody";
import DashboardHeader from "@/components/production/dashboard/dashboardheader";
import DashboardStatus from "@/components/production/dashboard/dashboardstatus";
import { BarChartIcon } from "@radix-ui/react-icons";
import Image from "next/image";

const Dashboard = () => {
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
  // return (
  //   <div className="w-full h-full flex justify-center items-center bg-white">
  //     <div className="w-[150px] h-150px">
  //       <Image
  //         src="/bg-waiting.jpeg"
  //         width={200}
  //         height={200}
  //         alt="LEFEBVRE"
  //         className="object-contain rounded-lg  "
  //       />
  //     </div>
  //   </div>
  // );
};

export default Dashboard;
