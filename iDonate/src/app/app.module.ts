import { BrowserModule }                 from '@angular/platform-browser';
import { NgModule }                      from '@angular/core';
import { FormsModule }                   from "@angular/forms";

import { BsDatepickerModule }            from 'ngx-bootstrap/datepicker';
import { NgbModule }                     from '@ng-bootstrap/ng-bootstrap';
import { CollapseModule }                from "ngx-bootstrap";

import { AppComponent }                  from './app.component';
import { AppRoutingModule }              from './app-routing.module';
import { DatePickerComponent }           from './components/date-picker/date-picker.component';
import { InfoBoxComponent }              from './components/info-box/info-box.component';
import { LayoutComponentComponent }      from './components/layout-component/layout-component.component';
import { NoteComponentComponent }        from './components/note-component/note-component.component';
import { SidebarComponent }              from './components/sidebar/sidebar.component';
import { StatusLedComponent }            from './components/status-led/status-led.component';
import { TicketActionHeaderComponent }   from './components/ticket-action-header/ticket-action-header.component';
import { ActionItemPipe }                from './pipes/action-item/action-item.pipe';
import { TicketStatusPipe }              from './pipes/ticket-status/ticket-status.pipe';
import { AuthGuardService }              from "./services/auth-guard/auth-guard.service";
import { AuthService }                   from "./services/auth/auth.service";
import { DashboardSummaryViewComponent } from './views/dashboard-summary-view/dashboard-summary-view.component';
import { NewTicketViewComponent }        from './views/new-ticket-view/new-ticket-view.component';
import { SignInViewComponent }           from './views/sign-in-view/sign-in-view.component';
import { TicketDetailsViewComponent }    from './views/ticket-details-view/ticket-details-view.component';
import { TicketReportsViewComponent }    from './views/ticket-reports-view/ticket-reports-view.component';


@NgModule({

  declarations: [
    AppComponent,
    SignInViewComponent,
    DashboardSummaryViewComponent,
    TicketReportsViewComponent,
    TicketDetailsViewComponent,
    NewTicketViewComponent,
    SidebarComponent,
    ActionItemPipe,
    LayoutComponentComponent,
    TicketStatusPipe,
    InfoBoxComponent,
    NoteComponentComponent,
    TicketActionHeaderComponent,
    DatePickerComponent,
    StatusLedComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    CollapseModule.forRoot(),
    BsDatepickerModule.forRoot()
  ],

  providers: [
    AuthGuardService,
    AuthService
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
