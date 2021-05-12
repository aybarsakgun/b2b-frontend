import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html'
})
export class ProductListComponent implements OnInit {
  constructor(
    private productService: ProductService
  ) {

  }

  async ngOnInit(): Promise<any> {
    const products = await this.productService.getProducts();
    console.log(products);
  }
}
