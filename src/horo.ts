import { insertReactiveNode } from './insert-reactie-node';
import { Instertions } from './insertions';
import { joiner } from './joiner';
import { listenEvent } from './listen-event';

export function horo(template: TemplateStringsArray, ...insertions: Instertions[]): DocumentFragment {
    const root = document.createElement('template');
    root.innerHTML = joiner(template);
    insertReactiveNode(root.content, insertions);
    listenEvent(root.content, insertions);
    return root.content;
}
