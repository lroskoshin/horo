/**
 * @jest-environment jsdom
 */
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { h } from '../src';
import '@testing-library/jest-dom/extend-expect';
import {
    getByTestId,
    fireEvent,
} from '@testing-library/dom';
 
describe('Event Handling RxJS', () => {
    const subject = new Subject<Event>();
    const element = document.createElement('div');
 
    beforeAll(() => {
        const fragment = h`
        <div>
            <input data-event-input=${subject} data-testid="input"></input>
            <div>${subject.pipe(
                map((event: Event): string => {
                    return (event as InputEvent).data as string;
                })
            )}</div>
        </div>
        `;
        element.appendChild(fragment);
    });

    it('Input', () => {
        const input = getByTestId(element, 'input') as HTMLInputElement;
        fireEvent(input, new InputEvent('input', {
            data: 'hello'
        }));
        expect(element).toHaveTextContent('hello');
    });
});
