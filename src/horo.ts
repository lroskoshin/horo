import { insertValue } from './insert-value';
import { Component, Instertions } from './insertions/insertions';
import { joiner } from './joiner';
import { listenEvent } from './listen-event';

export function horo(template: TemplateStringsArray, ...insertions: Instertions[]): Component {
    const root = document.createElement('template');
    root.innerHTML = joiner(template);
    insertValue(root.content, insertions);
    listenEvent(root.content, insertions);
    return {
        delete: () => {
            console.log('delete');
        },
        fragment: root.content,
    };
}
