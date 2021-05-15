/**
 * @jest-environment jsdom-latest
 */
import { ReplaySubject } from 'rxjs';
import { horo } from '../src/horo';
import { Component } from '../src/insertions/insertions';

describe('Reactive Insert RxJS', () => {
    let component: Component;
    const subject = new ReplaySubject<string>();
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
        const spy = spyOn(subject, 'unsubscribe');
        component.unsubscribe();
        expect(spy).toHaveBeenCalled();
    });
});
