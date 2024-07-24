//cards row data
export interface DashboardCardDataProps {
  keyProps: string;
  count: number;
  onClickFunction: () => void;
}

//cards
export interface DashboardCardsProps {
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
