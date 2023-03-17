/**
 * @jest-environment jsdom-latest
 */
import { horo } from '@horojs/core';
import { useState } from '@horojs/state';
import {
    getByTestId,
    fireEvent,
} from '@testing-library/dom';

describe('Event Handling', () => {
    let element: HTMLDivElement;
    
    beforeAll(() => {
        element = document.createElement('div');
        const [text, setText] = useState('');
        const component = horo`
        <div>
            <input @input=${(ev: InputEvent) => {
                setText(ev.data as string);
                console.log('input', ev.data)
            }} data-testid="input"></input>
            <span data-testid="text">${text}</span>
        </div>
        `;
        element.appendChild(component.fragment);
    });

    it('Input "world"', async () => {
        const input = getByTestId(element, 'input') as HTMLInputElement;
        fireEvent(input, new InputEvent('input', {
            data: 'world'
        }));
        expect(element).toHaveTextContent('world');
    });
});
