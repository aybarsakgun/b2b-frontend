import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { BASE_URL } from '../../../../environments/environment';

@Component({
  selector: 'app-product-image[src][size][alt]',
  templateUrl: './product-image.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductImageComponent implements OnInit {
  @Input() src: string;
  @Input() alt: string;
  @Input() size: string | number;
  @Output() loaded = new EventEmitter();

  ngOnInit(): void {
    this.src = BASE_URL + '/image/' + this.size + '/' + (this.src ? this.src : '404.png');
  }

  handleLoad(): void {
    this.loaded.emit();
  }
}
