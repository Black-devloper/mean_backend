import { Component, OnInit } from '@angular/core';
import { AuthenticationService, TokenPayload } from '../authentication.service';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { HttpServiceService } from './http-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  credentials: TokenPayload = {
    _id: '',
    first_name: '',
    last_name: '',
    email: '',
    password: ''
  }
  loading = false;
  buttionText = 'Submit';

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email
  ]);

  nameFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(4)
  ]);

  constructor(private auth: AuthenticationService,public http: HttpServiceService, private router: Router) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  // register() {
  //   this.auth.register(this.credentials).subscribe(
  //     () => {
  //       this.router.navigateByUrl('/profile')
  //     },
  //     err => {
  //       console.error(err)
  //     }
  //   )
  // }

  register() {
    this.loading = true;
    this.buttionText = "Submiting...";
    const user = {
      name: this.nameFormControl.value,
      email: this.emailFormControl.value
    }
    this.http.sendEmail('http://localhost:3000/sendmail', user).subscribe(
      data => {
        let res:any = data;
        console.log(
          `👏 > 👏 > 👏 > 👏 ${user.name} is successfully register and mail has been sent and the message id is ${res.messageId}`
        );
      },
      err => {
        console.log(err);
        this.loading = false;
        this.buttionText = 'Submit';
      },() => {
        this.loading = false;
        this.buttionText = 'Submit';
      }
    );
  }
}
