"use client";
import React from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

interface ProgressBarProps {
  value: number;
  text: string;
  pathColor: string;
  textColor: string;
}

const ProgressBar = ({
  value,
  text,
  pathColor,
  textColor,
}: ProgressBarProps) => {
  return (
    <div className="w-full h-full">
      <CircularProgressbar
        value={value}
        text={text}
        circleRatio={0.75}
        styles={buildStyles({
          pathTransitionDuration: 3,
          rotation: 1 / 2 + 1 / 8,
          //   trailColor: "#cac8f0",
          //   pathColor: "#4a42e2",
          //   textColor: "#4a42e2",
          // trailColor: trailColor,
          pathColor: pathColor,
          textColor: textColor,
        })}
      />
    </div>
  );
};

export default ProgressBar;
