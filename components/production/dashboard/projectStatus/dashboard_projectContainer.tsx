import { ProjectTableContainerProps } from "@/components/common/dashboard/dashboard_interfac";
import { getAllProjectByStatus } from "@/data/projects";
import { ProjectData } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const DashboardProjectContainer = ({
  project_type,
}: ProjectTableContainerProps) => {
  const {
    data: allProject,
    isLoading: allProjectLoading,
    isError: allProjectError,
  } = useQuery({
    queryKey: ["dashboardAllProject"],
    queryFn: async () => {
      const data = await getAllProjectByStatus(project_type);
      return JSON.parse(data.data) as ProjectData[];
    },
    refetchInterval: 5000, //refetch every five seconds
  });
};
