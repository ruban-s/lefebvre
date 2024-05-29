import LayoutContainer from "@/components/common/layout-container";
import StatusListContainer from "@/components/production/status/listContainer";
const Planner = () => {
  return (
    <LayoutContainer>
      <div className="w-full min-h-[400px] p-2 ">
        <StatusListContainer />
      </div>
    </LayoutContainer>
  );
};

export default Planner;
