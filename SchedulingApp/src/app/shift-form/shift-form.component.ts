import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DataService } from '../data.service';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Shift } from 'src/model/shift';
import { Employee } from 'src/model/employee';
import { Observable } from 'rxjs';
import { Time } from '@angular/common';
import { DateDetail } from 'src/model/DateDetail';


@Component({
  selector: 'app-shift-form',
  templateUrl: './shift-form.component.html',
  styleUrls: ['./shift-form.component.css']
})
export class ShiftFormComponent implements OnInit {

  @Output() saved = new EventEmitter<boolean>()
  @Input() shift!: Shift
  @Input() dateDetailsPage: DateDetail;
  
  isUpdate = false
  employees: Employee[] = []
  @Input() viewDate1: Date = new Date;
  constructor(
    private readonly service: DataService,
    private readonly formBuilder: FormBuilder
    ) { 
  }

  formGroup: FormGroup = this.formBuilder.group({
    id: [null, Validators.required],
    startTime: [null, Validators.required],
    endTime: [null, Validators.required],
    employee: [null, Validators.required],
  })

  ngOnInit(): void {
    if (this.shift) {
      this.updateFormData()
      this.isUpdate = true
    }
    this.service.getEmployees().subscribe((data) => {
      this.employees = data
    })
  }

  updateFormData() {
     const {
       id,
       startHour,
       endHour,
       startMinute,
       endMinute,
       employee
     } = this.shift

     let startTime: Time = {hours: startHour, minutes: startMinute}
     let endTime: Time = {hours: endHour, minutes: startMinute}

     this.formGroup.patchValue({
       id,
       startTime,
       endTime,
       employee
     })
  }

  save() {
    const {
      id,
      startHour,
      endHour,
      startMinute,
      endMinute,
      employee
    } = this.formGroup.value
    const formData = this.formGroup.value
    if (this.isUpdate) {
      formData.startHour = Number(formData.startTime.toString().split(':')[0])
      formData.startMinute = Number(formData.startTime.toString().split(':')[1])
      formData.endHour = Number(formData.endTime.toString().split(':')[0])
      formData.endMinute = Number(formData.endTime.toString().split(':')[1])
      formData.date = this.viewDate1;
      if (formData.endHour > formData.startHour) {
        this.service.updateShift(formData).subscribe()
        this.formGroup.reset()
      }
    } else {
      formData.date = this.viewDate1;
      formData.startHour = Number(formData.startTime.toString().split(':')[0])
      formData.startMinute = Number(formData.startTime.toString().split(':')[1])
      formData.endHour = Number(formData.endTime.toString().split(':')[0])
      formData.endMinute = Number(formData.endTime.toString().split(':')[1])
      if (formData.endHour > formData.startHour) {
        this.service.addShift(formData).subscribe()
        this.formGroup.reset()
      }
    }
  }
  
  reset() {
    this.formGroup.reset()
  }
}
