import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Problem } from '../../models/problem.model';


const DEFAULT_PROBLEM: Problem = Object.freeze({
  id: 0,
  name: '',
  desc: '',
  difficulty: 'easy'
})



@Component({
  selector: 'app-new-problem',
  templateUrl: './new-problem.component.html',
  styleUrls: ['./new-problem.component.css']
})
export class NewProblemComponent implements OnInit {

  newProblem: Problem = Object.assign({}, DEFAULT_PROBLEM);
  difficulties: string[] = ['easy', 'medium', 'hard', 'super'];


  constructor(private dataService: DataService) { }

  ngOnInit() {
  }

  addProblem() {
    this.dataService.addProblme(this.newProblem);
    this.newProblem = Object.assign({}, DEFAULT_PROBLEM);
  }

}