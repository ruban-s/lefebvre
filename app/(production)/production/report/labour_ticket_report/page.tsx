"use client";
import LayoutContainer from "@/components/common/layout-container";
import { useState } from "react";
import LabourTicketReportFormContainer from "@/components/production/report/labour_ticket_report/labour_ticket_reportFormContainer";
import LabourTicketReportListContainer from "@/components/production/report/labour_ticket_report/labour_ticket_reportListContainer";
import BackButton from "@/components/common/back-button";

const LabourTicketReport = () => {
  const [filterData, setFilterData] = useState({
    from_date: "",
    to_date: "",
  });

  const [defaultData, setDefaultData] = useState({
    from_date: new Date(),
    to_date: new Date(),
  });

  const changeFilterData = (props: any) => {
    setFilterData({
      from_date: props.formattedStartDate,
      to_date: props.formattedEndDate,
    });
  };

  return (
    <LayoutContainer>
      <BackButton />
      <div className="w-full min-h-[200px] p-2 ">
        <LabourTicketReportFormContainer
          defaultValue={defaultData}
          changeFilterValue={changeFilterData}
        />
      </div>
      <div className="w-full min-h-[400px] p-2 ">
        <LabourTicketReportListContainer
          filterData={filterData}
          defaultData={defaultData}
        />
      </div>
    </LayoutContainer>
  );
};

export default LabourTicketReport;
