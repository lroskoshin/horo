/**
 * @jest-environment jsdom-latest
 */
 import {
     getByTestId,
     fireEvent,
 } from '@testing-library/dom';

import { useState } from '@horo/state'
import { horo } from '@horo/core'
  
 describe('Event Handling RxJS', () => {
    const [checked, setChecked] = useState('False');
    let current: string;
    checked((v) => current = v);
    const element = document.createElement('div');
    const check = () => setChecked(current === 'False' ? 'True' : 'False');
  
    beforeAll(() => {
        const component = horo`
        <div>
            <input type="checkbox" @click=${check} data-testid="checkbox"></input>
            <span>${checked}</span>
        </div>
        `;
        element.appendChild(component.fragment);
    });

    it('check checkbox', () => {
        const checkbox = getByTestId(element, 'checkbox') as HTMLInputElement;
        expect(element).toHaveTextContent('False');
        fireEvent.click(checkbox);
        expect(element).toHaveTextContent('True');
    });
 });
 
