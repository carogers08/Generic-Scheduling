import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  Input,
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
} from 'date-fns';
import { Subject } from 'rxjs';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import { DataService } from '../data.service';
import { DateDetail } from 'src/model/DateDetail';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {
  view: CalendarView = CalendarView.Month;
  viewDate : Date = new Date();
  CalendarView = CalendarView;
  currentDate: DateDetail;
  activeDayIsOpen: boolean = false;

  constructor(private dbService: DataService) {}

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    // this.dbService.getDateDetails(date).subscribe(
    //   (data: DateDetail | null) => {
    //     if (data != null) {
    //       this.currentDate = data;
    //     console.log(data); //calebx - this is just so we can be sure it is working
    //     } else {
    //       this.currentDate = new DateDetail();
    //     }
    //   });

    //calebx - we have the currentDate object populated so that you can send it in as and Input() to your
    //date detail page. you could probably use an NgIf or something. 
  }

  handleEvent(action: string, event: CalendarEvent): void {
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
}
