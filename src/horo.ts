import { insertValue } from './insertions/insert-value';
import { Component, Instertions } from './insertions/insertions';
import { listenEvent } from './listen-event';
import { parseTemplate } from './parser/parse-template';

export function horo(template: TemplateStringsArray, ...insertions: Instertions[]): Component {
    const root = parseTemplate(template, insertions);
    const unsubscribeReactiveValues = insertValue(root, insertions);
    const unsubscribeEventHandler = listenEvent(root, insertions);
    return {
        fragment: root,
        unsubscribe: () => {
            unsubscribeEventHandler();
            unsubscribeReactiveValues();
        }
    };
}
