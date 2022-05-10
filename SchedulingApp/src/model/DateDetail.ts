import { Employee } from "./employee";
import { Shift } from "./shift";

export interface DateDetail {
    id: number,
    date: Date,
    shifts: Array<Shift>
}