import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {ProductListComponent} from './product-list/product-list.component';
import {ProductRoutingModule} from './product-routing.module';
import {ProductService} from './product.service';

@NgModule({
  declarations: [
    ProductListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ProductRoutingModule
  ],
  providers: [ProductService]
})
export class ProductModule {
}
