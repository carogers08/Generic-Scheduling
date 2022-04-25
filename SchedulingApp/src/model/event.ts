import { Employee } from "./employee";

export interface Event {
    id: number,
    startTime: Date,
    endTime: Date,
    employee: Employee
}