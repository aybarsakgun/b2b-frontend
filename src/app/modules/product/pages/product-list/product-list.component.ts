import {Component} from '@angular/core';
import {ProductService} from '../../product.service';
import {Observable} from 'rxjs';
import {ProductResults} from '../../../../graphql/results/product/product.results';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html'
})
export class ProductListComponent {
  productList$: Observable<ProductResults.ProductListResult> = null;

  constructor(
    private productService: ProductService
  ) {
    this.productList$ = this.productService.productList({
      page: 1,
      limit: 20
    });
  }
}
