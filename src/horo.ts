import { insertValue } from './insertions/insert-value';
import { Component, Instertions } from './insertions/insertions';
import { listenEvent } from './listen-event';
import { parseTemplate } from './parser/parse-template';

export function horo(template: TemplateStringsArray, ...insertions: Instertions[]): Component {
    const root = parseTemplate(template, insertions);
    insertValue(root, insertions);
    listenEvent(root, insertions);
    return {
        fragment: root,
        delete: () => {
            console.log('delete');
        },
    };
}
