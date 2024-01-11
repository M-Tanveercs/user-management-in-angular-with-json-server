import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CommanService } from '../comman.service';
import Swal from 'sweetalert2';
declare var $: any;
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  userForm: any;
  users: any;

  operationType: string = 'add';
  constructor(public fb: FormBuilder, private service: CommanService) {
    this.userForm = this.fb.group({
      id: [''],
      name: [''],
      email: [''],
      mobile: [''],
      age: [''],
    });
  }
  buttnType='Add'
  // Retrieve saved form data from local storage

  ngOnInit(): void {
    
    this.getAllUser();
  }

  // Submit Form for Add + Update

  submitForm() {
    debugger;
    var type='add'
    console.log('Form value:', this.userForm.value);
 type =
   this.userForm.value.id === null || this.userForm.value.id === ""
     ? 'add'
     : 'update';


    console.log(type);

    this.service.AddUpdateUser(this.userForm.value, type).subscribe((data) => {
      debugger;
      if (type == 'add') {
     Swal.fire({
       position: 'top',
       icon: 'success',
       title: 'User ('+this.userForm.value.name+') Saved Successfully',
       showConfirmButton: false,
       timer: 1500,
     });

        } else {
      Swal.fire({
        position: 'top',
        icon: 'success',
        title: 'User (' + this.userForm.value.name + ') Updated Successfully',
        showConfirmButton: false,
        timer: 1500,
      });
       
      }
    this.buttnType = 'add';
      console.log(data);
      this.userForm.reset();
      this.getAllUser();
    });
  }
  reset() {
    this.userForm.name = [''];
    this.userForm.mobile = [''];
    this.userForm.age = [''];
    this.userForm.email = [''];
  }
  getAllUser() {
    this.service.getAllUser().subscribe((data) => {
      console.log(data);

      this.users = data;
      
    });
  }
deleteConfirmation(ID:any){
  Swal.fire({
    icon:'warning',
    title: 'Do you want to delete this user Data?',
   
    showCancelButton: true,
    confirmButtonText: 'Yes',
  
  }).then((result) => {

    if (result.isConfirmed) {
      this.deleteUserById(ID)
   
    } else if (result.isDenied) {
      Swal.fire('Changes are not saved', '', 'info');
    }
  });
}

  deleteUserById(ID: any) {
    this.service.deleteUserById(ID).subscribe((data) => {
       Swal.fire('Deleted!', '', 'success');
      this.getAllUser();
    });
  }
  getUserById(ID: any) {
    this.service.getUserById(ID).subscribe((data) => {
      debugger;
 this.buttnType = 'update';
      console.log('userdetails', data);

      $('#addUser').addClass('show');
      $('#addUser').addClass('active');

      $('#userList').removeClass('show');
      $('#userList').removeClass('active');
      debugger;
      this.userForm.patchValue({
        id: data.id || '',
        name: data.name,
        email: data.email,
        mobile: data.mobile,
        age: data.age,
      });
    });
  }
}
