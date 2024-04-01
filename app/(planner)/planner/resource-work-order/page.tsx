"use client";

import LayoutContainer from "@/components/common/layout-container";
import WorkOrderResourceFormContainer from "@/components/planner/work-order-resource/workOrderResourceFormContainer";
import WorkOrderResourceListContainer from "@/components/planner/work-order-resource/workOrderResourceListContainer";
import { UserData } from "@/types";
import { useState } from "react";

const Planner = () => {
  return (
    <LayoutContainer>
      <div className="w-full min-h-[200px] p-2 ">
        <WorkOrderResourceFormContainer />
      </div>
      <div className="w-full min-h-[400px] p-2 ">
        {/* <WorkOrderResourceListContainer /> */}
      </div>
    </LayoutContainer>
  );
};

export default Planner;
