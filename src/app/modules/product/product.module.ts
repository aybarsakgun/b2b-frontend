import {NgModule} from '@angular/core';
import {ProductListComponent} from './pages/product-list/product-list.component';
import {ProductRoutingModule} from './product-routing.module';
import {ProductService} from './product.service';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  declarations: [
    ProductListComponent
  ],
  imports: [
    ProductRoutingModule,
    SharedModule
  ],
  providers: [ProductService]
})
export class ProductModule {
}
