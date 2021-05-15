import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {ReactiveFormsModule} from '@angular/forms';
import {LanguageSelectionComponent} from './components/language-selection/language-selection.component';
import {ClickOutsideDirective} from './directives/click-outside.directive';
import {PaginationComponent} from './components/pagination/pagination.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule.forChild(),
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
