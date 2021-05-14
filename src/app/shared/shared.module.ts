import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {ReactiveFormsModule} from '@angular/forms';
import {LanguageSelectionComponent} from './components/language-selection/language-selection.component';
import {ClickOutsideDirective} from './directives/click-outside.directive';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule.forChild(),
  ],
  declarations: [
    LanguageSelectionComponent,
    ClickOutsideDirective
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    LanguageSelectionComponent,
    ClickOutsideDirective
  ]
})
export class SharedModule {
}
