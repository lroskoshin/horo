import { Component } from './insertion/insertion';

export function mergeComponents(components: Component[]): Component {
    const root = document.createDocumentFragment();
    root.append(...components.map((component: Component) => component.fragment));
    return {
        fragment: root,
        unsubscribe: () => components.forEach((component: Component) => component.unsubscribe())
    };
}
