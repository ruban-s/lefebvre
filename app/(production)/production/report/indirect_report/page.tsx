"use client";
import IndirectReportFormContainer from "@/components/production/report/indirect_report/indirect_reportFormContainer";
import IndirectReportListContainer from "@/components/production/report/indirect_report/indirect_reportListContainer";
import LayoutContainer from "@/components/common/layout-container";
import { useState } from "react";
import BackButton from "@/components/common/back-button";
import Image from "next/image";

const IndirectReport = () => {
  // const [filterData, setFilterData] = useState({
  //   from_date: "",
  //   to_date: "",
  // });

  // const [defaultData, setDefaultData] = useState({
  //   from_date: new Date(),
  //   to_date: new Date(),
  // });

  // const changeFilterData = (props: any) => {
  //   setFilterData({
  //     from_date: props.formattedStartDate,
  //     to_date: props.formattedEndDate,
  //   });
  // };

  // return (
  //   <LayoutContainer>
  //     <BackButton />
  //     <div className="w-full min-h-[200px] p-2 ">
  //       <IndirectReportFormContainer
  //         defaultValue={defaultData}
  //         changeFilterValue={changeFilterData}
  //       />
  //     </div>
  //     <div className="w-full min-h-[400px] p-2 ">
  //       <IndirectReportListContainer
  //         filterData={filterData}
  //         defaultData={defaultData}
  //       />
  //     </div>
  //   </LayoutContainer>
  // );
  return (
    <div className="w-full h-full flex justify-center items-center bg-white">
      <div className="w-[150px] h-150px">
        <Image
          src="/bg-waiting.jpeg"
          width={200}
          height={200}
          alt="LEFEBVRE"
          className="object-contain rounded-lg  "
        />
      </div>
    </div>
  );
};

export default IndirectReport;
