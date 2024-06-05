import LayoutContainer from "@/components/common/layout-container";
import DashBoardBody from "@/components/production/dashboard/dashboardbody";
import DashboardHeader from "@/components/production/dashboard/dashboardheader";
import Image from "next/image";

const Dashboard = () => {
  // return (
  //   <LayoutContainer>
  //     <div className="w-full p-2 h-[25%]">
  //       <DashboardHeader />
  //     </div>
  //     <div className="w-full p-2 flex flex-1">
  //       <DashBoardBody />
  //     </div>
  //   </LayoutContainer>
  // );
  return (
    <div className="w-full h-full flex justify-center items-center bg-white">
      <div className="w-[150px] h-150px">
        <Image
          src="/bg-waiting.jpeg"
          width={200}
          height={200}
          alt="LEFEBVRE"
          className="object-contain rounded-lg  "
        />
      </div>
    </div>
  );
};

export default Dashboard;
