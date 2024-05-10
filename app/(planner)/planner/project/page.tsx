import LayoutContainer from "@/components/common/layout-container";
import ProjectFormContainer from "@/components/planner/project/projectFormContainer";
import ProjectListContainer from "@/components/planner/project/projectListContainer";

const Planner = () => {
  return (
    <LayoutContainer>
      <div className="w-full min-h-[200px] p-2 ">
        <ProjectFormContainer />
      </div>
      <div className="w-full min-h-[400px] p-2 ">
        <ProjectListContainer />
      </div>
    </LayoutContainer>
  );
};

export default Planner;
