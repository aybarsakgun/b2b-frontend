import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent {
  constructor() {
  }
}
