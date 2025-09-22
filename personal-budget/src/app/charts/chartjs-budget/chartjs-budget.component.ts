import { Component,Input, ViewChild, ElementRef, AfterViewInit, OnDestroy, inject } from '@angular/core';
import { isPlatformBrowser, NgIf } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import Chart from 'chart.js/auto';
import { DataService, BudgetItem } from '../../data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'pb-chartjs-budget',
  standalone: true,
  imports: [NgIf],
  template: `<canvas #cvs *ngIf="isBrowser" style="width:100%;height:100%"></canvas>`,
  styles: [':host{display:block;width:400px;height:400px}']
})
export class ChartjsBudgetComponent implements AfterViewInit, OnDestroy {
  @Input({ required: true }) items: BudgetItem[] = [];
  @ViewChild('cvs', { static: false }) canvas!: ElementRef<HTMLCanvasElement>;
  private chart?: Chart;
  private sub?: Subscription;

  private platformId = inject(PLATFORM_ID);
  readonly isBrowser = isPlatformBrowser(this.platformId);

  private data = inject(DataService);

  ngAfterViewInit(): void {
    if (!this.isBrowser) return;

    this.sub = this.data.getItems().subscribe(items => {
      this.render(items);
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
    this.chart?.destroy();
  }

  private render(items: BudgetItem[]): void {
    const labels = items.map(i => i.title);
    const data = items.map(i => i.budget);

    this.chart?.destroy();
    const ctx = this.canvas.nativeElement.getContext('2d');
    if (!ctx) return;

    this.chart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels,
        datasets: [{
          data,
          backgroundColor: ['#ffcd56','#ff6384','#36a2eb','#fd6b19','#8dd3c7','#80b1d3','#b3de69']
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: 'bottom' } }
      }
    });
  }
}
