import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { AsyncPipe } from '@angular/common';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { INzOption } from '@models';
import { Store } from '@ngxs/store';
import { AgGridAngular } from 'ag-grid-angular';
import { CellValueChangedEvent, ColDef, FirstDataRenderedEvent, GridApi, GridOptions, GridReadyEvent, SelectionChangedEvent } from 'ag-grid-community';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzSelectModule } from 'ng-zorro-antd/select';

import { LoadPlanFactArticles, UpsertPlanFact } from '../../pages/plan-fact/plan-fact.actions';
import { DialogType } from '../../pages/plan-fact/plan-fact.component';
import { MODAL_COLUMNS_DEFS } from '../../pages/plan-fact/plan-fact.definition';
import { IPlanFactItem } from '../../pages/plan-fact/plan-fact.model';
import { FinancesPlanFactState } from '../../pages/plan-fact/plan-fact.state';

const MonthDict: Record<string, string> = {
  '0': 'Январь',
  '1': 'Февраль',
  '2': 'Март',
  '3': 'Апрель',
  '4': 'Май',
  '5': 'Июнь',
  '6': 'Июль',
  '7': 'Август',
  '8': 'Сентябрь',
  '9': 'Октябрь',
  '10': 'Ноябрь',
  '11': 'Декабрь'
};

@Component({
  selector: 'app-plan-fact-upsert-dialog',
  imports: [ReactiveFormsModule, NzFormModule, NzInputModule, NzButtonModule, NzSelectModule, NzInputNumberModule, NzDatePickerModule, AgGridAngular, NzIconModule, AsyncPipe],
  templateUrl: './plan-fact-upsert-dialog.component.html',
  styleUrl: './plan-fact-upsert-dialog.component.scss'
})
export class PlanFactUpsertDialogComponent implements OnInit {

  private readonly _fb = inject(FormBuilder);
  private readonly _store = inject(Store);
  private readonly dialogRef = inject<DialogRef<string>>(DialogRef<string>);
  protected readonly data = inject<{ mode: DialogType, plan: IPlanFactItem | null}>(DIALOG_DATA);
  private readonly _destroyRef = inject(DestroyRef);

  upsertPlanFormGroup?: FormGroup | null = null;

  planfact$ = this._store.select(FinancesPlanFactState.planFactById).pipe(takeUntilDestroyed(this._destroyRef));
  articles$ = this._store.select(FinancesPlanFactState.planFactArticles).pipe(takeUntilDestroyed(this._destroyRef));

  columnDefs = MODAL_COLUMNS_DEFS

  protected TYPES: INzOption<number>[] = [
    { 
      value: 1, label: 'По кабинету',
    },
    { 
      value: 2, label: 'По артикулу',
    },
  ]

  protected METHODS: INzOption<number>[] = [
    { 
      value: 1, label: 'По сумме заказов',
    },
    { 
      value: 2, label: 'По сумме продаж',
    },
  ]

  protected gridOptions: GridOptions = {
    context: { componentParent: this },
    enableCellTextSelection: true,
  };

  protected gridApi: GridApi | null = null;

  readonly defaultColDef: ColDef = {
    headerClass: 'header-centered',
    sortable: true,
    resizable: true,
    filter: true,
    wrapHeaderText: true,
    autoHeaderHeight: true,
    cellStyle: { textAlign: 'center' },
  };
  

  ngOnInit(): void {

    if(this.data.mode === 'add') {

      const currentDate = new Date();

      this.upsertPlanFormGroup = this._fb.group({
  
        plan_name: new FormControl(null, {
          nonNullable: true,
          validators: [Validators.required],
        }),
  
        period: new FormControl(currentDate, { nonNullable: true }),
  
        type: new FormControl(1, { nonNullable: true }),
  
        method: new FormControl(1, { nonNullable: true }),
       
        goal_rub: new FormControl(null, {
          nonNullable: true,
          validators: [Validators.required],
        }),
  
        articles: new FormArray([]),
      });

      this.upsertPlanFormGroup.controls['type'].valueChanges.subscribe(type => {
        if(type === 2){
          this._store.dispatch(new LoadPlanFactArticles({
            method: "GET",
            endpoint: 'plan-fact/articles'
          }))
        }
      })

    }
    else {

      this.planfact$.subscribe(plan => {
        if(plan) {

          const year = plan.yearFrom;
          const month = plan.monthFrom;

          const planDate = new Date(+year, +month - 1);

          this.upsertPlanFormGroup = this._fb.group({
      
            plan_name: new FormControl(plan.plan_name, {
              nonNullable: true,
              validators: [Validators.required],
            }),
      
            period: new FormControl(planDate, { nonNullable: true }),
      
            type: new FormControl(plan.type, { nonNullable: true }),
      
            method: new FormControl(plan.method, { nonNullable: true }),
           
            goal_rub: new FormControl(plan.goal_rub, {
              nonNullable: true,
              validators: [Validators.required],
            }),
      
            articles: new FormArray([]),
          });
        }
      })

    }

  }

  onGridReady(params: GridReadyEvent): void {
    this.gridApi = params.api;
  }

  onCellValueChanged(event: CellValueChangedEvent) {
    const total = (event['api'] as GridApi).getSelectedRows().map((el => el.plan_sum ? +el.plan_sum : 0)).reduce((a, b) => a + b, 0);
    this.upsertPlanFormGroup?.controls['goal_rub'].setValue(total)
  }

  onSelectionChanged(event: SelectionChangedEvent) {
    const total = (event['api'] as GridApi).getSelectedRows().map((el => el.plan_sum ? +el.plan_sum : 0)).reduce((a, b) => a + b, 0);
    this.upsertPlanFormGroup?.controls['goal_rub'].setValue(total)
  }

  onFirstDataRendered(event: FirstDataRenderedEvent) {
    event.api.forEachNode((node) => {
        if(node.data.isChecked) {
          node.setSelected(true)
        }
    });
  }

  upsertPlanFact(): void {

    const date: Date = this.upsertPlanFormGroup?.controls['period'].value;

    const [yearFrom, monthFrom] = [date.getFullYear(), date.getMonth()];

    const monthAsRussianWord = MonthDict[monthFrom];

    const articles = this.gridApi?.getSelectedRows().map(row => ({...row, isChecked: true}));

    const params = {
      "plan_name":  this.upsertPlanFormGroup?.controls['plan_name'].value,
      "dateFrom":   `${monthAsRussianWord} ${yearFrom}`,
      "yearFrom":   `${yearFrom}`,
      "monthFrom":  `${monthFrom + 1}`.padStart(2, '0'),
      "goal_rub":   this.upsertPlanFormGroup?.controls['goal_rub'].value,
      "type":       this.upsertPlanFormGroup?.controls['type'].value,
      "method":     this.upsertPlanFormGroup?.controls['method'].value,
      "articles": articles
    };

    this._store.dispatch(new UpsertPlanFact({
      method: 'POST',
      endpoint: 'plan-fact',
      params
    }))
    .subscribe(() => this.dialogRef.close())
  }

}
