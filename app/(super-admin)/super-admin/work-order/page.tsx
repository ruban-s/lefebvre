import LayoutContainer from "@/components/common/layout-container";
import WorkOrderListContainer from "@/components/super-admin/work-order/workOrderListContainer";

const Planner = () => {
  return (
    <LayoutContainer>
      <div className="w-full min-h-[400px] p-2 ">
        <WorkOrderListContainer />
      </div>
    </LayoutContainer>
  );
};

export default Planner;
