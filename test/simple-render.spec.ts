/**
 * @jest-environment jsdom
 */
 import { horo } from '../src/horo';
 
 describe('Render', () => {
     it('Simple Render Hello World', () => {
        const component = horo`
        <div>
            hello world
        </div>
        `;
        const element = document.createElement('div');
        element.appendChild(component.fragment);
        expect(element).toHaveTextContent('hello world');
     });
 });
 
