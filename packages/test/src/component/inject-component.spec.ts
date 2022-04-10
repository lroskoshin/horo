/**
 * @jest-environment jsdom
 */
import { mount } from './test-application';

describe('Inject component', () => {
    const element = document.createElement('div');
    beforeAll(() => {
        mount(element);
    });

    it('Dynamic component insertion', () => {
        expect(element).toHaveTextContent('Hello World');
    });
});
