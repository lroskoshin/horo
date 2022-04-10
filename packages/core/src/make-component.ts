import { Component, Insertion } from './insertion/insertion';
import { ArrayWithStringIndex, makeItReactive } from './reactivity/make-it-reactive';

export function makeComponent(template: string, insertions: Insertion[]): Component {
    const root = document.createElement('template');
    root.innerHTML = template;
    const unsubscribe = makeItReactive(root.content, insertions as ArrayWithStringIndex<Insertion>);
    return {
        fragment: root.content,
        unsubscribe,
    };
}
