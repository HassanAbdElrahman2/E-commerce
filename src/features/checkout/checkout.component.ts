import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-checkout',
  imports: [RouterLink,ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit {
  private readonly activatedRoute=inject(ActivatedRoute);
  private readonly fb=inject(FormBuilder);
  private readonly cartService=inject(CartService);
  private readonly router=inject(Router);

  paymentType=signal<string>('cash');

  checkoutForm:FormGroup=this.fb.group({
    shippingAddress: this.fb.group({
      details:['',Validators.required],
      phone:['',Validators.required],
      city:['',Validators.required]
  })
})
  cartId=signal<string>('');
  ngOnInit(): void {
this.getCartId();

  }
  getCartId():void{
       this.activatedRoute.paramMap.subscribe((prams)=>{
   this.cartId.set( prams.get('id')!);
   })
  }
  submitForm():void{
    if(this.checkoutForm?.valid){
      if(this.paymentType()==='cash'){
        this.cartService.createCashOrder(this.cartId(),this.checkoutForm?.value).subscribe({
          next:(res)=>{
            if(res.status==='success'){
                this.router.navigate(['/allorders']);
            }
          }
        });
        
      }else{
         this.cartService.createVisaOrder(this.cartId(),this.checkoutForm?.value).subscribe({
          next:(res)=>{
             if(res.status==='success'){
              window.open(res.session.url,'_self');
            }
          }
        });
      }
    }
  }
  changePaymentType(ele:HTMLInputElement):void{
    this.paymentType.set(ele.value)
  }

}
