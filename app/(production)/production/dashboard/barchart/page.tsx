"use client";
import BackButton from "@/components/common/back-button";
import LayoutContainer from "@/components/common/layout-container";
import BarChartContainer from "@/components/production/dashboard/barChart/bar_chart_container";
const BarChart = () => {
  return (
    <LayoutContainer>
      <div className="w-full h-full">
        <BackButton />
        <BarChartContainer />
      </div>
    </LayoutContainer>
  );
};

export default BarChart;
