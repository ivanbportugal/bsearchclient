import {Component, Input} from '@angular/core';
import {Result} from './results';

@Component({
  selector: 'Result',
  template: require('./result.html')
})
export class ResultComponent {
  @Input() result: Result;
}
