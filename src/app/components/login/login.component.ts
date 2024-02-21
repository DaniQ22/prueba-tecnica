import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin!: FormGroup;
  dataLogin!: any;

  isLoginOrSignup: boolean = false;
  isrecoverPassword: boolean = false;

  constructor(private service: LoginService,
    private formBulider: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.formLogin = this.formBulider.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  signup() {
    this.isLoginOrSignup = !this.isLoginOrSignup;

  }

  receibeEmit(event: boolean) {
    this.isLoginOrSignup = event;
  }


  login() {
    console.log(this.formLogin.value);
    if (this.formLogin.valid) {
      this.dataLogin = this.formLogin.value;
      this.service.login(this.dataLogin).subscribe(res => {
        if (res) {

        }
        Swal.fire({
          icon: 'success',
          title: '¡Inicio de sesión exitoso!',
          text: 'Bienvenido de vuelta',
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigate(['/panel']);
      }, error => {
        Swal.fire({
          icon: 'error',
          title: 'Datos invalidos',
          text: error,
          showConfirmButton: false,
          timer: 3000
        });
      })
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Datos invalidos',
        text: 'Por favor no llene todos los campos',
        showConfirmButton: false,
        timer: 3000
      })
    }

  }
}
