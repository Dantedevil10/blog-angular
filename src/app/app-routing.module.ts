import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PostcontentComponent } from './pages/postcontent/postcontent.component';

const routes: Routes = [
  {path : "post/:id", component : PostcontentComponent},
  {path : "**" , component : HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
