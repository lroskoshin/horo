import { Instertions } from '../insertions/insertions';
import { joiner } from './joiner';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function parseTemplate(template: TemplateStringsArray, insertions: Instertions[]): DocumentFragment {
    const root = document.createElement('template');
    root.innerHTML = joiner(template);
    return root.content;
}
