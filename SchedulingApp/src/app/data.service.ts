import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Employee } from 'src/model/employee';
import { Shift } from 'src/model/shift';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  employeePath = 'https://scheduledatabase-a3221-default-rtdb.firebaseio.com/' + 'employee.json'
  shiftPath = 'https://scheduledatabase-a3221-default-rtdb.firebaseio.com/' + 'shift.json'

  constructor(private http: HttpClient) { }

  addEmployee(newEmp: Employee) {
    return this.http.post(
      this.employeePath,
      newEmp
    );
  }

  addShift(newShift: Shift) {
    return this.http.post(
      this.shiftPath,
      newShift
    );
  }

  getEmployees() {
    return this.http
      .get<Employee[]>(
        this.employeePath
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
        this.shiftPath
      )
      .pipe(
        map((responseData) => {
          const shiftList: Shift[] = [];
          for (const key in responseData) shiftList.push(responseData[key]);
          return shiftList;
        })
      );
  }

  updateEmployee(updated: Employee) {
    return this.http.put(
      this.employeePath,
      updated
    );
  }

  updateShift(updated: Shift) {
    return this.http.put(
      this.shiftPath,
      updated
    );
  }
}
