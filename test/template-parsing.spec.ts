/**
 * @jest-environment jsdom-latest
 */
import { findByTestId } from '@testing-library/dom';
import { Instertions } from '../src/index';
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


function mount(template: TemplateStringsArray, ...insertions: Instertions[]): HTMLElement {
    const parsed = parseTemplate(template, insertions);
    const element = document.createElement('div');
    element.appendChild(parsed);
    return element;
} 
