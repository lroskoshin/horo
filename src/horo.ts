import { Component, Instertion } from './insertion/insertion';
import { ArrayWithStringIndex, makeItReactive } from './reactivity/make-it-reactive';
import { parseTemplate } from './parser/parse-template';

export function horo(template: TemplateStringsArray, ...insertions: Instertion[]): Component {
    const fragment = parseTemplate(template, insertions);
    const unsubscribe = makeItReactive(fragment, insertions as ArrayWithStringIndex<Instertion>);
    return {
        fragment,
        unsubscribe,
    };
}
