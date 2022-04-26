import { Employee } from "./employee";

export interface Shift {
    id: number,
    startTime: Date,
    endTime: Date,
    employee: Employee
}