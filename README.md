# Horo
Micro lib for DOM without virtual DOM.

![Actions CI](https://github.com/lroskoshin/horo/actions/workflows/ci.yml/badge.svg)
[![NPM Version](https://www.npmjs.com/package/@horojs/core)](https://img.shields.io/npm/v/@horojs/core)
![Min Zip](https://img.shields.io/bundlephobia/minzip/@horojs/core)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/a50f4489700e445aa5a9ce63ab1b315d)](https://www.codacy.com/gh/lroskoshin/horo/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=lroskoshin/horo&amp;utm_campaign=Badge_Grade)
![Code Coverage](https://img.shields.io/codecov/c/github/lroskoshin/horo/main)
## The Why
Why not?
## Usage
Horo doesn't have herself own state management, but she has primitive helper `utils/state`, which is a simple event emitter.
And You can use RxJS as before, but you should create you own wrapper for RxJS.
### Simple static insertion
You can insert static value in you template.
You can use horo tempalting:
```typescript
const text = 'hello world'; // horo accepts, for static insertion, only strings or components
const component = horo`
    <div>
        <span>${text}</span>
    </div>
`;
```
Or TSX:
```tsx
const text = 'hello world'; // horo accepts, for static insertion, only strings
const component = (<div>
        <span>{text}</span>
    </div>)
```
### Simple dynamic insertion
Also you can insert dynamic value and interact with this.
You can use horo tempalting:
```typescript
// horo accepts, for dynamic insertion, only Subscriable<string|Component>
const [foo, setFoo] = useState('Hello');
const component = horo`
    <div>
        <span>${foo}</span>
    </div>
`;
setFoo('Wolrd!'); // horo will change the value in the DOM on its own.
```
Or TSX:
```tsx
// horo accepts, for dynamic insertion, only Subscriable<string|Component>
const [foo, setFoo] = useState('Hello');
const component = (<div>
        <span>{foo}</span>
    </div>);
setFoo('Wolrd!'); // horo will change the value in the DOM on its own.
```
### Attributes
Similar to simple inserts, you can manipulate attributes. 
You can use horo tempalting:
```typescript
const [visibility, setVisibility] = useState('show');
const component = horo`
    <p class="${visibility}">
        Hello Wolrd! 
    </p>
`;
setVisibility('hide');
```
Or TSX:
```typescript
const [visibility, setVisibility] = useState('show');
const component = <p class={visibility}> Hello Wolrd!</p>;
setVisibility('hide');
```
### Kinda sorta Components
You can use horo tempalting:
```typescript
import { Observable, ReplaySubject } from 'rxjs';
import { horo, Component } from '@horojs/core';

export function mount(root: Element): void {
    const component = horo`
        <div>
            ${HelloWorldComponent()}
        </div>
    `;
    root.appendChild(component.fragment);
}

function HelloWorldComponent() {
    return horo`
        <span> Hello World! </span>
    `;
}
```
Or TSX:
```tsx
export function mount(root: Element): void {
    const component = (<div>
        <HelloWorldComponent />
    </div>);
    root.appendChild(component.fragment);
}

function HelloWorldComponent() {
    return <span> Hello World! </span>;
}
```
Now you just need to call mount on the root element, as you would with Vue/React/Angular application.
Or any other place you want.

### Event Handling
You can use horo tempalting:
```typescript
const [text, setText] = useState('');
 
const component = horo`
<div>
    <input @input=${(ev: InputEvent) => setText(ev.data as string)}></input>
    <span>${text}</span>
</div
```
Or TSX:
```tsx
const [text, setText] = useState('');
 
const component = (<div>
    <input onInput={(ev: InputEvent) => setText(ev.data)}/>
    <span>{text}</span>
</div)
```
