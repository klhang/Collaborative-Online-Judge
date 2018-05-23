import { Routes, RouterModule } from '@angular/router';
import { ProblemListComponent } from './components/problem-list/problem-list.component';
import { ProblemDetailComponent } from './components/problem-detail/problem-detail.component';
import { NewProblemComponent } from './components/new-problem/new-problem.component';
import { ProblemFilterComponent } from './components/problem-filter/problem-filter.component';

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
    path: 'problemsFilter/:difficulty',
    component: ProblemFilterComponent
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
