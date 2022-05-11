import { Employee } from "./employee";
import { Shift } from "./shift";

export class DateDetail {
    constructor() {
        this.id = 0;
        this.date = new Date();
        this.shifts = [];
    }
    id: number;
    date: Date;
    shifts: Array<Shift>;
}