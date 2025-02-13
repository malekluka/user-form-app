import { ApplicationConfig } from '@angular/core';
import { provideRouter, Routes, withComponentInputBinding } from '@angular/router';
import { UserFormComponent } from './components/user-form/user-form.component';
import { HomeComponent } from './components/homepage/homepage.component';
import { CanLeaveGuard } from './services/can-leave.guard';

const appRoutes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'user', component: UserFormComponent , canDeactivate: [CanLeaveGuard]},
  { path: '**', redirectTo: '' }
];

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(appRoutes , withComponentInputBinding())]
};
