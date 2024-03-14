import Loading from "@/loading";
import React from "react";
import ListCardContainer from "./list-cart";
import { getAllBreaks } from "@/data/break";
import { BreaksData } from "@/types";

const BreakFormListContainer = async () => {
  const data = await getAllBreaks();
  const breaks: BreaksData[] = JSON.parse(data.data);
  return (
    <div className="w-full h-[400px] sm:h-[500px] md:h-[700px] lg:h-[700px]  overflow-auto  ">
      <div className=" w-full grid-col  grid  grid-cols-1 sm:grid-cols-1 p-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {breaks.map((info: BreaksData, index: number) => {
          return (
            <p className="h-auto" key={index}>
              <ListCardContainer {...info} />
            </p>
          );
        })}
      </div>
    </div>
  );
};
export default BreakFormListContainer;
