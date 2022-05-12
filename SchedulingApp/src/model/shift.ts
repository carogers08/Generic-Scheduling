import { Employee } from "./employee";

export interface Shift { //under the assumption of no overnight shifts
    id: number,
    employee: Employee,
    
    //start and end time uses the 24 hour clock
    date: Date,
    startHour: number,
    startMinute: number,
    endHour: number,
    endMinute: number
}