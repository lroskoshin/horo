/**
 * @jest-environment jsdom-latest
 */
import { findByTestId } from '@testing-library/dom';
import { parseTemplate } from '../src/parser/parse-template';
describe('Template Parsing', () => {
    it('Simple static parser', async ()=> {
        const element = mount`
        <div data-testid="hello-world">
            Hello World
        </div>
        `;
        const helloWorldItem = await findByTestId(element, 'hello-world');
        expect(helloWorldItem).toHaveTextContent('Hello World'); 
    });
});


function mount(template: TemplateStringsArray): HTMLElement {
    const parsed = parseTemplate(template);
    const element = document.createElement('div');
    element.innerHTML = parsed;
    return element;
} 
