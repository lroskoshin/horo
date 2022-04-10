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
Horo doesn't have herself own state management, but she has primitive helper `utils/state`, which is a simple event emitter.
And You can use RxJS as before, but you should create you own wrapper for RxJS.
### Simple static insertion
You can insert static value in you template.
```typescript
const text = 'hello world'; // horo accepts, for static insertion, only strings
const component = horo`
    <div>
        <span>${text}</span>
    </div>
`;
```
### Simple dynamic insertion
Also you can insert dynamic value and interact with this.
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
### Attributes
Similar to simple inserts, you can manipulate attributes. 
```typescript
const visibility = useState('show');
const component = horo`
    <p class="${visibility}">
        Hello Wolrd! 
    </p>
`;
visibility.next('hide');
```
### Kinda sorta Components
```typescript
import { Observable, ReplaySubject } from 'rxjs';
import { horo, Component } from 'horo';
import { state } from 'horo/utils';

export function mount(root: Element): void {
    const component = horo`
        <div>
            ${HelloWorldComponent()}
        </div>
    `;
    root.appendChild(component.fragment);
}

function HelloWorldComponent() {
    const [component] = useState(horo`
        <span> Hello World! </span>
    `);
    return component;
}
```
Now you just need to call mount on the root element, as you would with Vue/React/Angular application.
Or any other place you want.

### Event Handling
```typescript
const [text, setText] = useState('');
 
const component = horo`
<div>
    <input @input=${(ev: InputEvent) => setText(ev.data as string)} data-testid="input"></input>
    <span>${text}</span>
</div
```
