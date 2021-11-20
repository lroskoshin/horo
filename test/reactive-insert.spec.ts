/**
 * @jest-environment jsdom-latest
 */
import { horo } from '../src/horo';
import { Component } from '../src/insertion/insertion';
import { state } from '../src/utils';

describe('Reactive Insert RxJS', () => {
    let component: Component;
    const [subject, setSubject] = state('1');

    const stub = jest.fn();
    const newSubscribe = (cb: (v: string) => void) => {
        subject(cb);
        return stub; 
    };
    const element = document.createElement('div');

    beforeAll(() => {
        component = horo`
        <div>
            ${newSubscribe}
        </div>
        `;
        element.appendChild(component.fragment);
    });

    it('Init Text', () => {
        expect(element).toHaveTextContent('1');
    });

    it('Update Text', () => {
        setSubject('2');
        expect(element).toHaveTextContent('2');
    });

    it('Unsubscribe', () => {
        component.unsubscribe();
        expect(stub).toHaveBeenCalled();
    });
});
