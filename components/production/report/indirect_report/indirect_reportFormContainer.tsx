"use client";
import { IndirectReportSchema } from "@/schemas/reportindex";
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
import { DatePickerWithRange } from "@/components/common/dateRangePicker";
import { DateRange } from "react-day-picker";
import { useEffect, useState } from "react";
import { format, parse } from "date-fns";
import { Button } from "@/components/ui/button";
import { FaUser } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";

interface IndirectReportFormContainerProps {
  defaultValue: {
    from_date: Date;
    to_date: Date;
  };
  changeFilterValue: Function;
}

const IndirectReportFormContainer = ({
  defaultValue,
  changeFilterValue,
}: IndirectReportFormContainerProps) => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [disabledDates, setDisbleDates] = useState<Date[]>([]);
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");
  const [disable, setDisable] = useState<boolean>(true);
  const form = useForm<z.infer<typeof IndirectReportSchema>>({
    resolver: zodResolver(IndirectReportSchema),
    defaultValues: {
      start_date: "",
      end_date: "",
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

  const onSubmit = (value: z.infer<typeof IndirectReportSchema>) => {
    const startDate = parse(value.start_date!, "dd-MM-yyyy", new Date());
    const endDate = parse(value.end_date!, "dd-MM-yyyy", new Date());

    const formattedStartDate = format(startDate, "yyyy-MM-dd");
    const formattedEndDate = format(endDate, "yyyy-MM-dd");

    changeFilterValue({
      formattedStartDate,
      formattedEndDate,
    });
  };

  useEffect(() => {
    if (defaultValue.from_date && defaultValue.to_date) {
      form.setValue("start_date", format(defaultValue.from_date, "dd-MM-yyyy"));
      form.setValue("end_date", format(defaultValue.to_date, "dd-MM-yyyy"));
      setDateRange({
        from: new Date(defaultValue.from_date),
        to: new Date(defaultValue.from_date),
      });
      setDisable(false);
    }
  }, []);

  return (
    <div className="w-full h-auto bg-white  shadow-sm ring-1 ring-theme rounded-sm">
      <div className="w-[100%] ml-auto mr-auto  flex justify-center items-center   p-4 ">
        <div className="w-[100%]  flex flex-col justify-center items-center lg:justify-start lg:items-start  lg:flex-row mr-auto ">
          <Form {...form}>
            <form className=" w-full " onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid  grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-2">
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
                            fromDate={fromDate}
                            toDate={toDate}
                            disabled={disabledDates}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              </div>
              <div className="w-full py-4  flex justify-start items-center">
                <Button type="submit" className="bg-theme" disabled={disable}>
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

export default IndirectReportFormContainer;
