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
import {NgxsReduxDevtoolsPluginModule} from '@ngxs/devtools-plugin';
import {NgxsRouterPluginModule, RouterStateSerializer} from '@ngxs/router-plugin';
import {environment} from '../environments/environment';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SharedModule} from './shared/shared.module';
import {Params, RouterStateSnapshot} from '@angular/router';
import {SettingState} from './store/states/setting/setting.state';

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}

export interface RouterStateParams {
  url: string;
  params: Params;
  queryParams: Params;
}

export class CustomRouterStateSerializer implements RouterStateSerializer<RouterStateParams> {
  serialize(routerState: RouterStateSnapshot): RouterStateParams {
    const {
      url,
      root: {
        queryParams
      }
    } = routerState;

    let {root: route} = routerState;

    while (route.firstChild) {
      route = route.firstChild;
    }

    const {params} = route;

    return {url, params, queryParams};
  }
}

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
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    GraphQLModule,
    NgxsModule.forRoot([AuthState, SettingState], {
      developmentMode: !environment.production
    }),
    NgxsReduxDevtoolsPluginModule.forRoot({
      disabled: environment.production
    }),
    NgxsRouterPluginModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    })
  ],
  providers: [{
      provide: RouterStateSerializer,
      useClass: CustomRouterStateSerializer
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
