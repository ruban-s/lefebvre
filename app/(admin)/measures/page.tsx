"use client";

import LayoutContainer from "@/components/common/layout-container";
import MeasureFormContainer from "@/components/admin/measures/measureFormContainer";
import MeasureListContainer from "@/components/admin/measures/measureListContainer";

const Measures = () => {
  return (
    <LayoutContainer>
      <div className="w-full h-auto ">
        <MeasureFormContainer />
      </div>
      <div className="flex-1 w-[99%] mb-1 justify-center items-center flex bg-white rounded-lg shadow-md ">
        <MeasureListContainer />
      </div>
    </LayoutContainer>
  );
};

export default Measures;
