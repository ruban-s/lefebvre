import LayoutContainer from "@/components/common/layout-container";
import WorkOrderResourceListContainer from "@/components/super-admin/work-order-resource/workOrderResourceListContainer";

const Planner = () => {
  return (
    <LayoutContainer>
      <div className="w-full min-h-[400px] p-2 ">
        <WorkOrderResourceListContainer />
      </div>
    </LayoutContainer>
  );
};

export default Planner;
