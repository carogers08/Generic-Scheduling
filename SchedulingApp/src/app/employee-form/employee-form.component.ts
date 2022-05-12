import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employee } from 'src/model/employee';
import { DataService } from '../data.service';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {

  @Output() saved = new EventEmitter<boolean>()
  @Input() employee!: Employee

  isUpdate = false

  constructor(
    private readonly service: DataService,
    private readonly formBuilder: FormBuilder
    ) { 
  }

  formGroup: FormGroup = this.formBuilder.group({
    employeeID: [null, Validators.required],
    firstName: [null, Validators.required],
    lastName: [null, Validators.required],
    position: [null, Validators.required],
    wage: [null, Validators.required],
    badge: [null, Validators.required],
  })

  ngOnInit(): void {
    if (this.employee) {
      this.updateFormData()
      this.isUpdate = true
    }
  }

  updateFormData() {
    const {
      employeeID,
      firstName,
      lastName,
      position,
      wage,
      badge,
    } = this.employee

    this.formGroup.patchValue({
      employeeID,
      firstName,
      lastName,
      position,
      wage,
      badge,
    })
  }

  save() {
    const {
      employeeID,
      firstName,
      lastName,
      position,
      wage,
      badge,
    } = this.formGroup.value
    const formData = this.formGroup.value
    if (this.isUpdate) {
      this.service.updateEmployee(formData).subscribe()
      this.saved.emit(true)
      this.formGroup.reset()
    } else {
      this.service.addEmployee(formData).subscribe()
      this.saved.emit(true)
      this.formGroup.reset()
    }
  }

  reset() {
    this.formGroup.reset()
  }
}
