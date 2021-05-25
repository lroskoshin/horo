import { Observable, ReplaySubject } from 'rxjs';
import { horo } from '../../src/horo';
import { Component } from '../../src/insertion/insertion';

export function mount(root: Element): void {
    const component = horo`
        <div>
            <div data-testid="hello-world">
                ${HelloWorldComponent()}
            </div>
            <div data-testid="foo-bar">
                ${FooBarStaticComponent()}
            </div>
        </div>
    `;
    root.appendChild(component.fragment);
}

function HelloWorldComponent(): Observable<Component[]> {
    const component = new ReplaySubject<Component[]>();
    component.next([
        horo`
            <span> Hello </span>
        `,
        horo`
            <span> World </span>
        `
    ]);
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
