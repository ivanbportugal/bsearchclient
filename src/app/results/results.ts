import {
  Component,
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/core';
import { InfiniteScroll } from 'angular2-infinite-scroll';
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
  directives: [ResultComponent, InfiniteScroll],
  providers: [HTTP_PROVIDERS],
  animations: [
    trigger('flyInOut', [
      state('in', style({transform: 'translateX(0)'})),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateX(-100%)'
        }),
        animate('0.2s ease-in')
      ]),
      transition('* => void', [
        animate('0.2s 10 ease-out', style({
          opacity: 0,
          transform: 'translateX(100%)'
        }))
      ])
    ])
  ]
})
export class Results {
  public results: Result[];
  public result: Result;
  public err: string;
  public timer;
  public visibleResults: Result[];

  constructor(public http: Http) {
    this.results = [];
    this.visibleResults = [];

    // this.getResults().subscribe(newResult => {
    //   this.results = newResult;
    //   this.onScroll();
    // });
  }

  // getResults(): Observable<Result[]> {
  //   return this.http
  //     .get('app/results/sampleResults.json')
  //     .map(response => response.json());
  // }

  onScroll() {
    var page = 10;
    var distanceToTheEnd = (this.results.length - this.visibleResults.length);
    if (distanceToTheEnd < page) {
      page = distanceToTheEnd;
    }

    var indexTo = this.visibleResults.length + page;
    for (var i = this.visibleResults.length; i < indexTo; i++) {
      this.visibleResults.push(this.results[i]);
    }
  }

  search(query: string) {
    // would yield too many results
    if (!query || query.length < 2) {
      this.results = [];
      this.visibleResults = [];
      return;
    }

    var self = this;
    clearTimeout(this.timer);
    this.timer = setTimeout(function() {
      return self.http
        .post('/search?query=' + query, {}, {})
        .map(response => response.json())
        .subscribe(
          data => {
            self.results = data;
            self.visibleResults = [];
            self.onScroll();
          },
          err => self.err = 'There is a problem getting data right now, please try again later.',
          () => self.err = null
        );
     }, 200);
  }

  getStyle(number) {
    if (number == 0) {
      return '#777';
    } else if (number > 0 && number <= 20) {
      return 'green';
    } else if (number > 20 && number <= 70) {
      return 'orange';
    } else {
      return 'red';
    }
  }
}
