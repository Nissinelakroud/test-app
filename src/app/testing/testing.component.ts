import { Component } from '@angular/core';
import { TranslationService } from '../translation.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-testing',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.css']
})
export class TestingComponent {
  constructor(private translationService: TranslationService) {}

  switchLanguage(lang: string) {
    this.translationService.changeLang(lang);
  }
}
