# horo
![Actions CI](https://github.com/lroskoshin/horo/actions/workflows/ci.yml/badge.svg)
## The Why
Why not?
## Usage
Horo doesn't have herself own state management. And we should use Horo with other libs for this.
For example, Horo looks good with RxJS.
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
