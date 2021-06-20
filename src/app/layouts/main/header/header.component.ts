import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {AuthState} from '../../../store/states/auth/auth.state';
import {Observable} from 'rxjs';
import {Auth} from '../../../store/actions/auth/auth.action';
import {Navigate, RouterState} from '@ngxs/router-plugin';
import {BaseState} from '../../../store/states/base/base.state';
import {CategoryModel} from '../../../models/product/category.model';
import {CurrencyModel} from '../../../models/currency/currency.model';
import {Cart} from '../../../store/actions/cart/cart.action';
import {take} from 'rxjs/operators';
import {CartState} from '../../../store/states/cart/cart.state';
import {CartModel} from '../../../models/cart/cart.model';
import {ProductModel} from '../../../models/product/product.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  @Select(AuthState.isAuthenticated)
  public isAuthenticated$: Observable<boolean>;

  @Select(BaseState.mainCategories)
  public mainCategories$: Observable<CategoryModel[]>;

  @Select(BaseState.currenciesWithoutMainCurrency)
  public currenciesWithoutMainCurrency$: Observable<CurrencyModel[]>;

  @Select(CartState.items)
  public cartItems$: Observable<CartModel[]>;

  constructor(
    private store: Store
  ) {
  }

  ngOnInit(): void {
    this.isAuthenticated$.pipe(take(1)).subscribe((isAuthenticated) => isAuthenticated && this.store.dispatch(new Cart.Fetch()));
  }

  toggleMobileMenu(): void {
    document.body.classList.toggle('slide-right');
  }

  navigateToProductList(category: CategoryModel): void {
    this.store.dispatch(new Navigate(['product/list'], {
      page: 1,
      category: category.id
    }));
  }

  cartRemoveProduct(product: ProductModel, cartId: number): void {
    this.store.dispatch(new Cart.RemoveItem({product, cartId}));
  }

  cartClear(): void {
    console.log('cartClear');
  }

  logout(): void {
    const routerState = this.store.selectSnapshot(RouterState);
    const url = routerState.state.url.split('?')[0];
    const queryParams = routerState.state.queryParams;
    this.store.dispatch([new Auth.Logout(), new Navigate([url], queryParams)]);
  }
}
