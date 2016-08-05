import {Component} from '@angular/core';
import {Result} from './results';

@Component({
  selector: 'result',
  template: require('./result.html')
})
export class ResultComponent {
  public result: Result;
}
