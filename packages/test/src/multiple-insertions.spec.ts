/**
 * @jest-environment jsdom-latest
 */

import { horo } from "@horojs/core";
import { useState } from "@horojs/state";

 
describe('Reactive Insert RxJS', () => {
    const [subject1, setSubject1] = useState('1');
    const [subject2, setSubject2] = useState('3');
    const element = document.createElement('div');
 
    beforeAll(() => {
        const component = horo`
        <div>
            ${subject1}
        </div>
        <div>
            ${subject2}
        </div>
        `;
        element.appendChild(component.fragment);
    });
 
    it('Init Text', () => {
        expect(element.firstElementChild).toHaveTextContent('1');
        expect(element.lastElementChild).toHaveTextContent('3');
    });
 
    it('Update Text', () => {
        setSubject1('2');
        setSubject2('4');
        expect(element.firstElementChild).toHaveTextContent('2');
        expect(element.lastElementChild).toHaveTextContent('4');
    });
});
