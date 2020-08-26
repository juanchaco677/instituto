import { Util } from './utils/util';
import { OverlayContainer } from '@angular/cdk/overlay';
import { ThemeService } from './theme.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  // tslint:disable-next-line: no-host-metadata-property
  host: { class: 'foo' },
})
export class AppComponent implements OnInit {
  title = 'instituto';
  constructor(
    private themeService: ThemeService,
    private overlay: OverlayContainer
  ) {
    this.changueTheme(1);
  }
  ngOnInit(): void {
    this.themeService.get$().subscribe((data) => this.changueTheme(data));
  }

  changueTheme(data: number) {
    if (!Util.empty(data)) {
      switch (data) {
        case 1:
          this.overlay
            .getContainerElement()
            .classList.remove('theme-light' || '');
          document.body.classList.remove('theme-light');
          this.overlay.getContainerElement().classList.add('theme-dark');
          document.body.classList.add('theme-dark');

          break;
        case 2:
          this.overlay.getContainerElement().classList.remove('theme-dark' || '');
          document.body.classList.remove('theme-dark');
          this.overlay.getContainerElement().classList.add('theme-light');
          document.body.classList.add('theme-light');
          break;
      }
    }
  }
}
