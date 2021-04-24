/**
 * @jest-environment jsdom
 */
 import { h } from '../src';
 
 describe('Render', () => {
     it('Simple Render Hello World', () => {
        const fragment = h`
        <div>
            hello world
        </div>
        `;
        const element = document.createElement('div');
        element.appendChild(fragment);
        expect(element).toHaveTextContent('hello world');
     });
 });
 
