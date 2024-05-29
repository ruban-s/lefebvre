"use client";
import IndirectReportFormContainer from "@/components/production/report/indirect_report/indirect_reportFormContainer";
import IndirectReportListContainer from "@/components/production/report/indirect_report/indirect_reportListContainer";
import LayoutContainer from "@/components/common/layout-container";
import { useState } from "react";
import BackButton from "@/components/common/back-button";

const IndirectReport = () => {
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
        <IndirectReportFormContainer
          defaultValue={defaultData}
          changeFilterValue={changeFilterData}
        />
      </div>
      <div className="w-full min-h-[400px] p-2 ">
        <IndirectReportListContainer
          filterData={filterData}
          defaultData={defaultData}
        />
      </div>
    </LayoutContainer>
  );
};

export default IndirectReport;
