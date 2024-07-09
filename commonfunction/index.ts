import { getAllProject } from "@/data/projects";
import { getAllResourceWorkOrder } from "@/data/resource-work-order";
import { getAllUser } from "@/data/user";
import { getAllWorkOrder } from "@/data/work-order";
import { useQueryClient } from "@tanstack/react-query";

export async function fetchProjectId() {
  const data = await getAllProject();
  const parsedData = JSON.parse(data.data) as any[];
  return parsedData;
}

export async function fetchWorkOrderId(project_id: string) {
  const data = await getAllWorkOrder();
  const parsedData = JSON.parse(data.data) as any[];
  const filteredData = parsedData
    .filter((data) => data.project_id === project_id)
    .map((data) => data.work_order_id);
  return filteredData;
}

export async function fetchReourceId(
  project_id: string,
  work_order_id: string
) {
  const data = await getAllResourceWorkOrder();
  const parsedData = JSON.parse(data.data) as any[];
  const filteredData = parsedData
    .filter(
      (data) =>
        data.project_id === project_id && data.work_order_id === work_order_id
    )
    .map((data) => data.resourceId);
  return filteredData;
}

export async function fetchFormanList() {
  const data = await getAllUser();
  const parsedData = JSON.parse(data.data) as any[];
  const filteredData = parsedData
    .filter(
      (data) => data.role_name && data.role_name.toLowerCase() === "foreman"
    )
    .map((data) => ({ id: data.id.toString(), name: data.name }));
  return filteredData;
}

export const calculateMinutes = (time: string) => {
  if (time === "" || time === undefined || time.length === 0) return 0;
  const [hours, minutes] = time.split(":").map(Number);
  const totalMinutes = hours * 60 + minutes;
  return totalMinutes;
};

export const formatTime = (totalMinutes?: number) => {
  if (totalMinutes === undefined) return `00:00`;
  const hours = Math.floor(Math.abs(totalMinutes) / 60)
    .toString()
    .padStart(2, "0");
  const minutes = Math.abs(totalMinutes % 60)
    .toString()
    .padStart(2, "0");
  return `${hours}:${minutes}`;
};

export const calculateBalanceHours = (estimated?: number, actual?: number) => {
  if (estimated === undefined) return { hours: "00:00", color: "red" };
  let color;
  if (actual === undefined) {
    if (estimated > 0) {
      color = "none";
    } else {
      color: "red";
    }
    return { hours: formatTime(estimated), color: "red" };
  }
  const balanceMinutes = estimated - actual;
  const formattedTime = formatTime(balanceMinutes);
  if (balanceMinutes < 0) {
    color = "red";
  } else if (balanceMinutes === 0) {
    color = "red";
  } else {
    color = "none";
  }

  const result = balanceMinutes < 0 ? `-${formattedTime}` : formattedTime;

  return { hours: result, color };
};

export const formatHours = (hours?: string) => {
  if (hours === "" || hours === undefined || hours.length === 0) return `00:00`;
  const [hour, minutes] = hours.split(":");
  const formatHours = hour.padStart(2, "0");
  const formatMinutes = minutes.padStart(2, "0");
  return `${formatHours}:${formatMinutes}`;
};

/*
refetch the project details
 */
export const RefetchProject = (queryClient: any) => {
  [
    "all-projects",
    "projects",
    "projects-list",
    "released-projects",
    "unreleased-projects",
    "closed-projects",
    "cancelled-projects",
  ].map((data: string) => {
    queryClient.invalidateQueries({
      queryKey: [data],
    });
  });
};

export const RefetchWorkOrder = (queryClient: any) => {
  [
    "work-orders",
    "work-orders-list",
    "released-work-orders",
    "unreleased-work-orders",
    "closed-work-orders",
    "cancelled-work-orders",
  ].forEach((data: string) => {
    queryClient.invalidateQueries({
      queryKey: [data],
    });
  });
};

export const RefetchWorkOrderResources = (queryClient: any) => {
  [
    "resource-work-orders",
    "resource",
    "released-resource-work-orders",
    "unreleased-resource-work-orders",
    "closed-resource-work-orders",
    "cancelled-resource-work-orders",
  ].map((data: string) => {
    queryClient.invalidateQueries({
      queryKey: [data],
    });
  });
};

// Online Javascript Editor for free
// Write, Edit and Run your Javascript code using JS Online Compiler

const convertHoursToMinutesForDayShift = (times: string) => {
  const [hours, minutes] = times.split(":").map(Number);
  return hours * 60 + minutes;
};

const convertMinutesToHours = (times: number) => {
  const hours = Math.floor(times / 60);
  const minutes = times % 60;
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;
};

const convertHoursToMinutesForNightShift = (times: string) => {
  const [hours, minutes] = times.split(":").map(Number);
  if (hours >= 0 && hours <= 11) {
    const oneDayMinutes = 24 * 60;
    return oneDayMinutes + hours * 60 + minutes;
  }
  return hours * 60 + minutes;
};

