import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from './layouts/main/main.component';
import {HomeComponent} from './modules/home/home.component';
import {AuthComponent} from './layouts/auth/auth.component';
import {NotFoundComponent} from './layouts/not-found/not-found.component';
import {UnauthorizedGuard} from './guards/unauthorized-guard.service';
import {AuthorizedGuard} from './guards/authorized-guard.service';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [
      AuthorizedGuard
    ],
    runGuardsAndResolvers: 'always',
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'product',
        loadChildren: () => import('./modules/product/product.module').then(module => module.ProductModule)
      },
      {
        path: 'cart',
        loadChildren: () => import('./modules/cart/cart.module').then(module => module.CartModule)
      }
    ]
  },
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'auth',
        canActivate: [
          UnauthorizedGuard
        ],
        runGuardsAndResolvers: 'always',
        loadChildren: () => import('./modules/auth/auth.module').then(module => module.AuthModule)
      }
    ]
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
