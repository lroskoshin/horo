/**
 * @jest-environment jsdom
 */
 import { getByTestId } from '@testing-library/dom';
import { mount } from './test-multiple-components';

 describe('Inject component', () => {
    const element = document.createElement('div');
    beforeAll(() => {
        mount(element);
    });

    it('Static component insertion', () => {
        const HelloWordl = getByTestId(element, 'hello-world');
        expect(HelloWordl.children[0]).toHaveTextContent('Hello');
        expect(HelloWordl.children[1]).toHaveTextContent('World');
    });

    it('Dynamic component insertion', () => {
        const fooBarDiv = getByTestId(element, 'foo-bar');
        expect(fooBarDiv.children[0]).toHaveTextContent('Foo');
        expect(fooBarDiv.children[1]).toHaveTextContent('Bar');
    });
});
