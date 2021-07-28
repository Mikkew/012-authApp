import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor() { }

  camposIguales(campo1: string, campo2: string): ValidationErrors | null {
    return (formGroup: AbstractControl) => {
      const password = formGroup.get(campo1)?.value;
      const confirm = formGroup.get(campo2)?.value;

      if(password !== confirm) {
        formGroup.get(campo2)?.setErrors({ noIguales: true });
        return {
          noIguales: true
        }
      }
      
      return null;
    }
  }
}
