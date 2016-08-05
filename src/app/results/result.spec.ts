/// <reference path="../../../typings/index.d.ts"/>

import 'reflect-metadata';
import 'zone.js/dist/zone';
import 'zone.js/dist/async-test';
import {Result} from './result';
import {inject, async, TestComponentBuilder, ComponentFixture} from '@angular/core/testing';

describe('result component', () => {
  it('should render...', async(inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
    tcb.createAsync(result)
      .then((fixture: ComponentFixture<any>) => {
        fixture.detectChanges();
      });
  })));
});
