/**
 * @jest-environment jsdom-latest
 */
import { Subject } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { horo } from '../src/horo';
import {
    getByTestId,
    fireEvent,
} from '@testing-library/dom';
 
describe('Event Handling RxJS', () => {
    const input = new Subject<Event>();
    const text = input.pipe(
        map((event: Event): string => {
            return (event as InputEvent).data as string;
        }),
        startWith('hello')
    );
    const element = document.createElement('div');
 
    beforeAll(() => {
        const component = horo`
        <div>
            <input data-event-input=${input} data-testid="input"></input>
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
