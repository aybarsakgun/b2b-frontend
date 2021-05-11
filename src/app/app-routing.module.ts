import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'product',
    loadChildren: () => import('./modules/product/product.module').then(module => module.ProductModule)
  },
  // {
  //   path: 'auth',
  //   loadChildren: () => import('./modules/auth/auth.module').then(module => module.AuthModule)
  // },
  // {
  //   path: '**',
  //   component: NotFoundComponent
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
