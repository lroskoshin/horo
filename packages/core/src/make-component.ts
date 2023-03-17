import { Component, Insertion } from './insertion/insertion';
import { ArrayWithStringIndex, makeItReactive } from './reactivity/make-it-reactive';

type Dep = () => Component | string;
const templateBank = new WeakMap<Dep, HTMLTemplateElement>();

export function makeComponent(template: string, insertions: Insertion[], dep?: Dep): Component {
    const fragment = getTemplate(template, dep);
    const addressWithUnsubscribe = makeItReactive(fragment, insertions as ArrayWithStringIndex<Insertion>);
    return {
        fragment,
        ...addressWithUnsubscribe,
    };
}

function getTemplate(template: string, dep?: Dep): Node {
    if(dep && templateBank.has(dep)) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return templateBank.get(dep)!.content.cloneNode();
    } else {
        const root = document.createElement('template');
        root.innerHTML = template;
        if(!dep) {
            return root.content;
        } else {
            templateBank.set(dep, root);
            return root.content.cloneNode();
        }
    }
}
