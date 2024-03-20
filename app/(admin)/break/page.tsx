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
      <div className="w-full h-auto ">
        <BreakFormContainer data={data} />
      </div>
      <div className="flex-1 w-[99%] mb-1 justify-center items-center flex">
        <CommanCardContainer headerLabel="Breaks" footer={false}>
          <BreakFormListContainer editBreak={editBreak} />
        </CommanCardContainer>
      </div>
    </LayoutContainer>
  );
};

export default Break;
