import { horo } from '../../src/horo';
import { mergeComponents, state } from '../../src/utils';
import { Component } from '../../src/insertion/insertion';

export function mount(root: Element): void {
    const component = horo`
        <div>
            <div data-testid="hello-world">
                ${HelloWorldComponent()}
            </div>
            <div data-testid="foo-bar">
                ${mergeComponents(FooBarStaticComponent())}
            </div>
        </div>
    `;
    root.appendChild(component.fragment);
}

function HelloWorldComponent() {
    const [component] = state(mergeComponents([
        horo`
            <span> Hello </span>
        `,
        horo`
            <span> World </span>
        `
    ]));

    return component;
}

function FooBarStaticComponent(): Component[] {
    return [
        horo`
            <span> Foo </span>
        `,
        horo`
            <span> Bar </span>
        `
    ];
}
