"use client";

import { HoursConsumptionReportSchema } from "@/schemas/reportindex";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useHoursConsumptionReportStore } from "@/state";
import { DatePickerWithRange } from "@/components/common/dateRangePicker";
import { DateRange } from "react-day-picker";
import { useEffect, useState } from "react";
import { format, parse } from "date-fns";
import { Button } from "@/components/ui/button";
import { FaUser } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { currentDate } from "@/commonfunction";

const HoursConsumptionReportFormContainer = () => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  // const [disabledDates, setDisbleDates] = useState<Date[]>([]);
  // const [fromDate, setFromDate] = useState<string>("");
  // const [toDate, setToDate] = useState<string>("");
  // const [disable, setDisable] = useState<boolean>(true);

  const setHoursConsumptionReport = useHoursConsumptionReportStore(
    (state: any) => state.setHoursConsumptionReport
  );
  const hoursConsumption = useHoursConsumptionReportStore(
    (state: any) => state.hoursConsumptionReport
  );
  const form = useForm<z.infer<typeof HoursConsumptionReportSchema>>({
    resolver: zodResolver(HoursConsumptionReportSchema),
    defaultValues: {
      consumption: "",
      start_date: "",
    },
  });

  const setRange = (data: DateRange | undefined) => {
    form.clearErrors("start_date");
    setDateRange(data);
    if (!data) {
      form.setValue("start_date", "");
      form.setValue("end_date", "");
      return;
    }
    const { from, to } = data;

    if (!from) {
      form.setValue("start_date", "");
      form.setValue("end_date", "");
      return;
    }
    if (!to) {
      form?.setValue("start_date", format(from, "dd-LL-y"));
      form?.setValue("end_date", format(from, "dd-LL-y"));
      return;
    }
    form.setValue("start_date", format(from, "dd-LL-y"));
    form.setValue("end_date", format(to, "dd-LL-y"));

    return;
  };

  useEffect(() => {
    // console.log(hoursConsumption);
    if (
      hoursConsumption !== null &&
      hoursConsumption.consumption !== null &&
      hoursConsumption.start_date !== null &&
      hoursConsumption.end_date !== null
    ) {
      // console.log(hoursConsumption);
      // console.log(hoursConsumption.start_date);
      // console.log(hoursConsumption.end_date);
      var startDate = hoursConsumption?.start_date!.toString().split("-");
      var endDate = hoursConsumption?.end_date!.toString().split("-");
      setDateRange({
        from: new Date(`${startDate[2]}-${startDate[1]}-${startDate[0]}`),
        to: new Date(`${endDate[2]}-${endDate[1]}-${endDate[0]}`),
      });
      form.setValue("start_date", hoursConsumption?.start_date!);
      form.setValue("end_date", hoursConsumption?.end_date!);
      form.setValue("consumption", hoursConsumption?.consumption!);
    }
  }, [hoursConsumption]);

  const onSubmit = (value: z.infer<typeof HoursConsumptionReportSchema>) => {
    console.log(value);
    const formData = {
      consumption: value.consumption,
      start_date: value.start_date,
      end_date: value.end_date,
    };
    setHoursConsumptionReport({ ...formData });
  };
  return (
    <div className="w-full h-auto bg-white  shadow-sm ring-1 ring-theme rounded-sm">
      <div className="w-[100%] ml-auto mr-auto  flex justify-center items-center   p-4 ">
        <div className="w-[100%]  flex flex-col justify-center items-center lg:justify-start lg:items-start  lg:flex-row mr-auto ">
          <Form {...form}>
            <form className=" w-full " onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid  grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-2">
                <FormField
                  control={form.control}
                  name="consumption"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <Select
                          value={form.watch("consumption")}
                          onValueChange={(value) => {
                            form.clearErrors("consumption");
                            form.setValue("consumption", value);
                          }}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Consumption" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0-0">Null</SelectItem>
                            <SelectItem value="1-10">1-10 %</SelectItem>
                            <SelectItem value="11-20">11-20%</SelectItem>
                            <SelectItem value="21-30">21-30%</SelectItem>
                            <SelectItem value="11-40">31-40%</SelectItem>
                            <SelectItem value="41-50">41-50%</SelectItem>
                            <SelectItem value="51-60">51-60%</SelectItem>
                            <SelectItem value="61-70">61-70%</SelectItem>
                            <SelectItem value="71-80">71-80%</SelectItem>
                            <SelectItem value="81-90">81-90%</SelectItem>
                            <SelectItem value="91-100">91-100%</SelectItem>
                            <SelectItem value="100-100">
                              {" "}
                              {"> 100 %"}
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  control={form.control}
                  name="start_date"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Start Date - End Date</FormLabel>
                        <FormControl>
                          <DatePickerWithRange
                            onselect={setRange}
                            selectedData={dateRange!}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              </div>
              <div className="w-full py-4  flex justify-start items-center">
                <Button type="submit" className="bg-theme">
                  Search
                  <CiSearch className="ml-2 text-white" size={16} />
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default HoursConsumptionReportFormContainer;
