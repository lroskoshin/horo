import { Component } from "@horojs/core";
import { useState, State } from "@horojs/state"
import type * as d from "@horojs/types";

function HelloWorld({foo}: {foo: State<string>}): Component {
    return <>
        <h2>{foo}</h2>
        <p>Hello</p>
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