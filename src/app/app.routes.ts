import {Routes} from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {EventManagementComponent} from "./pages/event-management/event-management.component";
import {CreateComponent} from "./components/event/create/create.component";
import {EditComponent} from "./components/event/edit/edit.component";

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'create', component: CreateComponent},
  {path: 'management', component: EventManagementComponent},
  {path: 'management/edit/:id', component: EditComponent}
];
