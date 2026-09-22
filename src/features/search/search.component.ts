import { AfterViewInit, Component, inject, OnInit, signal } from '@angular/core';
import { Drawer } from 'flowbite';
import { Category } from '../../core/models/category.interface';
import { CategoriesService } from '../../core/services/categories.service';
import { Brand } from '../../core/models/brand.interface';
import { BrandsService } from '../../core/services/brands.service';
import { CardComponent } from '../../shared/ui/card/card.component';
import { Product } from '../../core/models/product.interface';
import { ProductsService } from '../../core/services/products.service';
import { FilterType } from '../../core/enums/filter-type.enum';
import {NgxPaginationModule} from 'ngx-pagination'; 
@Component({
  selector: 'app-search',
  imports: [CardComponent,NgxPaginationModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})

export class SearchComponent implements AfterViewInit,OnInit {
 
  private readonly categoriesService=inject(CategoriesService);
  private readonly brandsService=inject(BrandsService);
    private readonly productsService =inject(ProductsService);
  categoryList=signal<Category[]>([]);   
  BrandsList=signal<Brand[]>([]);
  pageSize=signal<number>(0);
    currentPage=signal<number>(0);
    total=signal<number>(0);
ProductList=signal<Product[]>([]);
allProducts = signal<Product[]>([]);
searchCategorieslist=signal<string[]>([]);
searchBrandslist=signal<string[]>([]);
searchMaxPrice=signal<string>('');
searchMinPrice=signal<string>('');
filterType=FilterType;
 ngOnInit(): void {

    this.getAllCategories();
    this.getAllBrands();
    this.getAllProducts();
  }
  ngAfterViewInit(): void {

    const drawerElement =
      document.getElementById('filter-drawer');

    if (drawerElement) {

      const drawer = new Drawer(
        drawerElement,
        {
          placement: 'left',
          backdrop: true,
          bodyScrolling: false
        }
      );

      // نخلي Flowbite متاح للـ buttons
      drawerElement.setAttribute(
        'data-flowbite-drawer',
        'true'
      );
    }
  }
  getAllCategories():void{
this.categoriesService.getAllCategories().subscribe({
  next:(res)=>{
     this.categoryList.set(res.data);
  }
})
}
    getAllBrands():void{
  this.brandsService.getAllBrands().subscribe({
    next:(res)=>{
      this.BrandsList.set(res.data);
    }
  });
    }
      getAllProducts(page:number=1):void{
    this.productsService.getSearchProducts(page, {
    category: this.searchCategorieslist(),
    brand: this.searchBrandslist()
  }).subscribe({
      next:(res)=>{
        this.allProducts.set(res.data);
          this.ProductList.set(
    this.filterByPrice(res.data)
  );
         this.pageSize.set( res.metadata.limit);
        this.currentPage.set(res.metadata.currentPage);
        this.total.set(res.results);
      },
      error:(err)=>{

      }
    })
  }
    pageChanged(page:number){
      this.getAllProducts(page);
    }

   createSearchQuery(
  event: Event,
  id: string,
  filter: FilterType
) {
  if (filter === FilterType.Category || filter === FilterType.Brand) {

    const checked = (event.target as HTMLInputElement).checked;

    if (checked) {

      if (filter === FilterType.Category) {

        this.searchCategorieslist.update(ids => [id, ...ids]);

      } else if (filter === FilterType.Brand) {

        this.searchBrandslist.update(ids => [id, ...ids]);

      }

    } else {

      if (filter === FilterType.Category) {

        this.searchCategorieslist.update(
          ids => ids.filter(x => x !== id)
        );

      } else if (filter === FilterType.Brand) {

        this.searchBrandslist.update(
          ids => ids.filter(x => x !== id)
        );

      }
    }
    this.getAllProducts();
  } else if (filter === FilterType.Price) {

  const input = event.target as HTMLInputElement;

  if (id === 'min') {
    this.searchMinPrice.set(input.value);
  } 
  else if (id === 'max') {
    this.searchMaxPrice.set(input.value);
  }

  this.ProductList.set(
    this.filterByPrice(this.allProducts())
  );
}


}
clearFilters(): void {

  this.searchCategorieslist.set([]);
  this.searchBrandslist.set([]);
  this.searchMinPrice.set('');
  this.searchMaxPrice.set('');
  this.getAllProducts(1);
}
filterByPrice(products: Product[]): Product[] {

  const min = this.searchMinPrice();
  const max = this.searchMaxPrice();

  return products.filter(product =>
    (!min || product.price >= +min) &&
    (!max || product.price <= +max)
  );
}
}