/**
 * @jest-environment jsdom-latest
 */

import { Component, horo } from "@horo/core";
import { useState } from "@horo/state";

describe('Reactive Insert RxJS', () => {
    let component: Component;
    const [subject, setSubject] = useState('1');

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
