import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { HomeComponent } from './components/home/home.component';
import { RegistrationFormComponent } from './components/registration-form/registration-form.component';

import { UserService } from './services/user.service';
import { LinkService } from './services/link.service';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { LogoutComponent } from './components/logout/logout.component';
import { LinkListComponent } from './components/link-list/link-list.component';
import { AddLinkFormComponent } from './components/add-link-form/add-link-form.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    RegistrationFormComponent,
    LoginFormComponent,
    LogoutComponent,
    LinkListComponent,
    AddLinkFormComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'register', component: RegistrationFormComponent },
      { path: 'login', component: LoginFormComponent },
      { path: 'links', component: LinkListComponent },
      { path: 'logout', component: LogoutComponent }
    ])
  ],
  providers: [UserService, LinkService],
  bootstrap: [AppComponent]
})
export class AppModule { }
