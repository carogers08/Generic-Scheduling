import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Employee } from 'src/model/employee';
import { Shift } from 'src/model/shift';
import { DateDetail } from 'src/model/DateDetail';
import { isThisSecond } from 'date-fns';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  baseUrl: string = 'https://scheduledatabase-a3221-default-rtdb.firebaseio.com/';
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

  getDate(date: Date) {
    let dateString: string = date.getMonth() + "/" + date.getDate() + "/" + date.getFullYear();
    console.log("Looking up date: " + dateString);

    return this.http.get<DateDetail[]>(
      this.baseUrl + 'datedetails.json?orderBy="date"&equalTo="' + dateString + '"'
    ).pipe(
      map((responseData) => {
        const dateDetailList: DateDetail[] = [];
        for (const key in responseData) dateDetailList.push(responseData[key]);
        return dateDetailList
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
