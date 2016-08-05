/// <reference path="../../../../../typings/index.d.ts"/>

import 'reflect-metadata';
import 'zone.js/dist/zone';
import 'zone.js/dist/async-test';
import {Results} from './results';
import {inject, async, TestComponentBuilder, ComponentFixture} from '@angular/core/testing';

describe('results component', () => {
  it('should render...', async(inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
    tcb.createAsync(results)
      .then((fixture: ComponentFixture<any>) => {
        fixture.detectChanges();
      });
  })));
});
