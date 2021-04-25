import { insertReactiveNode } from './insert-reactie-node';
import { Instertions } from './insertions';
import { joiner } from './joiner';
import { listenEvent } from './listen-event';

export function horo(template: TemplateStringsArray, ...inserts: Instertions[]): DocumentFragment {
    const root = document.createElement('template');
    root.innerHTML = joiner(template);
    insertReactiveNode(root.content, inserts);
    listenEvent(root.content, inserts);
    return root.content;
}
