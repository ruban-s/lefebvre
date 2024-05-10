import LayoutContainer from "@/components/common/layout-container";
import ProjectListContainer from "@/components/super-admin/project/projectListContainer";

const Planner = () => {
  return (
    <LayoutContainer>
      <div className="w-full min-h-[400px] p-2 ">
        <ProjectListContainer />
      </div>
    </LayoutContainer>
  );
};

export default Planner;
