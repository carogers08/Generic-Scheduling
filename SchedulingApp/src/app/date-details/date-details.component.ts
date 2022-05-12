
import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  Input,
  OnInit,
  EventEmitter,
  Output
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
import { DatePipe } from '@angular/common';
import { DateDetail } from 'src/model/DateDetail';

const colors: any = {
  red: {
    primary: '#014617',
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
  constructor(private dataService: DataService,
    private datePipe: DatePipe) { }
  @Output() showDetails = new EventEmitter<DateDetail>()

  @Input() dateDetailsPage: DateDetail;

  @Input()   closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
    view: CalendarView = CalendarView.Day;
  
    @Input() CalendarView = CalendarView;
  
    viewDate: Date = new Date();

  currentDate: DateDetail;

  currentViewDate: Date;

  employees: Employee[] =[];
  shifts: Shift[] =[];
  dateDetails: DateDetail[] = [];
  currentShifts: Shift[] = [];
  events: CalendarEvent[]=[];

  ngOnInit()
  {
    this.viewDate = this.dateDetailsPage.date;
    this.fetchData();
  }

  fetchData() {
    this.dataService.getShifts().subscribe((data) => {
      this.events = []
      data.forEach((shift) => {
        if (this.dateIsEqual(this.viewDate, shift.date)) {
          let startDate = new Date(this.viewDate)
          startDate.setHours(shift.startHour)
          startDate.setMinutes(shift.startMinute)
          let endDate = new Date(this.viewDate)
          endDate.setHours(shift.endHour)
          endDate.setMinutes(shift.endMinute)
          
          this.events.push({
            start: startOfMinute(startDate),
            end: endOfMinute(endDate),
            title: shift.employee.firstName,
            color: colors.red,
          })
        }
      })
    })
  }

activeDayIsOpen: boolean = true;


dateIsEqual(date: Date, shiftDay: Date) {
  if (date.getFullYear() == Number(shiftDay.toString().split('-')[0]) && 
  date.getDate() == Number(shiftDay.toString().split('-')[2].split('T')[0]) &&
  date.getMonth() + 1 == Number(shiftDay.toString().split('-')[1])) {
    return true
  }
  return false
}






}
