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
      <div className="w-full h-auto ">
        <UserFormContainer />
      </div>
      <div className="flex-1 w-[99%] mb-1 justify-center items-center flex bg-white rounded-lg shadow-md ">
        <UserListContainer editUser={editUser} />
      </div>
    </LayoutContainer>
  );
};

export default User;
