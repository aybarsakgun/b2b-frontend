import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {ReactiveFormsModule} from '@angular/forms';
import {LanguageSelectionComponent} from './components/language-selection/language-selection.component';
import {ClickOutsideDirective} from './directives/click-outside.directive';
import {PaginationComponent} from './components/pagination/pagination.component';
import {HttpClient} from '@angular/common/http';
import {TranslationLoaderFactory} from './loaders/translation.loader';
import {CurrencySelectionComponent} from './components/currency-selection/currency-selection.component';
import {ProductPriceComponent} from './components/product-price/product-price.component';
import {ProductImageComponent} from './components/product-image/product-image.component';
import {CartPriceComponent} from './components/cart-price/cart-price.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: TranslationLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  declarations: [
    LanguageSelectionComponent,
    CurrencySelectionComponent,
    ClickOutsideDirective,
    PaginationComponent,
    ProductPriceComponent,
    ProductImageComponent,
    CartPriceComponent
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    LanguageSelectionComponent,
    CurrencySelectionComponent,
    ClickOutsideDirective,
    PaginationComponent,
    ProductPriceComponent,
    ProductImageComponent,
    CartPriceComponent
  ]
})
export class SharedModule {
}
