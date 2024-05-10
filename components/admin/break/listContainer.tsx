"use client";

import { BreaksData } from "@/types";
import React, { useEffect, useState } from "react";
import ListCardContainer from "./list-cart";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MdRefresh } from "react-icons/md";
interface ListContainerProps {
  breaks: BreaksData[];
  editBreak: Function;
}

const ListContainer = ({ breaks, editBreak }: ListContainerProps) => {
  const [breakList, setBreakList] = useState<BreaksData[]>(breaks);
  const [inputValue, setInputValue] = useState<string>("");

  useEffect(() => {
    setBreakList(() => breaks);
  }, [breaks]);
  return (
    <>
      <div className="p-4 flex justify-start items-center">
        <Input
          value={inputValue}
          className="max-w-sm "
          placeholder="search by name"
          onChange={(e) => {
            setInputValue(e.target.value);
            if (e.target.value === "") return setBreakList((e) => breaks);
            const newList: BreaksData[] = breaks.filter(
              (info: BreaksData, index) => info.name.includes(e.target.value)
            );
            setBreakList((e) => [...newList]);
          }}
        />
        <Button
          className="ml-2 mr-auto "
          variant={"secondary"}
          onClick={() => {
            setBreakList((e) => [...breaks]);
            setInputValue("");
          }}>
          <MdRefresh />
        </Button>
      </div>
      {breakList.length < 1 && (
        <div className="w-full h-[200px] flex justify-center items-center ring-1 m-4 rounded-md ring-neutral-300">
          <p className="text-sm font-bold text-neutral-500">No breaks found!</p>
        </div>
      )}
      <div className=" w-full grid-col  grid grid-cols-1 sm:grid-cols-1 p-2 md:grid-cols-2 lg:grid-cols-2 gap-6 m-1">
        {breakList?.map((info: BreaksData, index: number) => {
          return (
            <div className="h-auto" key={index}>
              <ListCardContainer breaks={info} editBreak={editBreak} />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ListContainer;
