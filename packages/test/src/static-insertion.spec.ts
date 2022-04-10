import { horo } from "@horo/core";

/**
 * @jest-environment jsdom-latest
 */
describe('Static insertion', () => {
    it('Text insertion', () => {
        const staticText = 'hello world';
        const component = horo`
        <div>
            ${staticText}
        </div>
        `;
        const element = document.createElement('div');
        element.appendChild(component.fragment);
        expect(element).toHaveTextContent(staticText);
    });
});
