import LayoutContainer from "@/components/common/layout-container";
import UnreleasedProject from "@/components/planner/unreleased-project/listContainer";

const Planner = () => {
  return (
    <LayoutContainer>
      <div className="w-full min-h-[400px] p-2 ">
        <UnreleasedProject />
      </div>
    </LayoutContainer>
  );
};

export default Planner;
