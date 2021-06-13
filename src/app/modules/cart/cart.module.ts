import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {CartRoutingModule} from './cart-routing.module';
import {CartService} from './cart.service';
import {CartComponent} from './pages/cart/cart.component';

@NgModule({
  declarations: [
    CartComponent
  ],
  imports: [
    CartRoutingModule,
    SharedModule
  ],
  providers: [CartService]
})
export class CartModule {
}
