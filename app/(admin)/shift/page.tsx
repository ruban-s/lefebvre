// "use client";

import LayoutContainer from "@/components/common/layout-container";
import UserListContainer from "@/components/admin/user/userListContainer";
import { UserData } from "@/types";
import { useState } from "react";
import ShiftFormContainer from "@/components/admin/shift/shiftFormContainer";
import ShiftListContainer from "@/components/admin/shift/shiftListContainer";

const User = () => {
  const [data, setData] = useState<UserData>();
  const editUser = (value: UserData) => {
    setData({ ...value });
  };

  return (
    <LayoutContainer>
      <div className="w-full min-h-[200px] p-2 ">
        <ShiftFormContainer />
      </div>
      <div className="w-full min-h-[400px] p-2 ">
        <ShiftListContainer />
      </div>
    </LayoutContainer>
  );
};

export default User;
