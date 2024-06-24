import { getAllProject } from "@/data/projects";
import { getAllResourceWorkOrder } from "@/data/resource-work-order";
import { getAllUser } from "@/data/user";
import { getAllWorkOrder } from "@/data/work-order";

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
  const [hours, minutes] = time.split(":").map(Number);
  const totalMinutes = hours * 60 + minutes;
  return totalMinutes;
};

export const formatTime = (totalMinutes: number) => {
  const hours = Math.floor(Math.abs(totalMinutes) / 60)
    .toString()
    .padStart(2, "0");
  const minutes = Math.abs(totalMinutes % 60)
    .toString()
    .padStart(2, "0");
  return `${hours}:${minutes}`;
};

export const calculateBalanceHours = (estimated: number, actual: number) => {
  const balanceMinutes = estimated - actual;
  const formattedTime = formatTime(balanceMinutes);
  let color;
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

export const formatHours = (hours: string) => {
  const [hour, minutes] = hours.split(":");
  const formatHours = hour.padStart(2, "0");
  const formatMinutes = minutes.padStart(2, "0");
  return `${formatHours}:${formatMinutes}`;
};
