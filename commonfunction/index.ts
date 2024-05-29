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
