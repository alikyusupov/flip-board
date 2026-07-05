import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterOutlet } from '@angular/router';
import { DATE_PRESETS } from '@consts';
import { distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-profile',
  imports: [RouterOutlet],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  
})
export class ProfileComponent implements OnInit {

  private readonly _observer = inject(BreakpointObserver);
  private readonly _destroyRef = inject(DestroyRef);

  isTabsPanelShown = signal(true);

  presets = DATE_PRESETS

  urls = [
    { link: 'shops', title: 'Кабинеты' },
  ]

  date = null;

  ngOnInit(): void {
    this._observer.observe([Breakpoints.Large, Breakpoints.Medium, Breakpoints.Small])
    .pipe(takeUntilDestroyed(this._destroyRef), distinctUntilChanged())
    .subscribe(
      () => this.breakpointChanged()
    )
  }

  onChange(result: Date[]): void {
    console.log('onChange: ', result);
  }

  private breakpointChanged() {
    this.isTabsPanelShown.set(!this._observer.isMatched(Breakpoints.Small))
  }

}
