import LayoutContainer from "@/components/common/layout-container";
import WorkOrderFormContainer from "@/components/planner/work-order/workOrderFormContainer";
import WorkOrderListContainer from "@/components/planner/work-order/workOrderListContainer";

const Planner = () => {
  return (
    <LayoutContainer>
      <div className="w-full min-h-[200px] p-2 ">
        <WorkOrderFormContainer />
      </div>
      <div className="w-full min-h-[400px] p-2 ">
        <WorkOrderListContainer />
      </div>
    </LayoutContainer>
  );
};

export default Planner;
