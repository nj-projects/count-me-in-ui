import {Component, input} from '@angular/core';
import {MatCard, MatCardContent} from "@angular/material/card";

@Component({
  selector: 'app-date-card',
  standalone: true,
  imports: [
    MatCard,
    MatCardContent
  ],
  templateUrl: './date-card.component.html',
  styleUrl: './date-card.component.scss'
})
export class DateCardComponent {
  timeInterval = input<number>();
}
