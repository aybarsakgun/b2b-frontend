import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {GraphQLModule} from './graphql.module';
import {HttpClientModule} from '@angular/common/http';
import {HeaderComponent} from './layouts/main/header/header.component';
import {FooterComponent} from './layouts/main/footer/footer.component';
import {HomeComponent} from './components/home/home.component';
import {AppRoutingModule} from './app-routing.module';
import {ProductListEffects} from './store/effects/product-list.effects';
import {AppReducers} from './store';
import {ProductService} from './modules/product/product.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot(AppReducers, {}),
    EffectsModule.forRoot([ProductListEffects]),
    GraphQLModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
