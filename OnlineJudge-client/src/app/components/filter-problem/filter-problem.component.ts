import { Component, OnInit } from '@angular/core';
import { Problem } from '../../models/problem.model';
import { DataService } from '../../services/data.service';
import { ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-filter-problem',
  templateUrl: './filter-problem.component.html',
  styleUrls: ['./filter-problem.component.css']
})
export class FilterProblemComponent implements OnInit {

  problems: Problem[];

  constructor(private dataService: DataService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.problems = this.dataService.filterProblems(params['difficulty'])
    })
  }
}
