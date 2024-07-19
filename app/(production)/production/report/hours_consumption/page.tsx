import BackButton from "@/components/common/back-button";
import LayoutContainer from "@/components/common/layout-container";
import HoursConsumptionReportFormContainer from "@/components/production/report/hours_consumption/hours_consumptionFormContainer";
import HoursConsumptionListContainer from "@/components/production/report/hours_consumption/hours_consumptionListContainer";
import React from "react";

const HoursConsumptionReport = () => {
  return (
    <LayoutContainer>
      <BackButton />
      <div className="w-full min-h-[200px] p-2 ">
        <HoursConsumptionReportFormContainer />
      </div>
      <div className="w-full min-h-[400px] p-2 ">
        <HoursConsumptionListContainer />
      </div>
    </LayoutContainer>
  );
};

export default HoursConsumptionReport;
