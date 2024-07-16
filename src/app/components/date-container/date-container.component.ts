import {Component, input} from '@angular/core';
import {CustomDate} from "./model/date.model";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";

@Component({
  selector: 'app-date-container',
  standalone: true,
  imports: [
    MatGridList,
    MatGridTile
  ],
  templateUrl: './date-container.component.html',
  styleUrl: './date-container.component.scss'
})
export class DateContainerComponent {
  customDate = input<Partial<CustomDate>>({});
}
