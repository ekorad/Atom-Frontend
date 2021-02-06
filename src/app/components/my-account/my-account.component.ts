import { FormBuilder, Validators, NgForm } from '@angular/forms';
import { User } from './../../models/user';
import { UserService } from './../../services/user.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {

  @ViewChild('addrForm', { static: false }) addrMatForm!: NgForm;
  currentUser!: User;
  loading = false;
  addressForm = this.fb.group({
    address: ['', { validators: Validators.required }]
  });

  constructor(private userService: UserService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loading = true;
    this.userService.getCurrentUser()
      .subscribe(crt => this.currentUser = crt,
        err => console.log(err),
        () => {
          this.loading = false;
        });
  }

  onNewAddressSubmit(): void {
    if (this.addressForm.valid) {
      const control = this.addressForm.get('address');
      if (control) {
        this.currentUser.addresses.push(control.value);
        this.addrMatForm.resetForm();
      }
    }
  }

  saveProfile(): void {
    if (this.currentUser) {
      this.userService.editUser(this.currentUser.username, this.currentUser)
        .subscribe(stuff => { },
          err => console.log(err),
          () => { });
    }
  }

}
