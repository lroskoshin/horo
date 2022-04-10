/**
 * @jest-environment jsdom-latest
 */
import { horo } from '@horo/core';
import { useState } from '@horo/state';
import {
    getByTestId,
    fireEvent,
} from '@testing-library/dom';

describe('Event Handling RxJS', () => {
    const [text, setText] = useState('');
    const element = document.createElement('div');
 
    beforeAll(() => {
        const component = horo`
        <div>
            <input @input=${(ev: InputEvent) => setText(ev.data as string)} data-testid="input"></input>
            <span>${text}</span>
        </div>
        `;
        element.appendChild(component.fragment);
    });

    it('Input "world"', () => {
        const input = getByTestId(element, 'input') as HTMLInputElement;
        fireEvent(input, new InputEvent('input', {
            data: 'world'
        }));
        expect(element).toHaveTextContent('world');
    });
});
