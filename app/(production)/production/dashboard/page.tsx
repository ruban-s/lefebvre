import LayoutContainer from "@/components/common/layout-container";
import DashBoardBody from "@/components/production/dashboard/dashboardbody";
import DashboardHeader from "@/components/production/dashboard/dashboardheader";

const Dashboard = () => {
  return (
    <LayoutContainer>
      <div className="w-full p-2 h-[25%]">
        <DashboardHeader />
      </div>
      <div className="w-full p-2 flex flex-1">
        <DashBoardBody />
      </div>
    </LayoutContainer>
  );
};

export default Dashboard;
