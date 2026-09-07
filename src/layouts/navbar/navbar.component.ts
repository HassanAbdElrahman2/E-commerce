import { Component, computed, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { FlowbiteService } from '../../core/services/flowbite.service';
import { initFlowbite } from 'flowbite';
import { AuthService } from '../../core/auth/services/auth.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit{
    private readonly authService=inject(AuthService);
    
    constructor(private flowbiteService: FlowbiteService) {}
    logged=computed(()=>this.authService.isLogged());
    private readonly id=inject(PLATFORM_ID)
  ngOnInit(): void {
    if(isPlatformBrowser(this.id)){
      if(localStorage.getItem('freshToken')){
    this.authService.isLogged.set(true);
  }}
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
  
  }
  signOut():void{
  this.authService.signOut()
  }
}