// const punchInTime = "20:00";
// const punchOutTime = "02:30";
// const breakDuration = '[{"startTime":"23:10","endTime":"23:40","name":"BREAKFAST","status":"Active","shiftName":"SHIFT-1","shiftId":"25"},{"startTime":"23:59","endTime":"00:10","name":"LUNCH","status":"Active","shiftName":"SHIFT-1","shiftId":"25"},{"startTime":"02:50","endTime":"02:55","name":"LUNCH","status":"Active","shiftName":"SHIFT-1","shiftId":"25"},{"startTime":"02:20","endTime":"02:40","name":"LUNCH","status":"Active","shiftName":"SHIFT-1","shiftId":"25"}]';
// const shiftType = "Night";
// const punchInTime = "06:00";
// const punchOutTime = "10:41";
// const breakDuration = '[{"startTime":"08:20","endTime":"08:40","name":"BREAKFAST","status":"Active","shiftName":"SHIFT-1","shiftId":"25"},{"startTime":"10:30","endTime":"10:50","name":"LUNCH","status":"Active","shiftName":"SHIFT-1","shiftId":"25"},{"startTime":"11:50","endTime":"11:55","name":"LUNCH","status":"Active","shiftName":"SHIFT-1","shiftId":"25"}]';
// const shiftType = "Day";
// const parsedBreakDuration = JSON.parse(breakDuration);
interface calculateWorkAndBreakHourProps {
  punchInTime: string;
  punchOutTime: string;
  shiftType: string;
  breakType: any;
}

export const calculateWorkAndBreakHour = ({
  punchInTime,
  punchOutTime,
  shiftType,
  breakType,
}: calculateWorkAndBreakHourProps) => {
  // console.log(punchInTime, punchOutTime, shiftType, breakType);
  let workHours = "";
  let effectiveWorkHoursMinutes = 0;
  let breakHoursMinutes = 0;

  const parsedBreakDuration = JSON.parse(breakType);
  // console.log(JSON.parse(breakType));

  const calculateBreakAndEffectiveWorkhour = (
    punchInMinutes: number,
    punchOutMinutes: number,
    totalMinutes: number,
    type: string
  ) => {
    parsedBreakDuration.forEach((data: any) => {
      const breakInHours = data.startTime;
      const breakOutHours = data.endTime;
      const breakInMinutes =
        type === "day"
          ? convertHoursToMinutesForDayShift(breakInHours)
          : convertHoursToMinutesForNightShift(breakInHours);
      const breakOutMinutes =
        type === "day"
          ? convertHoursToMinutesForDayShift(breakOutHours)
          : convertHoursToMinutesForNightShift(breakOutHours);
      let interval = 0;
      if (type === "day") {
        if (breakInMinutes < 24 * 60 && breakOutMinutes >= 24 * 60) {
          return;
        }
      }
      if (
        breakInMinutes >= punchInMinutes &&
        breakOutMinutes <= punchOutMinutes
      ) {
        interval = breakOutMinutes - breakInMinutes;
      } else if (
        breakInMinutes <= punchInMinutes &&
        breakOutMinutes >= punchOutMinutes
      ) {
        interval = punchOutMinutes - punchInMinutes;
      } else if (
        breakInMinutes >= punchInMinutes &&
        breakInMinutes <= punchOutMinutes
      ) {
        interval = punchOutMinutes - breakInMinutes;
      } else if (
        breakOutMinutes >= punchInMinutes &&
        breakOutMinutes <= punchOutMinutes
      ) {
        interval = breakOutMinutes - punchInMinutes;
      }
      effectiveWorkHoursMinutes -= interval;
      breakHoursMinutes += interval;
    });
  };

  const calculateEffectiveWorkHourFormt = (
    effectiveWorkHourMinutes: number
  ) => {
    const effectiveWorkHourFormat = ((5 / 3) * effectiveWorkHourMinutes) / 100;
    return effectiveWorkHourFormat.toFixed(2);
  };

  if (shiftType.toLowerCase().trim() === "day") {
    const punchInMinutes = convertHoursToMinutesForDayShift(punchInTime);
    const punchOutMinutes = convertHoursToMinutesForDayShift(punchOutTime);
    const totalMinutes = punchOutMinutes - punchInMinutes;
    workHours = convertMinutesToHours(totalMinutes);
    effectiveWorkHoursMinutes = totalMinutes;
    calculateBreakAndEffectiveWorkhour(
      punchInMinutes,
      punchOutMinutes,
      totalMinutes,
      "day"
    );
  } else {
    const punchInMinutes = convertHoursToMinutesForNightShift(punchInTime);
    const punchOutMinutes = convertHoursToMinutesForNightShift(punchOutTime);
    const totalMinutes = punchOutMinutes - punchInMinutes;
    workHours = convertMinutesToHours(totalMinutes);
    effectiveWorkHoursMinutes = totalMinutes;
    calculateBreakAndEffectiveWorkhour(
      punchInMinutes,
      punchOutMinutes,
      totalMinutes,
      "Night"
    );
  }
  console.log("workHours", workHours);
  console.log(
    "effectiveWorkHoursMinutes",
    convertMinutesToHours(effectiveWorkHoursMinutes)
  );
  console.log("breakHoursMinutes", convertMinutesToHours(breakHoursMinutes));

  return {
    workHours,
    effectiveWorkHours: convertMinutesToHours(effectiveWorkHoursMinutes),
    breakHours: convertMinutesToHours(breakHoursMinutes),
    effectiveWorkHourFormat: calculateEffectiveWorkHourFormt(
      effectiveWorkHoursMinutes
    ),
  };
};
