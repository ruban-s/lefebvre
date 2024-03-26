"use client";

import LayoutContainer from "@/components/common/layout-container";
import UserFormContainer from "@/components/admin/user/userFormContainer";
import UserListContainer from "@/components/admin/user/userListContainer";
import { UserData } from "@/types";
import { useState } from "react";

const User = () => {
  const [data, setData] = useState<UserData>();
  const editUser = (value: UserData) => {
    setData({ ...value });
  };

  return (
    <LayoutContainer>
      <div className="w-full min-h-[200px] p-2 ">
        <UserFormContainer />
      </div>
      <div className="w-full min-h-[400px] p-2 ">
        <UserListContainer editUser={editUser} />
      </div>
    </LayoutContainer>
  );
};

export default User;
