import LayoutContainer from "@/components/common/layout-container";
import ClosedProject from "@/components/planner/cosed-project/listContainer";
import WorkOrderFormContainer from "@/components/planner/work-order/workOrderFormContainer";
import WorkOrderListContainer from "@/components/planner/work-order/workOrderListContainer";

const Planner = () => {
  return (
    <LayoutContainer>
      <div className="w-full min-h-[400px] p-2 ">
        <ClosedProject />
      </div>
    </LayoutContainer>
  );
};

export default Planner;
