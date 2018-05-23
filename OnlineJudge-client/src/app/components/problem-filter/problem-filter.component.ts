import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Problem } from '../../models/problem.model';
import { DataService } from '../../services/data.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-problem-filter',
  templateUrl: './problem-filter.component.html',
  styleUrls: ['./problem-filter.component.css']
})
export class ProblemFilterComponent implements OnInit {
  problems: Problem[];
  subscriptionProblems: Subscription;

  constructor(private dataService: DataService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.subscriptionProblems = this.dataService.getProblemByDifficulty(params['difficulty'])
        .subscribe(problems => this.problems = problems);
    })
  }

  ngOnDestroy() {
    this.subscriptionProblems.unsubscribe();
  }

}
