export const AllProjectController = [
  "id",
  "project_id",
  "description",
  "status",
  "start_date",
  "end_date",
  "customer_name",
  "production_remark",
  "planner_remark",
  "estimateHour",
  "actualHour",
  "attachment",
  "preparedQuantity",
  "requiredQuantity",
  "released_work_order",
  "unreleased_work_order",
];

export const ReleasedProjectController = [
  "id",
  "project_id",
  "description",
  "status",
  "start_date",
  "end_date",
  "customer_name",
  "production_remark",
  "planner_remark",
  "estimateHour",
  "actualHour",
  "preparedQuantity",
  "requiredQuantity",
  "released_work_order",
  "unreleased_work_order",
  "offline_count",
  "online_count",
  "offline_workorder_description",
  "online_workorder_description",
];

export const unReleasedProjectController = [
  "id",
  "project_id",
  "description",
  "status",
  "start_date",
  "end_date",
  "customer_name",
  "production_remark",
  "planner_remark",
  "estimateHour",
  "actualHour",
  "preparedQuantity",
  "requiredQuantity",
];

export const DashboardWorkersController = [
  "employee_id",
  "name",
  "designation_id",
];

export const DashboardShiftController = [
  "employee_id",
  "name",
  "designation_id",
  "forman_name",
];
