import { MasterService, ValueService } from './demo';
import { fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';

// testing services:
// (2.1) setup the service and satisfy the TS with TestBed.configureTestingModule({..})
// (2.2) inject the service in the test
// (2.3) use waitForAsync() or fakeAsync() pattern for testing promises or observables

// (2.4.0) When testing a service with a dependency, create a spy and provide it in the providers array
// (2.4.1) inject the service under test and the mock dependency
// (2.4.2) stub the external service's return value, and exercise the main service under test

/*
The TestBed creates a dynamically-constructed Angular test module that emulates an Angular @NgModule.
We use the TestBed to provide and create services

in Angular apps you use the provider’s token in the class constructor to inject a service,
in tests, the injection is done differently;  use the TestBed.inject() method in the setup to inject the service
*/

describe('Testing Services Using TestBed', () => {
  describe('Testing a service: (2.1) setup the service, (2.2) inject the service to the setup', () => {
    let valueService: ValueService;

    beforeEach(() => {
      // (2.1) setup the service
      TestBed.configureTestingModule({
        providers: [ValueService], // the service still has to be in providers
      });
      // (2.2) inject the service to the setup
      valueService = TestBed.inject(ValueService);
    });

    it('synchronous: should use ValueService getValue()', () => {
      expect(valueService.getValue()).toBe('real value');
    });

    // (2.3) use waitForAsync() or fakeAsync() pattern for testing promises or observables
    describe('(2.3) use waitForAsync() or fakeAsync() pattern for testing promises or observables', () => {
      describe('waitForAsync()', () => {
        it(
          'waitForAsync() : ValueService.getPromiseValue',
          waitForAsync(() => {
            valueService
              .getPromiseValue()
              .then((value) => expect(value).toBe('promise value'));
          })
        );

        it(
          'waitForAsync() : ValueService.getObservableValue',
          waitForAsync(() => {
            valueService
              .getObservableValue()
              .subscribe((value) => expect(value).toBe('observable value'));
          })
        );

        it(
          'waitForAsync() : ValueService.getObservableDelayValue',
          waitForAsync(() => {
            valueService
              .getObservableDelayValue()
              .subscribe((value) => expect(value).toBe('observable delay value'));
          })
        );
      });

      describe('fakeAsync()', () => {

        it('fakeAsync() : Value.getPromiseValue ', fakeAsync(() => {
          let value: any;
          valueService.getPromiseValue().then((val) => (value = val));
          tick(); // Trigger JS engine cycle until all promises resolve.
          expect(value).toBe('promise value');
        }));

        it('fakeAsync() : Value.getObservableValue. KEY: using tick() for control ', fakeAsync(() => {
          let value: any;
          valueService.getObservableValue().subscribe((val) => (value = val));
          tick(); // Trigger JS engine cycle until all promises resolve.
          expect(value).toBe('observable value');
        }));

        it('fakeAsync() : Value.getObservableDelayValue. KEY: tick(ms) by the delay amount ', fakeAsync(() => {
          let value: any;
          valueService.getObservableDelayValue().subscribe((val) => (value = val));
          tick(10); // Trigger JS engine cycle until all promises resolve.
          expect(value).toBe('observable delay value');
        }));
      });

      it('done() : Almost never use done() over fakeAsync() or waitForAsync()  . ValueService.getObservableDelayValue', (done) => {
        valueService.getObservableDelayValue().subscribe((value) => {
          expect(value).toBe('observable delay value');
          done();
        });
      });

    });
  });
});
