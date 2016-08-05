import {Component} from '@angular/core';
import {Http, HTTP_PROVIDERS} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import {ResultComponent} from './result';

export class Result {
  constructor(
    public book: string,
    public reference: string,
    public verse: string
  ) {}
}

@Component({
  selector: 'Results',
  template: require('./results.html'),
  directives: [ResultComponent],
  providers: [HTTP_PROVIDERS]
})
export class Results {
  public results: Result[];
  public result: Result;
  public err: string;

  constructor(public http: Http) {
    // this.getResults().subscribe(newResult => this.results = newResult);
  }

  // getResults(): Observable<Result[]> {
  //   return this.http
  //     .get('app/results/sampleResults.json')
  //     .map(response => response.json());
  // }

  search(query: string) {
    if(!query) { return; }
    return this.http
      .post('/search?query=' + query, {}, {})
      .map(response => response.json())
      .subscribe(
        data => this.results = data,
        err => this.err = err,
        () => this.err = null
      );
  }
}
