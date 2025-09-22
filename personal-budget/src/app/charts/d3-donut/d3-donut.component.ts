import { Component, ElementRef,Input, ViewChild, AfterViewInit, OnDestroy, inject } from '@angular/core';
import { isPlatformBrowser, NgIf } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import * as d3 from 'd3';
import { DataService, BudgetItem } from '../../data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'pb-d3-donut',
  standalone: true,
  imports: [NgIf],
  template: `<svg #svg *ngIf="isBrowser" style="width:100%;height:100%"></svg>`,
  styles: [':host{display:block;width:400px;height:400px}']
})
export class D3DonutComponent implements AfterViewInit, OnDestroy {
  @Input({ required: true }) items: BudgetItem[] = [];
  @ViewChild('svg', { static: false }) svgRef!: ElementRef<SVGSVGElement>;

  private platformId = inject(PLATFORM_ID);
  readonly isBrowser = isPlatformBrowser(this.platformId);

  private data = inject(DataService);
  private sub?: Subscription;
  private cleanup?: () => void;

  ngAfterViewInit(): void {
    if (!this.isBrowser) return;

    this.sub = this.data.getItems().subscribe(items => {
      this.draw(items);
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
    this.cleanup?.();
  }

  private draw(items: BudgetItem[]): void {
    const svg = d3.select(this.svgRef.nativeElement);
    svg.selectAll('*').remove();

    const box = this.svgRef.nativeElement.getBoundingClientRect();
    const side = Math.min(420, box.width || 420);
    const radius = side / 2;

    svg.attr('viewBox', `0 0 ${side} ${side}`).attr('preserveAspectRatio', 'xMidYMid meet');
    const g = svg.append('g').attr('transform', `translate(${side/2},${side/2})`);

    const color = d3.scaleOrdinal<string>()
      .domain(items.map(d => d.title))
      .range(['#ffcd56','#ff6384','#36a2eb','#fd6b19','#8dd3c7','#80b1d3','#b3de69']);

    const pie = d3.pie<BudgetItem>().sort(null).value(d => d.budget);
    const arc = d3.arc<d3.PieArcDatum<BudgetItem>>()
      .innerRadius(radius * 0.55)
      .outerRadius(radius * 0.95);

    g.selectAll('path')
      .data(pie(items))
      .enter()
      .append('path')
      .attr('fill', d => color(d.data.title)!)
      .attr('d', arc as any);

    this.cleanup = () => svg.selectAll('*').remove();
  }
}
