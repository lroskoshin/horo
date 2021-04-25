/**
 * @jest-environment jsdom
 */
import { ReplaySubject } from 'rxjs';
import { horo } from '../src/horo';

describe('Reactive Insert RxJS', () => {
    const subject = new ReplaySubject<string>();
    subject.next('1');
    const element = document.createElement('div');

    beforeAll(() => {
        const fragment = horo`
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
