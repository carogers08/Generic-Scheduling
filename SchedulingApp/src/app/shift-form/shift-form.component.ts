import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DataService } from '../data.service';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Shift } from 'src/model/shift';
import { Employee } from 'src/model/employee';
import { Observable } from 'rxjs';
import { Time } from '@angular/common';


@Component({
  selector: 'app-shift-form',
  templateUrl: './shift-form.component.html',
  styleUrls: ['./shift-form.component.css']
})
export class ShiftFormComponent implements OnInit {

  @Output() saved = new EventEmitter<boolean>()
  @Input() shift!: Shift
  @Input() date!: Date

  isUpdate = false
  employees: Employee[] = []

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
      startTime,
      endTime,
      employee
    } = this.shift

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
      startTime,
      endTime,
      employee
    } = this.formGroup.value
    const formData = this.formGroup.value
    if (this.isUpdate) {
      let time: Time = {hours: 0, minutes: 0}
      time.hours = Number(formData.startTime.toString().split(':')[0])
      time.minutes = Number(formData.startTime.toString().split(':')[1])
      this.date.setHours(time.hours)
      this.date.setMinutes(time.minutes)
      formData.startTime = this.date
      time.hours = Number(formData.endTime.toString().split(':')[0])
      time.minutes = Number(formData.endTime.toString().split(':')[1])
      this.date.setHours(time.hours)
      this.date.setMinutes(time.minutes)
      formData.endTime = this.date
      this.service.updateShift(formData).subscribe()
    } else {
      let time: Time = {hours: 0, minutes: 0}
      time.hours = Number(formData.startTime.toString().split(':')[0])
      time.minutes = Number(formData.startTime.toString().split(':')[1])
      this.date.setHours(time.hours)
      this.date.setMinutes(time.minutes)
      formData.startTime = this.date
      time.hours = Number(formData.endTime.toString().split(':')[0])
      time.minutes = Number(formData.endTime.toString().split(':')[1])
      this.date.setHours(time.hours)
      this.date.setMinutes(time.minutes)
      formData.endTime = this.date
      if (formData.endTime > formData.startTime) {
        this.service.addShift(formData).subscribe()
      }
    }
  }

  reset() {
    this.updateFormData()
  }
}
