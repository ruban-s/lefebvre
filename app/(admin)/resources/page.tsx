"use client";

import LayoutContainer from "@/components/common/layout-container";
import ResourceFormContainer from "@/components/admin/resource/resourceFormContainer";
import ResourceListContainer from "@/components/admin/resource/resourceListContainer";

const User = () => {
  return (
    <LayoutContainer>
      <div className="w-full h-auto ">
        <ResourceFormContainer />
      </div>
      <div className="flex-1 w-[99%] mb-1 justify-center items-center flex bg-white rounded-lg shadow-md ">
        <ResourceListContainer />
      </div>
    </LayoutContainer>
  );
};

export default User;
