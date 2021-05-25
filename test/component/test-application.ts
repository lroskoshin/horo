import { Observable, ReplaySubject } from 'rxjs';
import { horo } from '../../src/horo';
import { Component } from '../../src/insertion/insertion';

export function mount(root: Element): void {
    const component = horo`
        <div>
            ${HelloWorldComponent()}
        </div>
    `;
    root.appendChild(component.fragment);
}

function HelloWorldComponent(): Observable<Component> {
    const component = new ReplaySubject<Component>();
    component.next(horo`
        <span> Hello World! <span>
    `);
    return component;
}
