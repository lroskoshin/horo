/**
 * @jest-environment jsdom-latest
 */
import { ReplaySubject, Subscription } from 'rxjs';
import { horo } from '../src/horo';
import { Component } from '../src/insertions/insertions';

describe('Reactive Insert RxJS', () => {
    let component: Component;
    const subject = new ReplaySubject<string>();

    let spy: jasmine.Spy;
    const originalSubscribe = subject.subscribe.bind(subject);
    const newSubscribe = (...args: any[]): Subscription => {
        const subscription = originalSubscribe(...args);
        spy = spyOn(subscription, 'unsubscribe');
        return subscription; 
    };
    subject.subscribe = newSubscribe;
    subject.next('1');
    const element = document.createElement('div');

    beforeAll(() => {
        component = horo`
        <div>
            ${subject}
        </div>
        `;
        element.appendChild(component.fragment);
    });

    it('Init Text', () => {
        expect(element).toHaveTextContent('1');
    });

    it('Update Text', () => {
        subject.next('2');
        expect(element).toHaveTextContent('2');
    });

    it('Unsubscribe', () => {
        component.unsubscribe();
        expect(spy).toHaveBeenCalled();
    });
});
