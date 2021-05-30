/**
 * @jest-environment jsdom
 */
 import { getByTestId } from '@testing-library/dom';
import { horo } from '../../src/horo';
import { mergeComponents } from '../../src/utils';
import { mount } from './test-multiple-components';

 describe('Inject component', () => {
    const element = document.createElement('div');
    beforeAll(() => {
        mount(element);
    });

    it('Merge Components', () => {
        const component = mergeComponents([
            horo`
                <span data-testid="foo"> Foo </span>
            `,
            horo`
                <span data-testid="bar"> Bar </span>
            `
        ]);
        const el = document.createElement('div');
        el.appendChild(component.fragment);
        expect(getByTestId(el, 'foo')).toHaveTextContent('Foo');
        expect(getByTestId(el, 'bar')).toHaveTextContent('Bar');
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
