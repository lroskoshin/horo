/**
 * @jest-environment jsdom-latest
 */
import { ReplaySubject } from 'rxjs';
import { horo } from '../src/horo';
 
describe('Reactive Insert RxJS', () => {
    const subject1 = new ReplaySubject<string>();
    subject1.next('1');
    const subject2 = new ReplaySubject<string>();
    subject2.next('3');
    const element = document.createElement('div');
 
    beforeAll(() => {
        const component = horo`
        <div>
            ${subject1}
        </div>
        <div>
            ${subject2}
        </div>
        `;
        element.appendChild(component.fragment);
    });
 
    it('Init Text', () => {
        expect(element.firstElementChild).toHaveTextContent('1');
        expect(element.lastElementChild).toHaveTextContent('3');
    });
 
    it('Update Text', () => {
        subject1.next('2');
        subject2.next('4');
        expect(element.firstElementChild).toHaveTextContent('2');
        expect(element.lastElementChild).toHaveTextContent('4');
    });
});
