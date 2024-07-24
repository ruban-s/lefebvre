import { Button } from "@/components/ui/button";
import {
  DashboardCardDataProps,
  DashboardCardsProps,
} from "./dashboard_interfac";
import ProgressBar from "./progressive_bar";
import { FaEye } from "react-icons/fa";

export const DashboardCards = ({
  heading,
  data,
  barColor,
  value,
  total,
  emptyColor,
}: DashboardCardsProps) => {
  const progressBarProps = {
    value: value,
    text: total,
    pathColor: barColor,
    textColor: barColor,
    emptyColor: emptyColor,
  };

  //data in each row
  const Row = ({
    keyProps,
    count,
    onClickFunction,
  }: DashboardCardDataProps) => {
    return (
      <div className="flex flex-row gap-2 items-center justify-between text-sm">
        <span>{keyProps}</span>
        <div className="flex flex-row gap-2 items-center text-sm">
          <span>:{count}</span>
          <button onClick={onClickFunction}>
            <FaEye className="text-gray-500 cursor-pointer" />
          </button>
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
