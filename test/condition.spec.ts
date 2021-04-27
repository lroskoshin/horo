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
    const checked = new Subject<Event>();
    const text = checked.pipe(
        map((event: Event): string => {
            if((event.target as HTMLInputElement).checked) {
                return 'True';
            } else {
                return 'Flase';
            }
        }),
        startWith('False')
    );
    const element = document.createElement('div');
  
    beforeAll(() => {
        const component = horo`
        <div>
            <input type="checkbox" data-event-click=${checked} data-testid="checkbox"></input>
            <span>${text}</span>
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
 
