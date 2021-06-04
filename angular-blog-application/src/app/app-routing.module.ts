import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogsDetailsComponent } from './blogs-details/blogs-details.component';
import { BlogsFormComponent } from './blogs-form/blogs-form.component';
import { BlogsListComponent } from './blogs-list/blogs-list.component';

const routes: Routes = [
  { path:'', component: BlogsListComponent },
  { path:'blogsList', component: BlogsListComponent},
  { path:'blogsForm', component: BlogsFormComponent },
  { path:'blogsDetails/:id', component: BlogsDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
