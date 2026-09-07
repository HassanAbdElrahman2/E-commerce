import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { AuthService } from '../../core/auth/services/auth.service';
import { Router, RouterLinkActive, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  
  private readonly authService=inject(AuthService);
  private readonly fb=inject(FormBuilder);
    private readonly router=inject(Router);

  formLogin:FormGroup=this.fb.group({
     "email": ["",[Validators.required,Validators.email]],
     "password":["",[Validators.required,Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]]
  });
submitForm():void{
if(this.formLogin?.valid){
  this.authService.signIn(this.formLogin?.value).subscribe({
    next:(res)=>{
    if(res.message==='success'){
      localStorage.setItem("freshToken",res.token);
       localStorage.setItem("user",JSON.stringify(res.user));
      this.router.navigate(['/']);
    this.authService.isLogged.set(true);
    }
    }
  })
}else{
  this.formLogin.markAllAsTouched();
}

}
CreateAccount():void{
  this.formLogin.reset();
  this.router.navigate(['/register']);
}
}
