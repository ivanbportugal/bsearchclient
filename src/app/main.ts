import {Component} from '@angular/core';
import {Header} from './header';
import {Title} from './title';
import {Results} from './results/results';
import {Footer} from './footer';

@Component({
  selector: 'App',
  template: require('./main.html'),
  directives: [Header, Title, Results, Footer]
})
export class Main {}
