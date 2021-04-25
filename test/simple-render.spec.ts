/**
 * @jest-environment jsdom
 */
 import { horo } from '../src/horo';
 
 describe('Render', () => {
     it('Simple Render Hello World', () => {
        const fragment = horo`
        <div>
            hello world
        </div>
        `;
        const element = document.createElement('div');
        element.appendChild(fragment);
        expect(element).toHaveTextContent('hello world');
     });
 });
 
