import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { TabsPage } from './page/tabs/tabs.page';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'main', loadChildren: './page/main/main.module#MainPageModule', canActivate:[AuthGuard ] },
  { path: 'signup', loadChildren: './page/signup/signup.module#SignupPageModule' },
  { path: 'profile', loadChildren: './page/profile/profile.module#ProfilePageModule' },
  // { path: 'tabs', loadChildren: './page/tabs/tabs.module#TabsPageModule' },
  { path: 'profile-pic', loadChildren: './page/profile-pic/profile-pic.module#ProfilePicPageModule' },
  { path: 'tabs', component: TabsPage, children:[
    { path: 'tabs/main', loadChildren: './page/main/main.module#MainPageModule'},
    { path: 'tabs/profile', loadChildren: './page/profile/profile.module#ProfilePageModule' },
    { path: 'tabs/profile-pic', loadChildren: './page/profile-pic/profile-pic.module#ProfilePicPageModule' }
  ] },
  { path: 'update', loadChildren: './page/update/update.module#UpdatePageModule' },
  { path: 'user', loadChildren: './page/user/user.module#UserPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
