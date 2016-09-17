import {
  Component,
  Input,
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
  providers: [HTTP_PROVIDERS]
})
export class Results {
  public results: Result[];
  public result: Result;
  public err: string;
  public timer;
  public visibleResults: Result[];
  private queryValue: string;

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
      this.highlightResult(this.results[i], this.queryValue);
      this.visibleResults.push(this.results[i]);
    }
  }

  highlightResult(result: any, query: string) {
    var commaSep = query.split(',');
    for (var i = 0; i < commaSep.length; ++i) {
      var reg = new RegExp(commaSep[i], "gi");
      result.verse = result.verse.replace(reg, '<span class="highlighted">' + commaSep[i] + '</span>');
    }
  }

  search(query: string) {
    this.queryValue = query;
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
          err => {
            self.err = 'There is a problem getting data right now. Retrying...';
            setTimeout(function() {
              self.search(query);
            }, 300);
          },
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
