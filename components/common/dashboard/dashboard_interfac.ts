//cards row data
export interface DashboardCardDataProps {
  keyProps: string;
  count: number;
  queryType: string;
}

//cards
export interface DashboardCardsProps {
  hasShowEye: boolean;
  heading: string;
  data: DashboardCardDataProps[];
  barColor: string;
  value: number;
  total: string;
  emptyColor: string;
}

//project table container props
export interface ProjectTableContainerProps {
  project_type: string;
}
