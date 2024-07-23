//cards row data
export interface DashboardCardDataProps {
  keyProps: string;
  count: number;
}

//cards
export interface DashboardCardsProps {
  heading: string;
  data: DashboardCardDataProps[];
  color: string;
}

//project table container props
export interface ProjectTableContainerProps {
  project_type: string;
}
