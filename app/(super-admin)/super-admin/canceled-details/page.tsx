import LayoutContainer from "@/components/common/layout-container";
import ProjectListContainer from "@/components/super-admin/canceled-details/listContainer";

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
