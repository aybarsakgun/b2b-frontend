import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {HeaderComponent} from './layouts/main/header/header.component';
import {FooterComponent} from './layouts/main/footer/footer.component';
import {AppRoutingModule} from './app-routing.module';
import {NgxsModule} from '@ngxs/store';
import {MainComponent} from './layouts/main/main.component';
import {AuthComponent} from './layouts/auth/auth.component';
import {NotFoundComponent} from './layouts/not-found/not-found.component';
import {AuthState} from './store/states/auth/auth.state';
import {GraphQLModule} from './graphql/graphql.module';
import {AuthService} from './modules/auth/auth.service';
import {NgxsReduxDevtoolsPluginModule} from '@ngxs/devtools-plugin';
import {NgxsRouterPluginModule} from '@ngxs/router-plugin';
import {environment} from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    MainComponent,
    HeaderComponent,
    FooterComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    GraphQLModule,
    NgxsModule.forRoot([AuthState], {
      developmentMode: !environment.production
    }),
    NgxsReduxDevtoolsPluginModule.forRoot({
      disabled: environment.production
    }),
    NgxsRouterPluginModule.forRoot(),
    AppRoutingModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
