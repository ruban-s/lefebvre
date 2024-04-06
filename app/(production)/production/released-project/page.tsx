import LayoutContainer from "@/components/common/layout-container";
import ReleasedProject from "@/components/production/released-project/listContainer";

const Planner = () => {
  return (
    <LayoutContainer>
      <div className="w-full min-h-[400px] p-2 ">
        <ReleasedProject />
      </div>
    </LayoutContainer>
  );
};

export default Planner;
