import { Component, OnInit } from '@angular/core';
import { Problem } from '../../models/problem.model';
import { Subscription } from 'rxjs/Subscription';
import { DataService } from '../../services/data.service';
import { ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-filter-problem',
  templateUrl: './filter-problem.component.html',
  styleUrls: ['./filter-problem.component.css']
})
export class FilterProblemComponent implements OnInit {

  problems: Problem[];
  subscriptionProblems: Subscription;

  constructor(private dataService: DataService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      // this.problems = this.dataService.filterProblems(params['difficulty'])
      this.subscriptionProblems = this.dataService.filterProblems(params['difficulty'])
        .subscribe(problems => this.problems = problems);
    })
  }
}

// getProblems() {
//   // this.problems = this.dataService.getProblems();
//   this.subscriptionProblems = this.dataService.getProblems()
//     .subscribe(problems => this.problems = problems);
// }
