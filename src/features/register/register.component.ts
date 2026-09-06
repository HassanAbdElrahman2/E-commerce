import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
private readonly fb=inject(FormBuilder);
private readonly authService=inject(AuthService);
private readonly router=inject(Router);
registerForm: FormGroup = this.fb.group({
  name: [
    '',
    [
      Validators.required,
      Validators.minLength(3)
    ]
  ],

  email: [
    '',
    [
      Validators.required,
      Validators.email
    ]
  ],

  password: [
    '',
    [
      Validators.required,
      Validators.pattern(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
      )
    ]
  ],

  rePassword: [
    '',
    [
      Validators.required,
      Validators.pattern(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
      )
    ]
  ],

  phone: [
    '',
    [
      Validators.required,
      Validators.pattern(/^01[0125][0-9]{8}$/)
    ]
  ]
},{validators:[this.confirmPassword]});

submitForm():void{
  if(this.registerForm.valid){
  this.authService.signUp(this.registerForm?.value).subscribe({
    next:(res)=>{
      if(res.message==='success'){
        this.router.navigate(['/login'])
      }

    }
  })
}else
  {
this.registerForm.markAllAsTouched()
}
}
confirmPassword(group:AbstractControl){
const password=group.get('password')?.value;
const rePassword=group.get('rePassword')?.value;
if(password!==rePassword&&rePassword!==""){
  group.get('rePassword')?.setErrors({mismatch:true})
  return {mismatch:true};
}
return null;
}
}
