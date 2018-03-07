import { Component, OnInit } from '@angular/core';
import { Problem } from '../../models/problem.model';
import { Subscription } from 'rxjs/Subscription';

import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-problem-list',
  templateUrl: './problem-list.component.html',
  styleUrls: ['./problem-list.component.css']
})
export class ProblemListComponent implements OnInit {

  problems: Problem[];
  subscriptionProblems: Subscription;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.getProblems();
  }

  ngOnDestroy() {
    this.subscriptionProblems.unsubscribe();
  }

  getProblems() {
    // this.problems = this.dataService.getProblems();
    this.subscriptionProblems = this.dataService.getProblems()
      .subscribe(problems => this.problems = problems);
  }

}
