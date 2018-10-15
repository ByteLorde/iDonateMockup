import {NgModule}             from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {AuthGuardService}              from "./services/auth-guard/auth-guard.service";
import {DashboardSummaryViewComponent} from "./views/dashboard-summary-view/dashboard-summary-view.component";
import {NewTicketViewComponent}        from "./views/new-ticket-view/new-ticket-view.component";
import {SignInViewComponent}           from "./views/sign-in-view/sign-in-view.component";
import {TicketDetailsViewComponent}    from "./views/ticket-details-view/ticket-details-view.component";
import {TicketReportsViewComponent}    from "./views/ticket-reports-view/ticket-reports-view.component";

const routes: Routes = [

  {path: '', redirectTo: 'tickets', pathMatch: 'full'},
  {path: 'login',       component: SignInViewComponent},
  {path: 'summary',     component: DashboardSummaryViewComponent, canActivate: [AuthGuardService]},
  {path: 'tickets',     component: TicketReportsViewComponent,    canActivate: [AuthGuardService]},
  {path: 'tickets/:id', component: TicketDetailsViewComponent,    canActivate: [AuthGuardService]},
  {path: 'new',         component: NewTicketViewComponent,        canActivate: [AuthGuardService]}, // Does the user need to be logged in the create a new ticket? Hmm...

];

@NgModule({
  imports:   [RouterModule.forRoot(routes)],
  exports:   [RouterModule],
  providers: [AuthGuardService]
})
export class AppRoutingModule {}
