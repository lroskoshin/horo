import { Observable, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { horo } from '../../src/horo';
import { mergeComponents } from '../../src/utils/merge-components';
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

function HelloWorldComponent(): Observable<Component> {
    const component = new ReplaySubject<Component[]>();
    component.next([
        horo`
            <span> Hello </span>
        `,
        horo`
            <span> World </span>
        `
    ]);
    return component.pipe(
        map(mergeComponents)
    );
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
