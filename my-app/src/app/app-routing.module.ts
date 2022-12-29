import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingComponent } from "./booking/booking.component";
import { SearchFormComponent } from "./search-form/search-form.component";

const routes: Routes = [
  {path: 'search', component: SearchFormComponent},
  {path: 'bookings', component: BookingComponent},
  {path: '', redirectTo: 'search', pathMatch: 'full'}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
