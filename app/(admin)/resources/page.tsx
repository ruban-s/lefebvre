import LayoutContainer from "@/components/common/layout-container";
import ResourceFormContainer from "@/components/admin/resource/resourceFormContainer";
import ResourceListContainer from "@/components/admin/resource/resourceListContainer";

const User = () => {
  return (
    <LayoutContainer>
      <div className="w-full min-h-[200px] p-2 ">
        <ResourceFormContainer />
      </div>
      <div className="w-full min-h-[400px] p-2 ">
        <ResourceListContainer />
      </div>
    </LayoutContainer>
  );
};

export default User;
