import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Article } from '../article/article';
import { ChartjsBudgetComponent } from '../charts/chartjs-budget/chartjs-budget.component';
import { D3DonutComponent } from '../charts/d3-donut/d3-donut.component';
import { Breadcrumbs } from '../breadcrumbs/breadcrumbs';
import { DataService } from '../data.service';


export type BudgetItem = { title: string; budget: number };

@Component({
  selector: 'pb-homepage',
  standalone: true,
  imports: [CommonModule, Article, ChartjsBudgetComponent, D3DonutComponent, Breadcrumbs],
  templateUrl: './homepage.html',
  styleUrls: ['./homepage.scss'],
})
export class Homepage implements OnInit{

  budgetItems: BudgetItem[] = [
    { title: 'Rent',           budget: 500 },
    { title: 'Groceries',      budget: 120 },
    { title: 'Utilities',      budget: 80 },
    { title: 'Transportation', budget: 60 },
    { title: 'Dining Out',     budget: 50 },
    { title: 'Entertainment',  budget: 45 },
    { title: 'Savings',        budget: 200 },


  ];

   constructor(private data: DataService) {}

  ngOnInit(): void {
    this.data.getItems().subscribe({
      next: (items: BudgetItem[]) => {
        console.log('Budget items from API:', items);
        this.budgetItems = items;
      },
      error: (err: unknown) => console.error('GET /budget failed', err)
    });
  }
}
