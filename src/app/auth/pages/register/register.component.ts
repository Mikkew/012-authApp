import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ValidationService } from '../../services/validation.service';
import Swal from 'sweetalert2';
import { Registro } from '../../interfaces/user.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group(
    {
      username  : [ '', Validators.required ],
      nombre    : [ '', Validators.required ],
      apellido  : [ '', Validators.required ],
      email     : [ '', [ Validators.required, Validators.email ]],
      password  : [ '', [ Validators.required, Validators.minLength(6) ]],
      confirm   : [ '', Validators.required ],
    },
    { 
      validators: [
        this.validator.camposIguales('password', 'confirm'),
      ]
    }
  );

  constructor(private fb: FormBuilder,
              private validator: ValidationService,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
  }

  registro(): void {
    const { email, password, nombre, apellido, username } = this.miFormulario.value;
    const body: Registro = { email, password, name:nombre, lastName:apellido, username };

    this.authService.registro( body )
      .subscribe( ok => {
        console.log(ok);
        
        if( ok === true){
          this.router.navigateByUrl("/dashboard");
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: ok,
            confirmButtonColor: '#3085d6',
          })
        }

      });
  }

}
