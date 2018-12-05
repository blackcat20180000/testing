import { Component, OnInit } from '@angular/core';

import { EmployeeService } from '../shared/employee.service';
import { Employee } from '../shared/employee.model';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employeeList: Employee[];
  tempList:Employee[];
  constructor(private employeeService: EmployeeService, private tostr: ToastrService) { }

  ngOnInit() {
    var x = this.employeeService.getData();
    x.snapshotChanges().subscribe(item => {
      this.employeeList = [];
      this.tempList=[];
      item.forEach(element => {
        var y = element.payload.toJSON();
        y["$key"] = element.key;
        this.employeeList.push(y as Employee);
        this.tempList.push(y as Employee);
      });
    });
  }

  onEdit(emp: Employee) {
    this.employeeService.selectedEmployee = Object.assign({}, emp);
  }
  onkey(str: string)
  {
    var len=this.employeeList.length;
    var newarr=[];
    if(str=="")
    {
      this.employeeList=[];
      this.employeeList=this.tempList;

    }
    else
    { 
      for(var z=0;z<len;z++)
      {
         var m=this.employeeList[z].name.includes(str);
         if(m==true)
         {
            var k=newarr.length;
            newarr[k]=this.employeeList[z];
  
         }
        
      }
      this.employeeList=[];
      this.employeeList=newarr;
  

    }
    
    
  }

  onDelete(key: string) {
     console.log(key);
     debugger;
    if (confirm('Are you sure to delete this book ?') == true) {
      this.employeeService.deleteEmployee(key);
      this.tostr.warning("Deleted Successfully", "book delete");
    }
  }

}
