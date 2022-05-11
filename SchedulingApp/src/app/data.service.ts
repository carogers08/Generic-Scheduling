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
  Employees: Employee[]=[];
  Shifts: Shift[]=[];

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

  constructor(private http: HttpClient) { }
}
