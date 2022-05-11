import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DataService } from '../data.service';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Shift } from 'src/model/shift';


@Component({
  selector: 'app-shift-form',
  templateUrl: './shift-form.component.html',
  styleUrls: ['./shift-form.component.css']
})
export class ShiftFormComponent implements OnInit {

  @Output() saved = new EventEmitter<boolean>()
  @Input() shift!: Shift

  isUpdate = false

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
  }

  updateFormData() {
    // const {
    //   id,
    //   startTime,
    //   endTime,
    //   employee
    // } = this.shift

    // this.formGroup.patchValue({
    //   id,
    //   startTime,
    //   endTime,
    //   employee
    // })
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
      this.service.updateEmployee(formData)
      this.saved.emit(true)
    } else {
      this.service.addEmployee(formData)
      this.saved.emit(true)
    }
  }

  reset() {
    this.updateFormData()
  }
}
