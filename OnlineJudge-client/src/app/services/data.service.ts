import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Problem } from '../models/problem.model';

@Injectable()
export class DataService {
  private _problemSource = new BehaviorSubject<Problem[]>([]);
  private _problemsByDifficulty = new BehaviorSubject<Problem[]>([]);

  constructor(private httpClient: HttpClient) {}

  getProblems(): Observable<Problem[]> {
    this.httpClient.get('api/v1/problems')
      .toPromise()
      .then((res:any) => {
        this._problemSource.next(res);
      })
      .catch(this.handleError);
    return this._problemSource.asObservable();
  }

  getProblem(id: number): Promise<Problem> {
    return this.httpClient.get(`api/v1/problems/${id}`)
      .toPromise()
      .then((res:any) => res)
      .catch(this.handleError);
  }

  getProblemByDifficulty(difficulty : String): Observable<Problem[]> {
    //return this.problems.filter( (problem) => problem.difficulty === difficulty);
      this.httpClient.get(`api/v1/problemsByDifficulty/${difficulty}`)
        .toPromise()
        .then((res: any) => {
          this._problemsByDifficulty.next(res);
        })
        .catch(this.handleError);

       return this._problemsByDifficulty.asObservable();
  }


  addProblem(problem: Problem) {
    //define the content-Type in http request header
    // Content-Type declears the body type when you issue a POST request
     const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json'})};
     return this.httpClient.post('api/v1/problems', problem, options)
       .toPromise()
       .then((res: any) => {
         this.getProblems();

         return res;
       })
       .catch(this.handleError);
   }

    buildAndRun(data) : Promise<any> {
      //define the content-Type in http request header
      // Content-Type declears the body type when you issue a POST request
      const options = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
      return this.httpClient.post('api/v1/build_and_run', data, options)
        .toPromise() // convert observable to promise
        .then(res => {
          console.log(res);
          return res;
        })
        .catch(this.handleError);
    }

  private handleError(error: any): Promise<any> {
    console.error('an error occured', error)
    return Promise.reject(error.body || error);
  }
}
