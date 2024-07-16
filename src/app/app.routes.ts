import {Routes} from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {EventManagementComponent} from "./pages/event-management/event-management.component";

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'management', component: EventManagementComponent}
];
