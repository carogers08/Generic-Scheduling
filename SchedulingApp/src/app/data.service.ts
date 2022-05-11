import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Employee } from 'src/model/employee';
import { Shift } from 'src/model/shift';
import { DateDetail } from 'src/model/DateDetail';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  Employees: Employee[]=[
  ];

  Shifts: Shift[]=[

  ];
  DateDetails: DateDetail[]=[

  ];

  

  addEmployee(newEmp: Employee) {
    return this.http.post(
      'https://scheduledatabase-a3221-default-rtdb.firebaseio.com/' + 'employee.json',
      newEmp
    );
  }

  addShift(newShift: Shift) {
    return this.http.post(
      'https://scheduledatabase-a3221-default-rtdb.firebaseio.com/' + 'shift.json',
      newShift
    );
  }

  addDateDetail(newDateDetail: DateDetail) {
    return this.http.post(
      'https://scheduledatabase-a3221-default-rtdb.firebaseio.com/' + 'datedetail.json',
      newDateDetail
    );
  }

  getEmployees() {
    return this.http
      .get<Employee[]>(
        'https://scheduledatabase-a3221-default-rtdb.firebaseio.com/' + 'employee.json'
      )
      .pipe(
        map((responseData) => {
          const employeeList: Employee[] = [];
          for (const key in responseData) employeeList.push(responseData[key]);
          return employeeList;
        })
      );
  }

  getShifts() {
    return this.http
      .get<Shift[]>(
        'https://scheduledatabase-a3221-default-rtdb.firebaseio.com/' + 'shift.json'
      )
      .pipe(
        map((responseData) => {
          const shiftList: Shift[] = [];
          for (const key in responseData) shiftList.push(responseData[key]);
          return shiftList;
        })
      );
  }

  getDateDetails() {
    return this.http
      .get<DateDetail[]>(
        'https://scheduledatabase-a3221-default-rtdb.firebaseio.com/' + 'datedetail.json'
      )
      .pipe(
        map((responseData) => {
          const dateDetailList: DateDetail[] = [];
          for (const key in responseData) dateDetailList.push(responseData[key]);
          return dateDetailList;
        })
      );
  }
  
  updateEmployee(updated: Employee) {
    return this.http.put(
      'https://scheduledatabase-a3221-default-rtdb.firebaseio.com/' + 'employee.json',
      updated
    );
  }

  updateShift(updated: Shift) {
    return this.http.put(
      'https://scheduledatabase-a3221-default-rtdb.firebaseio.com/' + 'shift.json',
      updated
    );
  }

  constructor(private http: HttpClient) { }
}
