import { Component } from '@angular/core';

@Component({
  selector: 'pb-models',
  imports: [],
  templateUrl: './models.html',
  styleUrl: './models.scss'
})
export class Models {

}

export interface BudgetItem {
  title: string;
  budget: number;
}
