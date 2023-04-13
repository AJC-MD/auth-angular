import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(
    private builder: FormBuilder,
    private toastr: ToastrService,
    private service: AuthService,
    private router: Router
  ) {
    // sessionStorage.clear();
  }

  userData: any;


  loginform = this.builder.group({
    username: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.required)
  });


  proceedLogin() {
    if (this.loginform.valid) {
      // this.service.register(this.loginform.value)
      //   .subscribe(res => {
      //     this.toastr.success('Pleas contact admin for enable access', 'Registration successfully');
      //     this.router.navigate(['login']);
      //   })
      this.service.getById(this.loginform.value.username)
        .subscribe(res => {
          this.userData = res;
          console.log(this.userData);
          if (this.userData.password === this.loginform.value.password) {
            if (this.userData.isActive) {
              sessionStorage.setItem('userName', this.userData.id);
              sessionStorage.setItem('userRole', this.userData.role);
              this.router.navigate(['/']);
            } else {
              this.toastr.error('User is not active');
            }
          } else {
            this.toastr.error('Wrong password');
          }
        });
    } else {
      this.toastr.warning('Please enter valid data');
    }
  }

}
