/**
 * @jest-environment jsdom-latest
 */
import { horo } from '@horojs/core';
import {
    getByTestId,
    fireEvent,
} from '@testing-library/dom';

describe('Event Handling RxJS', () => {
    let listner: (v: string) => void;
    const input = (ev: InputEvent) => {
        listner(ev.data as string);
    };
    const text = (cb: (v: string) => void) => {
        listner = cb;
        return () => {};
    };
    const element = document.createElement('div');
 
    beforeAll(() => {
        const component = horo`
        <div>
            <input @input=${input} data-testid="input"></input>
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
