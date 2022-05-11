
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


  getViewDate(){
    //this.dataService.getDate(this.dateDetailsPage.date).subscribe( (data) => {this.currentViewDate = data;})
  }

  ngOnInit()
  {

    this.fetchData();
    this.addCalendarEvents();
  }

  
  fetchData() {
    
    this.dataService.getShifts().subscribe((data) => {
      this.shifts = data;
    })
    
    
    this.dataService.getDateDetails().subscribe((data) => {
      this.dateDetails = data;
    })
    
    /*
    for (let i=0; i<this.shifts.length; i++)
    {
      if (isSameDay(this.dataService.getDate(this.dateDetails), this.currentDate))
      {
        this.currentShifts[i]=this.shifts[i];
      }
      console.log(this.viewDate);
    }
    
    this.currentDate = {
      id: 234,
      date: this.currentShifts[0].startTime,
      shifts: this.currentShifts
    }
    */

  }
  
  

  addCalendarEvents():void {
    
    console.log("date is " +this.dateDetailsPage.dateString);
    for (let i=0; i<this.dateDetailsPage.shifts.length; i++){
      this.events[i]={
        start: startOfMinute(this.dateDetailsPage.shifts[i].startMinute),
        end: endOfMinute(this.dateDetailsPage.shifts[i].endMinute),
        title: this.dateDetailsPage.shifts[i].employee.firstName,
        color: colors.red,
      }
    }
  }





activeDayIsOpen: boolean = true;








}
