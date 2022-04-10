import { Component, horo, mergeComponents } from "@horo/core";
import { useState } from "@horo/state";

export function mount(root: Element): void {
    const component = horo`
        <div>
            <div data-testid="hello-world">
                ${HelloWorldComponent()}
            </div>
            <div data-testid="foo-bar">
                ${mergeComponents(FooBarStaticComponent())}
            </div>
            <div data-testid="empty-list">${EmptyList()}</div>
        </div>
    `;
    root.appendChild(component.fragment);
}

function HelloWorldComponent() {
    const [component] = useState(mergeComponents([
        horo`
            <span> Hello </span>
        `,
        horo`
            <span> World </span>
        `
    ]));

    return component;
}

function EmptyList() {
    return mergeComponents([]);
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
