"use client";

import { Axios } from "@/action/axios";
import LayoutContainer from "@/components/common/layout-container";
import ProjectFormContainer from "@/components/planner/project/projectFormContainer";
import ProjectListContainer from "@/components/planner/project/projectListContainer";
import { Button } from "@/components/ui/button";
import { getAllBreaks } from "@/data/break";
import { UserData } from "@/types";
import { useState } from "react";

const Planner = () => {
  const [data, setData] = useState<UserData>();
  const editUser = (value: UserData) => {
    setData({ ...value });
  };

  return (
    <LayoutContainer>
      <div className="w-full min-h-[200px] p-2 ">
        <ProjectFormContainer />
      </div>
      <div className="w-full min-h-[400px] p-2 ">
        <ProjectListContainer editUser={editUser} />
      </div>
    </LayoutContainer>
  );
};

export default Planner;
