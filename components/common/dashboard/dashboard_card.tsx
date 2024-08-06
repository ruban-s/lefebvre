import {
  DashboardCardDataProps,
  DashboardCardsProps,
} from "./dashboard_interfac";
import ProgressBar from "./progressive_bar";
import { FaEye } from "react-icons/fa";
import Link from "next/link";
import { DashboardDialog } from "./dashboard_dialog";

export const DashboardCards = ({
  heading,
  data,
  barColor,
  value,
  total,
  emptyColor,
  hasShowEye,
}: DashboardCardsProps) => {
  const progressBarProps = {
    value: value,
    text: total,
    pathColor: barColor,
    textColor: barColor,
    emptyColor: emptyColor,
  };
  //data in each row
  const Row = ({ keyProps, count, queryType }: DashboardCardDataProps) => {
    return (
      <div className="flex flex-row gap-2 items-center justify-between text-sm">
        <span
          className={`${keyProps === "OT" ? "text-red-600" : "text-inherit"}`}>
          {keyProps}
        </span>
        <div className="flex flex-row gap-2 items-center text-sm">
          <span
            className={`${
              keyProps === "OT" ? "text-red-600" : "text-inherit"
            }`}>
            :{count}
          </span>
          {hasShowEye ? (
            <Link
              href={{
                pathname: `/production/dashboard/project/${queryType}`,
              }}
              className={`flex flex-row justify-center items-center`}>
              <FaEye className="text-gray-500 cursor-pointer" />
            </Link>
          ) : (
            <div>
              {heading.toLowerCase() === "workers" && (
                <DashboardDialog
                  type="workers"
                  properties={
                    keyProps.toLowerCase() === "onduty"
                      ? { attendance: "present" }
                      : keyProps.toLowerCase() === "workers"
                      ? { attendance: "all" }
                      : { attendance: keyProps }
                  }
                />
              )}
              {heading.toLowerCase() === "shift" && (
                <DashboardDialog
                  type="shift"
                  properties={
                    keyProps.toLowerCase() === "shift"
                      ? { work_type: "all" }
                      : { work_type: keyProps }
                  }
                />
              )}
              {heading.toLowerCase() === "attendance" && (
                <DashboardDialog
                  type="attendance"
                  properties={
                    keyProps.toLowerCase() === "total"
                      ? { attendance: "all" }
                      : keyProps.toLowerCase() === "ot"
                      ? { attendance: "overtime" }
                      : { attendance: keyProps }
                  }
                />
              )}
            </div>

            // <span>hi</span>
          )}
        </div>
      </div>
    );
  };

  //data cards
  return (
    <div className="w-full h-full flex flex-row justify-between md:justify-around items-center p-2 gap-2">
      {/* progress bar */}
      <div className={`w-[35%] h-[50%]`}>
        <ProgressBar {...progressBarProps} />
      </div>
      {/* Project data */}
      <div className="flex flex-col gap-2">
        <h1 style={{ color: barColor }} className="font-extrabold text-xl">
          {heading}
        </h1>
        <div className="space-y-2">
          {data.map((item: DashboardCardDataProps, index: any) => {
            // console.log(item);
            return (
              <div key={index}>
                <Row {...item} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
