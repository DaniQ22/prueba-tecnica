import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { signUp } from 'src/app/model/signUp';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  
  @Output() emitterCloseFormSignup = new EventEmitter<boolean>();

  isSignUp: boolean = true;


  formSignUp!: FormGroup;
  dataSignUp!: signUp;
  

  constructor(private formBuilder: FormBuilder,
    private service: UserService) { }

  ngOnInit() {
    this.formSignUp = this.formBuilder.group({
      'username': ['', Validators.required],
      'password': ['', Validators.required],
      'email': ['', Validators.required],
      'confirmPassword': ['', Validators.required]
    })
  }

  signUpUser() {

    if (!this.formSignUp.valid) {
      Swal.fire({
        icon: 'warning',
        text: 'Datos invalidos',
        timer: 3000
      });
      return;
    }
    const password = this.formSignUp.value.password;
    const confirmPassword = this.formSignUp.value.confirmPassword;

    if (password != confirmPassword) {
      Swal.fire({
        icon: 'warning',
        text: 'Las contreñas no coinciden',

      });
      return;
    }
    this.dataSignUp = this.formSignUp.value;
    this.service.signUp(this.dataSignUp).subscribe(res => {
      Swal.fire({
        icon: 'success',
        title: 'Registro exitoso',
      })

      this.formSignUp.reset();
    }, (error) => {
      Swal.fire({
        icon: 'error',
        text: error,
      })
    });

  }

  closeSignUp() {
    this.isSignUp = false;
    this.emitterCloseFormSignup.emit(this.isSignUp);
    console.log(this.isSignUp)
  }


  


}
