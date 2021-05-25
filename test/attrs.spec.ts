/**
 * @jest-environment jsdom-latest
 */
import { getByTestId } from '@testing-library/dom';
import { ReplaySubject, Subscription } from 'rxjs';
import { horo } from '../src/horo';
import { Component } from '../src/insertion/insertion';

describe('Reactive Insert RxJS', () => {
    let component: Component;
    const classSubject = new ReplaySubject<string>();

    let spy: jasmine.Spy;
    const originalSubscribe = classSubject.subscribe.bind(classSubject);
    const newSubscribe = (...args: never[]): Subscription => {
        const subscription = originalSubscribe(...args);
        spy = spyOn(subscription, 'unsubscribe');
        return subscription; 
    };

    classSubject.subscribe = newSubscribe;
    classSubject.next('foo');
    const element = document.createElement('div');

    beforeAll(() => {
        component = horo`
            <div data-testid="reactive" class="${classSubject}">
                Hello World
            </div>
            <div data-testid="static" class="${'baz'}">
                Hello World
            </div>
        `;
        element.appendChild(component.fragment);
    });

    it('Init Text', () => {
        expect(getByTestId(element, 'reactive')).toHaveClass('foo');
    });

    it('Update Text', () => {
        classSubject.next('bar');
        expect(getByTestId(element, 'reactive')).toHaveClass('bar');
    });

    it('Static attrs', () => {
        expect(getByTestId(element, 'static')).toHaveClass('baz');
    });

    it('Unsubscribe', () => {
        component.unsubscribe();
        expect(spy).toHaveBeenCalled();
    });
});
