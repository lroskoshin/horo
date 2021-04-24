/**
 * @jest-environment jsdom
 */
import { ReplaySubject } from 'rxjs';
import { h } from '../src';

describe('Reactive Insert RxJS', () => {
    const subject = new ReplaySubject<string>();
    subject.next('1');
    const element = document.createElement('div');

    beforeAll(() => {
        const fragment = h`
        <div>
            ${subject}
        </div>
        `;
        element.appendChild(fragment);
    });

    it('Init Text', () => {
        expect(element).toHaveTextContent('1');
    });

    it('Update Text', () => {
        subject.next('2');
        expect(element).toHaveTextContent('2');
    });
});
