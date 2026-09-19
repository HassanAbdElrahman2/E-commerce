import { Component, inject, OnInit, signal } from '@angular/core';
import { BrandsService } from '../../core/services/brands.service';
import { Brand } from '../../core/models/brand.interface';
import {NgxPaginationModule} from 'ngx-pagination';
import { RouterLink } from '@angular/router'; 
@Component({
  selector: 'app-brands',
  imports: [NgxPaginationModule, RouterLink],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css',
})
export class BrandsComponent implements OnInit {
  ngOnInit(): void {
    this.getAllBrands();
  }
 private readonly brandsService=inject(BrandsService);
BrandsList=signal<Brand[]>([]);
pageSize=signal<number>(0);
  currentPage=signal<number>(0);
  total=signal<number>(0);

  getAllBrands(page:number=1):void{
this.brandsService.getAllBrands(page).subscribe({
  next:(res)=>{
    this.BrandsList.set(res.data);
      this.pageSize.set( res.metadata.limit);
        this.currentPage.set(res.metadata.currentPage);
        this.total.set(res.results);
  }
});
  }
  pageChanged(page:number){
    this.getAllBrands(page);
  }
}
