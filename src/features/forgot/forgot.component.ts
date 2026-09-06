import { Component, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot',
  imports: [ReactiveFormsModule],
  templateUrl: './forgot.component.html',
  styleUrl: './forgot.component.css',
})
export class ForgotComponent {
  step=signal<number>(1);
  email:FormControl=new FormControl("",[Validators.required,Validators.email]);
  code:FormControl=new FormControl("",[Validators.required]);
  newPassword:FormControl=new FormControl("",[Validators.required,Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]);
  private readonly authService=inject(AuthService);
  private readonly router=inject(Router);
  submitEmail(event:Event){
  event.preventDefault();
  if(this.email?.valid){
    const data={
      "email":this.email?.value
    }
   this.authService.forgotPassword(data).subscribe({
    next:(res)=>{
      if(res.statusMsg==="success"){
        this.step.set(2);
      }
    }
   })
}
  }
    submitCode(event:Event){
    event.preventDefault();
    if(this.code?.valid){
      const data={
       "resetCode":this.code?.value
    }
     this.authService.verifyResetCode(data).subscribe({
    next:(res)=>{
      if(res.status==="Success"){
        this.step.set(3);
      }
    }
   })
    
    }
  }
    submitPassword(event:Event){
    event.preventDefault();
      if(this.code?.valid){
      const data={
       "email":this.email?.value,
    "newPassword": this.newPassword?.value

    }
     this.authService.resetPassword(data).subscribe({
    next:(res)=>{
      if(res.token!==""||res.token!==null){
       localStorage.setItem("freshToken",res.token)
       this.router.navigate(["/"]);
      }
    }
   })
  }
}
}