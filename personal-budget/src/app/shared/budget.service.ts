import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface BudgetItem { title: string; budget: number; }
export interface BudgetResponse { myBudget: BudgetItem[]; }

@Injectable({ providedIn: 'root' })
export class BudgetService {
  constructor(private http: HttpClient) {}

  getBudget(): Observable<BudgetItem[]> {
    return this.http.get<BudgetResponse>('/budget').pipe(
      map(res => res.myBudget ?? [])
    );
  }
}
