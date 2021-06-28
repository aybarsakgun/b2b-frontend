import {NgModule} from '@angular/core';
import {ProductListComponent} from './pages/product-list/product-list.component';
import {ProductRoutingModule} from './product-routing.module';
import {ProductService} from './product.service';
import {SharedModule} from '../../shared/shared.module';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    ProductListComponent
  ],
  imports: [
    ProductRoutingModule,
    SharedModule,
    FormsModule
  ],
  providers: [ProductService]
})
export class ProductModule {
}
