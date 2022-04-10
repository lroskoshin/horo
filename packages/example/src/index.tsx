import { Component } from "@horojs/core";
import { useState, State } from "@horojs/state"
import '@horojs/types'

function HelloWorld({foo}: {foo: State<string>}): Component {
    return <>
        <h2>{foo}</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos quidem earum necessitatibus quis, quo commodi voluptas numquam mollitia esse, ea repudiandae ducimus, quae dolore id tenetur accusantium nisi vero atque.</p>
    </>;
}

export function foo(bar: string): Component {
    const [barState, setBarState] = useState(bar);
    let current = bar;
    barState((v) => current = v);
    const hello = true;
    return  <>
        <div>
            <p class={barState}>Lorem</p>
            {barState}
            <HelloWorld foo={barState}></HelloWorld>
            <button onClick={() => setBarState(current + hello)}> append </button>
        </div>
    </>;
}

const a = foo('hello')
console.log(a)
const root = document.body;
root.appendChild(a.fragment)