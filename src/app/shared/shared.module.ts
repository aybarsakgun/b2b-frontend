import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {ReactiveFormsModule} from '@angular/forms';
import {LanguageSelectionComponent} from './components/language-selection/language-selection.component';
import {ClickOutsideDirective} from './directives/click-outside.directive';
import {PaginationComponent} from './components/pagination/pagination.component';
import {HttpClient} from '@angular/common/http';
import {TranslationLoaderFactory} from './loaders/translation.loader';

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
    ClickOutsideDirective,
    PaginationComponent
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    LanguageSelectionComponent,
    ClickOutsideDirective,
    PaginationComponent
  ]
})
export class SharedModule {
}
