"use client";
import CapacityUtilisationListContainer from "@/components/production/report/capacity_utlisation/capacity_utilisationListContainer";
import LayoutContainer from "@/components/common/layout-container";

const CapacityUtilisation = () => {
  return (
    <LayoutContainer>
      <div className="w-full min-h-[400px] p-2 ">
        <CapacityUtilisationListContainer />
      </div>
    </LayoutContainer>
  );
};

export default CapacityUtilisation;
