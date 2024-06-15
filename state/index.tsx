import {
  UserData,
  IndirectCodeData,
  ResourceData,
  EmployeeData,
  MeasureData,
  AttendanceTypeData,
  ProjectData,
  WorkOrderData,
  ResourceWorkOdderData,
  ShiftData,
} from "@/types";
import { create } from "zustand";

var user: UserData | null = null;
export const useStore = create((set) => ({
  user: user, // Object value with initial properties
  setUser: (user: any) => set({ user }),
  removeUser: (user: any) => set({ user: null }), // Action to update user object
}));
var indirectCode: IndirectCodeData | null = null;
export const useIndirectCodeStore = create((set) => ({
  indirectCode: indirectCode, // Object value with initial properties
  setIndirect: (indirectCode: any) => set({ indirectCode }),
  removeIndirect: (usindirectCodeer: any) => set({ indirectCode: null }), // Action to update user object
}));

var resourceCode: ResourceData | null = null;
export const useResourceStore = create((set) => ({
  resourceCode: resourceCode, // Object value with initial properties
  setResource: (resourceCode: any) => set({ resourceCode }),
  removeResource: (resourceCode: any) => set({ resourceCode: null }), // Action to update user object
}));
var employee: EmployeeData | null = null;
export const useEmployeeStore = create((set) => ({
  employee: employee, // Object value with initial properties
  setEmployee: (employee: any) => set({ employee }),
  removeEmployee: (employee: any) => set({ employee: null }), // Action to update user object
}));

var measure: MeasureData | null = null;
export const useMeasureStore = create((set) => ({
  measure: measure, // Object value with initial properties
  setMeasure: (measure: any) => set({ measure }),
  removeMeasure: (empmeasureloyee: any) => set({ measure: null }), // Action to update user object
}));
var attendanceType: AttendanceTypeData | null = null;
export const useAttendanceTypeStore = create((set) => ({
  attendanceType: attendanceType, // Object value with initial properties
  setAttendanceType: (attendanceType: any) => set({ attendanceType }),
  removeAttendanceType: (attendanceType: any) => set({ attendanceType: null }), // Action to update user object
}));
var project: ProjectData | null = null;
export const useProjectStore = create((set) => ({
  project: project, // Object value with initial properties
  setProject: (project: any) => set({ project }),
  removeProject: (project: any) => set({ project: null }), // Action to update user object
}));
var workOrder: WorkOrderData | null = null;
export const useWorkOrderStore = create((set) => ({
  workOrder: workOrder, // Object value with initial properties
  setWorkOrder: (workOrder: any) => set({ workOrder }),
  removeWorkOrder: (workOrder: any) => set({ workOrder: null }), // Action to update user object
}));

var resourceWorkOrder: ResourceWorkOdderData | null = null;
export const useResourceWorkOrderStore = create((set) => ({
  resourceWorkOrder: resourceWorkOrder, // Object value with initial properties
  setResourceWorkOrder: (resourceWorkOrder: any) => {
    set({ resourceWorkOrder });
  },
  removeResourceWorkOrder: (resourceWorkOrder: any) =>
    set({ resourceWorkOrder: null }), // Action to update user object
}));
var shift: ShiftData | null = null;
export const useShiftStore = create((set) => ({
  shift: shift, // Object value with initial properties
  setShift: (shift: any) => set({ shift }),
  removeShift: (shift: any) => set({ shift: null }), // Action to update user object
}));
