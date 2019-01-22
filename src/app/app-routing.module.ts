import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DictDetailComponent } from './dict-detail/dict-detail.component';
import { DictsComponent } from './dicts/dicts.component';

const routes: Routes = [
  { path: '', redirectTo: '/dicts', pathMatch: 'full'},
  { path: 'dicts', component: DictsComponent},
  { path: 'detail/:id', component: DictDetailComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
