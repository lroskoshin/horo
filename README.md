# Horo

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/4a0a4d4efbd845bf9c29fb7f1a429272)](https://app.codacy.com/gh/lroskoshin/horo?utm_source=github.com&utm_medium=referral&utm_content=lroskoshin/horo&utm_campaign=Badge_Grade_Settings)

Micro lib for DOM without virtual DOM.

![Actions CI](https://github.com/lroskoshin/horo/actions/workflows/ci.yml/badge.svg)
![NPM Version](https://img.shields.io/npm/v/horojs)
![Min Zip](https://img.shields.io/bundlephobia/minzip/horojs)
## The Why
Why not?
## Usage
Horo doesn't have herself own state management. And we should use Horo with other libs for this.
For example, Horo looks good with RxJS.
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
        <span> Hello World! <span>
    `);
    return component;
}
```
Now you just need to call mount on the root element, as you would with Vue/React/Angular application.
Or any other place you want. Why not?

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
        <input data-event-input=${input} data-testid="input"></input>
        <span>${text}</span>
    </div>
`;
```

