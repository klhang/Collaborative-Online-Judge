import { Routes, RouterModule } from '@angular/router';
import { ProblemListComponent } from './components/problem-list/problem-list.component';
import { ProblemDetailComponent } from './components/problem-detail/problem-detail.component';
import { FilterProblemComponent } from './components/filter-problem/filter-problem.component';
import { NewProblemComponent } from './components/new-problem/new-problem.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'problems',
    pathMatch: 'full'
  },
  {
    path: 'problems',
    component: ProblemListComponent
  },
  {
    path: 'problems/:id',
    component: ProblemDetailComponent
  },
  {
    path: 'filter/:difficulty',
    component: FilterProblemComponent
  },
  {
    path: 'new',
    component: NewProblemComponent
  },
  {
    path: '**',
    redirectTo: 'problems'
  }
]
export const routing = RouterModule.forRoot(routes);
