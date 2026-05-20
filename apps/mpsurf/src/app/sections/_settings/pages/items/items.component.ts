import { AsyncPipe } from '@angular/common';
import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Store } from '@ngxs/store';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { TreeNode } from 'primeng/api';
import { Tree } from 'primeng/tree';

import { LoadItemsGrid } from './items.actions';
import { SettingsItemsState } from './items.state';

@Component({
  selector: 'app-items',
  imports: [Tree, AsyncPipe, NzSkeletonModule],
  templateUrl: './items.component.html',
  styleUrl: './items.component.scss'
})
export class ItemsComponent implements OnInit  {

  private readonly _store = inject(Store);
  private readonly _destroyRef = inject(DestroyRef);

  grid$ = this._store.select(SettingsItemsState.grid).pipe(takeUntilDestroyed(this._destroyRef));
  isGridLoading$ = this._store.select(SettingsItemsState.isGridLoading).pipe(takeUntilDestroyed(this._destroyRef));

  files = signal<TreeNode[]>([]);

  skeletons = Array.from({length: 10});

  ngOnInit(): void {

    this._store.dispatch(new LoadItemsGrid({
      method: 'GET',
      endpoint: 'fin-items'
    }))

    this.grid$
      .subscribe(grid => {

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        this.files.set(grid);

      })

  }


}
