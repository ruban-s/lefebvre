"use client";
import BreakFormContainer from "@/components/admin/break/breakFormContainer";
import BreakFormListContainer from "@/components/admin/break/breakFormListContainer";
import CommanCardContainer from "@/components/common/common-cart";
import LayoutContainer from "@/components/common/layout-container";
import { BreaksData } from "@/types";
import { useState } from "react";

const Break = () => {
  const [data, setData] = useState<BreaksData>();
  const editBreak = (value: BreaksData) => {
    setData({ ...value });
  };

  return (
    <LayoutContainer>
      <div className="w-full min-h-[200px] p-2 ">
        <BreakFormContainer data={data} />
      </div>
      <div className="w-full min-h-[400px] p-2 ">
        <BreakFormListContainer editBreak={editBreak} />
      </div>
    </LayoutContainer>
  );
};

export default Break;
