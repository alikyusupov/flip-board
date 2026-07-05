

import { DOCUMENT,inject, Injectable, RendererFactory2 } from '@angular/core';
import { NzMenuThemeType } from 'ng-zorro-antd/menu';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private readonly _document = inject(DOCUMENT);
  private readonly _rendererFactory = inject(RendererFactory2);
  private readonly _renderer = this._rendererFactory.createRenderer(null, null);

  theme$ = new BehaviorSubject<NzMenuThemeType>('light')


  public toggleMode(mode: NzMenuThemeType) {
   
    if (mode === 'dark') {
      this._renderer.addClass(this._document.body, 'dark-theme');
    } else {
      this._renderer.removeClass(this._document.body, 'dark-theme');
    }

    this.theme$.next(mode)
  }
}
