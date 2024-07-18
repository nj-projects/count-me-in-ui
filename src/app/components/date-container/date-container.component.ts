import {Component, input, OnInit} from '@angular/core';
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
export class DateContainerComponent implements OnInit {

  // customDate = input<Partial<CustomDate>>({});
  customDate = {} as CustomDate;
  eventDate = input<Partial<string>>('');

  ngOnInit(): void {
    this.setCountdown();
  }

  private setCountdown() {
    setInterval(() => {
      const now = new Date().getTime();
      let toDate = Date.parse(this.eventDate()) - now;

      this.customDate.days = Math.floor(toDate / (1000 * 60 * 60 * 24));
      this.customDate.hours = Math.floor((toDate % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      this.customDate.mins = Math.floor((toDate % (1000 * 60 * 60)) / (1000 * 60));
      this.customDate.secs = Math.floor((toDate % (1000 * 60)) / (1000));
    })
  }
}
