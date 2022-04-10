import { Component, horo, Subscribable } from "@horojs/core";

export function mount(root: Element): void {
    const component = horo`
        <div>
            ${HelloWorldComponent()}
        </div>
    `;
    root.appendChild(component.fragment);
}

function HelloWorldComponent(): Subscribable<Component> {
    const component = horo`
        <span> Hello World! <span>
    `;

    return (cb) => {
        cb(component);
    };
}
