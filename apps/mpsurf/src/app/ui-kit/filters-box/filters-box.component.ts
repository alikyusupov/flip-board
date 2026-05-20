import { Component, computed, input, OnInit, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzSegmentedModule } from 'ng-zorro-antd/segmented';
import { NzSelectModule } from 'ng-zorro-antd/select';

import { IFiltersBox } from '../../models/filters-box';

@Component({
  selector: 'app-filters-box',
  imports: [NzSelectModule, NzCheckboxModule, FormsModule, NzSegmentedModule],
  templateUrl: './filters-box.component.html',
  styleUrl: './filters-box.component.scss'
})
export class FiltersBoxComponent implements OnInit {

  filterGroups = input.required<IFiltersBox[][]>();
  disabled = input(false);

  filterChangeEvent = output<Record<string, string[] | string | number | boolean>>();

  multiselectsMap: Record<string, string[]> = {};
  selectsMap: Record<string, string | number> = {};
  multibuttonsMap: Record<string, string | number> = {};
  checkboxesMap: Record<string, boolean> = {};

  multiselects = computed(() => this.filterGroups().flatMap(g => g).filter(g => g.type === 'multi-select'));
  selects = computed(() => this.filterGroups().flatMap(g => g).filter(g => g.type === 'select'));
  multibuttons = computed(() => this.filterGroups().flatMap(g => g).filter(g => g.type === 'multi-button'));
  checkboxes = computed(() => this.filterGroups().flatMap(g => g).filter(g => g.type === 'checkbox'));

  ngOnInit(): void {
    this.setMultiselectsMap();
    this.setSelectsMap();
    this.setMultibuttonsMap();
    this.setCheckboxesMap();
  }

  setMultiselectsMap(): void {
    this.multiselects().forEach((v) => this.multiselectsMap[v.id] = [])
  }

  setSelectsMap(): void {
    this.selects().forEach((v) => this.selectsMap[v.id] = v.defaultValue || '')
  }

  setMultibuttonsMap(): void {
    this.multibuttons().forEach((v) => this.multibuttonsMap[v.id] = v.defaultValue || '')
  }

  setCheckboxesMap(): void {
    this.checkboxes().forEach((v) => this.checkboxesMap[v.id] = v.isChecked || false)
  }

  onMultiselectChange(): void {
    this.triggerOutput()
  }

  onSelectChange(): void {
    this.triggerOutput()
  }

  onMultibuttonChange(): void {
    this.triggerOutput()
  }

  onCheckboxChange(): void {
    this.triggerOutput()
  }

  triggerOutput(): void {

    const payload = {
      ...this.multibuttonsMap,
      ...this.selectsMap,
      ...this.multiselectsMap,
      ...this.checkboxesMap
    }

    this.filterChangeEvent.emit(payload);
  }

}
