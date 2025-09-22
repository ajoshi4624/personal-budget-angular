import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, shareReplay } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

export interface BudgetItem { title: string; budget: number; }

interface BudgetResponse {
  myBudget: { title: string; budget: number }[];
}

@Injectable({ providedIn: 'root' })
export class DataService {
  private http = inject(HttpClient);


  private cachedItems: BudgetItem[] | null = null;
  private shared$?: Observable<BudgetItem[]>;

  getItems(): Observable<BudgetItem[]> {

    if (this.cachedItems) {
      return of(this.cachedItems);
    }


    if (this.shared$) {
      return this.shared$;
    }


    this.shared$ = this.http
  .get<BudgetResponse>('assets/budget.json')
  .pipe(
    map(res => (res?.myBudget ?? []).map(it => ({ title: it.title, budget: it.budget }))),
    map(items => {
      this.cachedItems = items;
      return items;
    }),
    shareReplay(1)
  );
    return this.shared$;
  }
}
