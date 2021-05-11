import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import * as _productListActions from '../../../store/actions/product-list.actions';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html'
})
export class ProductListComponent {
  constructor(
    private store: Store
  ) {
    this.store.dispatch(new _productListActions.ProductsFetching());
  }
}
