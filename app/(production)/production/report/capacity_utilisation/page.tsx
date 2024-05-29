"use client";
import CapacityUtilisationListContainer from "@/components/production/report/capacity_utlisation/capacity_utilisationListContainer";
import LayoutContainer from "@/components/common/layout-container";
import BackButton from "@/components/common/back-button";

const CapacityUtilisation = () => {
  return (
    <LayoutContainer>
      <BackButton />
      <div className="w-full min-h-[400px] p-2 ">
        <CapacityUtilisationListContainer />
      </div>
    </LayoutContainer>
  );
};

export default CapacityUtilisation;
