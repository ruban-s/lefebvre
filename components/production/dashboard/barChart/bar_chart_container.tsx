"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
} from "recharts";

import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormField,
} from "@/components/ui/form";

import { DashBoardFormSchema } from "@/schemas/index";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { BarChartData } from "@/types";
import { getBarChartDataByMonthAndYear } from "@/data/dashboard";
import Loading from "@/loading";
import { useCallback, useEffect, useMemo, useState } from "react";
import { currentDate } from "@/commonfunction";

const chartConfig = {
  direct: {
    label: "Direct",
    // color: "hsl(var(--chart-1))",
    color: "#5887b6",
  },
  indirect: {
    label: "Indirect",
    // color: "hsl(var(--chart-2))",
    color: "#6cc59d",
  },
} satisfies ChartConfig;

// const chartData = [
//   {
//     month: "Jan",
//     direct_hours: 10,
//     indirect_hours: 20,
//     direct_count: 10,
//     indirect_count: 30,
//   },
//   {
//     month: "Feb",
//     direct_hours: 20,
//     indirect_hours: 30,
//     direct_count: 10,
//     indirect_count: 30,
//   },
//   {
//     month: "Mar",
//     direct_hours: 30,
//     indirect_hours: 40,
//     direct_count: 10,
//     indirect_count: 30,
//   },
//   {
//     month: "Apr",
//     direct_hours: 10,
//     indirect_hours: 30,
//     direct_count: 10,
//     indirect_count: 30,
//   },
//   {
//     month: "May",
//     direct_hours: 60,
//     indirect_hours: 10,
//     direct_count: 10,
//     indirect_count: 30,
//   },
//   {
//     month: "Jun",
//     direct_hours: 30,
//     indirect_hours: 50,
//     direct_count: 10,
//     indirect_count: 30,
//   },
//   {
//     month: "Jul",
//     direct_hours: 50,
//     indirect_hours: 100,
//     direct_count: 10,
//     indirect_count: 30,
//   },
//   {
//     month: "Aug",
//     direct_hours: 60,
//     indirect_hours: 20,
//     direct_count: 10,
//     indirect_count: 30,
//   },
//   {
//     month: "Sep",
//     direct_hours: 15,
//     indirect_hours: 25,
//     direct_count: 10,
//     indirect_count: 30,
//   },
//   {
//     month: "Oct",
//     direct_hours: 25,
//     indirect_hours: 31,
//     direct_count: 10,
//     indirect_count: 30,
//   },
//   {
//     month: "Nov",
//     direct_hours: 10,
//     indirect_hours: 200,
//     direct_count: 10,
//     indirect_count: 30,
//   },
//   {
//     month: "Dec",
//     direct_hours: 20,
//     indirect_hours: 60,
//     direct_count: 10,
//     indirect_count: 30,
//   },
// ];

const BarChartContainer = () => {
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["barChart"],
    queryFn: async () => {
      console.log("refetching barChart");
      console.log(month);
      const data = await getBarChartDataByMonthAndYear(month, year);
      return data.data as BarChartData[];
    },
    refetchInterval: 5000,
    enabled: month !== null && year !== null,
  });

  //custom ToolTip
  const CustomToolTip = useCallback(
    ({ payload, label, active }: { payload: any; label: any; active: any }) => {
      if (active && payload.length > 0) {
        return (
          <div className="bg-white/50 px-5 py-5 flex flex-col gap-4 w-[250px] backdrop-blur-sm rounded-2xl shadow-lg">
            <div className="py-2 px-4 rounded-sm bg-slate-600/90 text-white space-y-2">
              {Object.entries(payload[0].payload).map(
                ([key, value]: [string, any]) => {
                  const keyVal = key.replaceAll("_", " ");
                  return (
                    <div
                      key={key}
                      className="flex flex-row justify-between max-w-sm">
                      <p key={key} className="capitalize text-lg">
                        {keyVal}
                      </p>
                      <p className="capitalize">{value}</p>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        );
      }
    },
    []
  );

  const form = useForm<z.infer<typeof DashBoardFormSchema>>({
    resolver: zodResolver(DashBoardFormSchema),
    defaultValues: {
      month: "",
      year: "",
    },
  });

  const chartData = data!;

  useEffect(() => {
    if (month && year) {
      refetch();
    } else {
      const date = currentDate();
      console.log(date);
      const [dates, months, years] = date.split("-");
      setMonth(months);
      setYear(years);
    }
  }, [month, year]);

  const years = useMemo(
    () => Array.from({ length: 101 }, (_, i) => 2000 + i),
    []
  ); //generates an array from 2000 to 2100

  //loading handler
  if (isLoading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Loading />
      </div>
    );
  }
  //error handler
  if (isError) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <p>Error Fetching data.Contact the admin...</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      <div className="flex flex-row gap-5 justify-end pb-5">
        <Form {...form}>
          <form>
            <div className="flex flex-row gap-4 pr-5">
              <FormField
                control={form.control}
                name="month"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Month</FormLabel>
                      <Select
                        onValueChange={(e) => {
                          if (e !== month) {
                            setMonth(e);
                          }
                        }}
                        value={month}>
                        <FormControl>
                          <SelectTrigger className="w-[180px] border-2 border-gray-400">
                            <SelectValue placeholder="Month..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="empty">Select a month</SelectItem>
                          <SelectItem value="01">January</SelectItem>
                          <SelectItem value="02">February</SelectItem>
                          <SelectItem value="03">March</SelectItem>
                          <SelectItem value="04">April</SelectItem>
                          <SelectItem value="05">May</SelectItem>
                          <SelectItem value="06">June</SelectItem>
                          <SelectItem value="07">July</SelectItem>
                          <SelectItem value="08">August</SelectItem>
                          <SelectItem value="09">September</SelectItem>
                          <SelectItem value="10">October</SelectItem>
                          <SelectItem value="11">November</SelectItem>
                          <SelectItem value="12">December</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={form.control}
                name="year"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Year</FormLabel>
                      <Select
                        onValueChange={(e) => {
                          if (e !== year) {
                            setYear(e);
                          }
                        }}
                        value={year}>
                        <SelectTrigger className="w-[180px] border-2 border-gray-400">
                          <SelectValue placeholder="Year..." />
                        </SelectTrigger>
                        <SelectContent>
                          {years.map((year) => (
                            <SelectItem key={year} value={year.toString()}>
                              {year}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </div>
          </form>
        </Form>
      </div>
      {data?.length === 0 || data?.length === null ? (
        <div className="w-full h-full flex justify-center items-center">
          <p>No Data found...</p>
        </div>
      ) : (
        <Card className="w-full h-[90%]">
          <CardContent className="w-full h-full">
            <ChartContainer
              config={chartConfig}
              className="aspect-auto w-full h-4/5 overflow-auto">
              <BarChart
                accessibilityLayer
                data={chartData}
                margin={{
                  left: 12,
                  right: 12,
                }}>
                <CartesianGrid />
                <XAxis dataKey="date" />
                <YAxis />
                <Legend />
                <Tooltip
                  content={
                    <CustomToolTip payload={[]} label={""} active={false} />
                  }
                />
                <Bar
                  dataKey={"direct_hours"}
                  fill={`#5887b6`}
                  activeBar={<rect fill="#2a4157" />}
                  barSize={50}
                />
                <Bar
                  dataKey={"indirect_hours"}
                  fill={`#6cc59d`}
                  activeBar={<rect fill="#29513f" />}
                  barSize={50}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BarChartContainer;
