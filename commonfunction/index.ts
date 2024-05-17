import { getAllProject } from "@/data/projects";

export async function fetchProjectId() {
  const data = await getAllProject();
  const parsedData = JSON.parse(data.data) as any[];
  return parsedData;
}
