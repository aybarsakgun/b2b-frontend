import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {BehaviorSubject, Observable} from 'rxjs';
import {CartOperationModel} from '../../../models/cart/cart.model';
import {SettingState} from '../../../store/states/setting/setting.state';
import {ProductModel} from '../../../models/product/product.model';
import {Cart} from '../../../store/actions/cart/cart.action';
import {CART_STATE_TOKEN, CartState} from '../../../store/states/cart/cart.state';
import CartOperationType = Cart.CartOperationType;
import {filter, switchMap, take} from 'rxjs/operators';

@Component({
  selector: 'app-add-to-cart-button[product][quantity]',
  templateUrl: './add-to-cart-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddToCartButtonComponent {
  @Input() product: ProductModel = null;
  @Input() quantity = 1;

  @Select(SettingState.settings)
  public settings$: Observable<{
    [settingKey: string]: string
  }>;

  @Select(CartState.operation)
  public cartOperation$: Observable<CartOperationModel>;

  cartOperationType = CartOperationType;
  successLabelVisibility$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private store: Store
  ) {
  }

  add(): void {
    this.store.dispatch(new Cart.AddItem({
      product: this.product,
      quantity: this.quantity
    })).pipe(
      take(1),
      switchMap(() => this.store.selectOnce(CART_STATE_TOKEN)),
      filter(cartState => {
        return cartState.operation.type === this.cartOperationType.ADD_ITEM_SUCCESS && cartState.operation.id === this.product.id;
      })
    ).subscribe(() => {
      this.successLabelVisibility$.next(true);
      setTimeout(() => this.successLabelVisibility$.next(false), 1500);
    });
  }
}
