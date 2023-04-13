import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {


  constructor(
    private builder: FormBuilder,
    private toastr: ToastrService,
    private service: AuthService,
    private router: Router
  ) {

  }

  registrationform = this.builder.group({
    id: this.builder.control('', Validators.compose([Validators.required, Validators.minLength(5)])),
    name: this.builder.control('', Validators.compose([Validators.required, Validators.minLength(4)])),
    email: this.builder.control('', Validators.compose([Validators.required, Validators.email])),
    password: this.builder.control('', Validators.required),
    gender: this.builder.control('male'),
    role: this.builder.control(''),
    isActive: this.builder.control(false)
  });

  proceedRegistration() {
    if (this.registrationform.valid) {
      this.service.register(this.registrationform.value as User)
        .subscribe(res => {
          this.toastr.success('Pleas contact admin for enable access', 'Registration successfully');
          this.router.navigate(['login']);
        })
    } else {
      this.toastr.warning('Please enter valid data');
    }
  }


}
