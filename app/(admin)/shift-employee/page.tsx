// "use client";

import LayoutContainer from "@/components/common/layout-container";
import UserListContainer from "@/components/admin/user/userListContainer";
import { UserData } from "@/types";
import { useState } from "react";
import ShiftListContainer from "@/components/admin/shift-employe/employeeListContainer";

const User = () => {
  return (
    <LayoutContainer>
      {/* <div className="w-full min-h-[200px] p-2 ">
        <ShiftFormContainer />
      </div> */}
      <div className="w-full min-h-[400px] p-2 ">
        <ShiftListContainer />
      </div>
    </LayoutContainer>
  );
};

export default User;
