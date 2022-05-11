
import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  Input,
  OnInit
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
  startOfMinute,
  endOfMinute,
} from 'date-fns';
import { Subject } from 'rxjs';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import { DataService } from '../data.service';
import { Employee } from 'src/model/employee';
import { Shift } from 'src/model/shift';
import { DateDetail } from 'src/model/DateDetail';





const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

@Component({
  selector: 'app-date-details',
  templateUrl: './date-details.component.html',
  styleUrls: ['./date-details.component.css']
})
export class DateDetailsComponent implements OnInit{
  constructor(private dataService: DataService) { }


 
/*
  @Input()
  Employee!: {
    employeeID: number;
    firstName: string;
    lastName: string;
    position: string;
    wage: number;
    badge: number;
  };

  @Input()
  Shift!: {
    id: number;
    startTime: Date;
    endTime: Date;
    employee: Employee;
  };

  @Input()
  DateDetail!: {
    id: number;
    date: Date;
    shifts: Array<Shift>;
  }
*/


  employees: Employee[] =[    {
    employeeID: 501,
    firstName: "John",
    lastName: "Jerald",
    position: "server",
    wage: 4.2,
    badge: 18
  },
  {
    employeeID: 502,
    firstName: "Hue",
    lastName: "Jeff",
    position: "manager",
    wage: 23.10,
    badge: 9
  },
  {
    employeeID: 503,
    firstName: "Lori",
    lastName: "Philip",
    position: "server",
    wage: 3.10,
    badge: 2
  },];
  shifts: Shift[] =[
    // {
    //   id: 567,
    //   startTime: new Date('2022, May, 10, 06:00'),
    //   endTime: new Date('2022, May, 10, 21:30'),
    //   employee: this.employees[0]
    // }
  ];

  dateDetails: DateDetail[] = [  
    // {
    // id: 1, 
    // date: new Date('2022, May, 10'),
    // shifts: this.shifts
    // }
  ];

  ngOnInit()
  {
  }

  
  fetchData() {
    this.dataService.getEmployees().subscribe((data) => {
      this.employees = data;
    })
    this.dataService.getDateDetails().subscribe((data) => {
      this.dateDetails = data;
    })
    this.dataService.getDateDetails().subscribe((data) => {
      this.dateDetails = data;
    })
  }

  addEmployeeShiftData() {
    this.dataService.addEmployee(this.employees[0]).subscribe((data) => {
      console.log(data)
      this.fetchData();
    });
    this.dataService.addShift(this.shifts[0]).subscribe((data) => {
      console.log(data)
      this.fetchData();
    });
    this.dataService.addDateDetail(this.dateDetails[0]).subscribe((data) => {
      console.log(data)
      this.fetchData();
    });
  }



activeDayIsOpen: boolean = true;
@Input()   dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
  if (isSameMonth(date, this.viewDate)) {
    if (
      (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
      events.length === 0
    ) {
      this.activeDayIsOpen = false;
    } else {
      this.activeDayIsOpen = true;
    }
    this.viewDate = date;
  }
}

@Input()   closeOpenMonthViewDay() {
  this.activeDayIsOpen = false;
}
  view: CalendarView = CalendarView.Day;

  @Input() CalendarView = CalendarView;

  viewDate: Date = new Date();

  events: CalendarEvent[] = [  
    // {
    //   start: startOfMinute(this.dateDetails[0].shifts[0].startTime),
    //   end: endOfMinute(this.dateDetails[0].shifts[0].endTime),
    //   title: this.dateDetails[0].shifts[0].employee.firstName,
    //   color: colors.red,
      
    // }, 
  ];

}
