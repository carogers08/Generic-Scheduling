import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  Input, Output, EventEmitter
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
  @Output() showDetails = new EventEmitter<DateDetail>()

  view: CalendarView = CalendarView.Month;
  viewDate : Date = new Date();
  CalendarView = CalendarView;
  currentDate: DateDetail;
  activeDayIsOpen: boolean = false;
  showForm: boolean = false;

  constructor(private dbService: DataService) {}

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    this.dbService.getDate(date).subscribe(
      (data: DateDetail[] | undefined | null) => {
        if (data == null || data.length == 0) {
          this.currentDate = new DateDetail();
          this.currentDate.date = date;
          this.currentDate.setDateString();
        } else {
          this.currentDate = data[0];
          this.currentDate.date = date;
        }
        this.showDetails.emit(this.currentDate);
      });
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  showEmployeeForm() {
    this.showForm = !this.showForm
  }
}
