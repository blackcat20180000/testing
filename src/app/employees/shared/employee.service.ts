import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database'
import { Employee} from './employee.model';
@Injectable()
export class EmployeeService {
  employeeList: AngularFireList<any>;
  selectedEmployee: Employee = new Employee();
  constructor(private firebase :AngularFireDatabase ) { }

  getData(){
    this.employeeList = this.firebase.list('employees');
    return this.employeeList;
  }

  insertEmployee(employee : Employee)
  {
    this.employeeList.push({
      name: employee.name,
      ISBN: employee.ISBN,
      Authers: employee.Authers,
      publisher : employee.publisher,
      imgurl : employee.imgurl
    });
  }

  updateEmployee(employee : Employee){
    console.log(this.employeeList);
    debugger;
    this.employeeList.update(employee.$key,
      {
        name: employee.name,
        ISBN: employee.ISBN,
        Authers: employee.Authers,
        publisher : employee.publisher,
        imgurl : employee.imgurl
      });
  }

  deleteEmployee($key : string){
    this.employeeList.remove($key);
  }
  searchitem(name)
  {
     return this.firebase.list('employees',ref=>ref.orderByChild('name').equalTo(name)); 
     
  }
  

} 
