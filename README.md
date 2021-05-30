# Horo
Micro lib for DOM without virtual DOM.

![Actions CI](https://github.com/lroskoshin/horo/actions/workflows/ci.yml/badge.svg)
[![NPM Version](https://www.npmjs.com/package/horojs)](https://img.shields.io/npm/v/horojs)
![Min Zip](https://img.shields.io/bundlephobia/minzip/horojs)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/a50f4489700e445aa5a9ce63ab1b315d)](https://www.codacy.com/gh/lroskoshin/horo/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=lroskoshin/horo&amp;utm_campaign=Badge_Grade)
![Code Coverage](https://img.shields.io/codecov/c/github/lroskoshin/horo/main)
## The Why
Why not?
## Usage
Horo doesn't have herself own state management. And we should use Horo with other libs for this.
For example, Horo looks good with RxJS.
### Simple static insertion
You can insert static value in you template.
```typescript
const staticHelloWorld = 'hello world'; // horo accepts, for static insertion, only strings
const component = horo`
    <div>
        <span>${staticHelloWorld}</span>
    </div>
`;
```
### Simple dynamic insertion
Also you can insert dynamic value and interact with this.
```typescript
// horo accepts, for dynamic insertion, only Subscriable<string|Component>
// RxJS Subscriable compatibility 
const dynamicHelloWorld = new ReplaySubject<string>();
dynamicHelloWorld.next('Hello '); // Initilize value
const component = horo`
    <div>
        <span>${dynamicHelloWorld}</span>
    </div>
`;
dynamicHelloWorld.next('Wolrd!'); // horo will change the value in the DOM on its own.
```
### Attributes
Similar to simple inserts, you can manipulate attributes. 
```typescript
const visibilityClass = new ReplaySubject<string>();
visibilityClass.next('show');
const component = horo`
    <p class="${visibilityClass}">
        Hello Wolrd! 
    </p>
`;
visibilityClass.next('hide');
```
### Kinda sorta Components
```typescript
import { Observable, ReplaySubject } from 'rxjs';
import { horo, Component } from 'horo';

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
        <span> Hello World! </span>
    `);
    return component;
}
```
Now you just need to call mount on the root element, as you would with Vue/React/Angular application.
Or any other place you want.

### Event Handling
```typescript
const input = new Subject<Event>();
const text = input.pipe(
    map((event: Event): string => {
        return (event as InputEvent).data as string;
    }),
    startWith('hello')
);
const component = horo`
    <div>
        <input @input=${input}></input>
        <span>${text}</span>
    </div>
`;
```
