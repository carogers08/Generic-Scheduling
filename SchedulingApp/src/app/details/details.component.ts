import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DateDetail } from 'src/model/DateDetail';
import { Employee } from 'src/model/employee';
import { Shift } from 'src/model/shift';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  @Input() details: DateDetail;

  showForm: boolean = false

  constructor() { }

  ngOnInit(): void {
    console.log(this.details.dateString)
  }

  showShiftForm() {
    this.showForm = !this.showForm
  }
  
}
