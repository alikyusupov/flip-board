import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { DATE_PRESETS } from '@consts';
import { Store } from '@ngxs/store';
import { GetStatuses } from 'app/actions/main.actions';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';

@Component({
  selector: 'app-settings',
  imports: [RouterOutlet, NzDatePickerModule, FormsModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent implements OnInit {

  private readonly _store = inject(Store);

  presets = DATE_PRESETS;

  date = null;

  ngOnInit(): void {
    this._store.dispatch(new GetStatuses({method: 'GET', endpoint: 'products-status'}))
  }
  
  onChange(result: Date[]): void {
    console.log('onChange: ', result);
  }

}
