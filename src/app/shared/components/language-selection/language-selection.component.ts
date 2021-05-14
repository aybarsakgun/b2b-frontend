import {ChangeDetectionStrategy, Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-language-selection',
  templateUrl: './language-selection.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LanguageSelectionComponent {
  public languageSelectionPanelVisibility = false;
  public languageList: string[];
  public activeLanguage: string;
  public languageTranslationKeys: {
    [language: string]: string
  } = {
    tr: 'TURKISH',
    en: 'ENGLISH'
  };

  constructor(
    private translateService: TranslateService
  ) {
    this.languageList = this.translateService.getLangs();
    this.setActiveLanguage();
  }

  toggleLanguageSelectionPanelVisibility(): void {
    this.languageSelectionPanelVisibility = !this.languageSelectionPanelVisibility;
  }

  changeLanguage(language: string): void {
    this.translateService.use(language);
    this.setActiveLanguage(language);
    this.toggleLanguageSelectionPanelVisibility();
  }

  setActiveLanguage(language?: string): void {
    this.activeLanguage = language ?? this.translateService.currentLang;
  }
}
