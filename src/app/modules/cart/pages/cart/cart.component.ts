import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartComponent {
  constructor() {
  }

}
