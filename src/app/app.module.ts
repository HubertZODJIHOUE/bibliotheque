import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {LoginComponent} from "./login/login.component";
import {HomeComponent} from "./home/home.component";
import {AddBookComponent} from "./add-book/add-book.component";
import {PreferencesComponent} from "./preferences/preferences.component";
import {CreateAccountComponent} from "./login/create-account/create-account.component";
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from '@angular/router';
import {SearchComponent} from "./search/search.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {
  FacebookLoginProvider,
  GoogleLoginProvider,
  SocialAuthServiceConfig,
  SocialLoginModule
} from "@abacritt/angularx-social-login";


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    AddBookComponent,
    PreferencesComponent,
    CreateAccountComponent,
    SearchComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    RouterModule.forRoot([

      {path: 'MesPreferences', component: PreferencesComponent},
      {path: 'Login', component: LoginComponent},
      {path: 'Search', component: SearchComponent},
      {path: 'Home', component: HomeComponent},
      {path: 'AjouterUnLivre', component: AddBookComponent},
      {path: '', component: HomeComponent},
      {path: 'CreateAccount', component: CreateAccountComponent},


    ]),
    ReactiveFormsModule,
    FormsModule,
    SocialLoginModule,

  ],

  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '1067152610543-nbo6aogpec5l5vohlmmlg1aj7e0bois9.apps.googleusercontent.com'
            )
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('1067152610543-nbo6aogpec5l5vohlmmlg1aj7e0bois9.apps.googleusercontent.com')
          }
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

