import LayoutContainer from "@/components/common/layout-container";
import LabourListContainer from "@/components/production/labour-card/labourListContainer";

const Planner = () => {
  return (
    <LayoutContainer>
      {/* <div className="w-full min-h-[200px] p-2 ">
        <ProjectFormContainer />
      </div> */}
      <div className="w-full min-h-[400px] p-2 ">
        <LabourListContainer />
      </div>
    </LayoutContainer>
  );
};

export default Planner;
