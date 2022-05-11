import { Employee } from "./employee";
import { Shift } from "./shift";

export class DateDetail {
    constructor() {
        this.id = 0;
        this.date = new Date();
        this.dateString = this.date.getUTCMonth() + "/" + this.date.getUTCDate() + "/" + this.date.getUTCFullYear();
        this.shifts = [];
    }

    id: number;
    date: Date;
    dateString: String; //This is because dates and databases are obnoxious to work with
    shifts: Array<Shift>;

    setDateString() {
        this.dateString = this.date.getUTCMonth() + "/" + this.date.getUTCDate() + "/" + this.date.getUTCFullYear();
    }
}