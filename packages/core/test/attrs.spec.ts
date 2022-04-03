/**
 * @jest-environment jsdom-latest
 */
import { getByTestId } from '@testing-library/dom';
import { horo } from '../src/horo';
import { Component } from '../src/insertion/insertion';
import { state } from '../src/utils';

describe('Reactive Insert RxJS', () => {
    let component: Component;
    const [classes, setClasses] = state('foo');

    const stub: jest.Mock<void, []> = jest.fn();
    const newSubscribe = (cb: (v: string) => void) => {
        classes(cb);
        return stub; 
    };

    setClasses('foo');
    const element = document.createElement('div');

    beforeAll(() => {
        component = horo`
            <div data-testid="reactive" class="${newSubscribe}">
                Hello World
            </div>
            <div data-testid="static" class="${'baz'}">
                Hello World
            </div>
        `;
        element.appendChild(component.fragment);
    });

    it('Init Text', () => {
        expect(getByTestId(element, 'reactive')).toHaveClass('foo');
    });

    it('Update Text', () => {
        setClasses('bar');
        expect(getByTestId(element, 'reactive')).toHaveClass('bar');
    });

    it('Static attrs', () => {
        expect(getByTestId(element, 'static')).toHaveClass('baz');
    });

    it('Unsubscribe', () => {
        component.unsubscribe();
        expect(stub).toHaveBeenCalled();
    });
});
