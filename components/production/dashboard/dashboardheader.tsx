import React from "react";

const DashboardHeader = () => {
  return (
    <div className="w-full h-full grid grid-cols-3 gap-5">
      <div className="bg-white h-full rounded-md shadow-md"></div>
      <div className="bg-white col-span-2 h-full rounded-md shadow-md">
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default DashboardHeader;
