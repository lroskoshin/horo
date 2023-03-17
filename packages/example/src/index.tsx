import { Component } from "@horojs/core";
import { useState, State } from "@horojs/state"

function HelloWorld({foo}: {foo: State<string>}): Component {
    const [checked, setChecked, currentChecked] = useState(true);
    const check = () => setChecked(!currentChecked());
    const component = (cb: (v: Component) => void) => {
        return checked((value) => cb(value ? <p>Checked</p> : <p>Unchecked</p>))
    }
    return <>
        <p>Hello</p>
        <button onClick={check}>Check</button>
        {foo}
        {component}
    </>;
}

export function foo(bar: string): Component {
    const [barState, setBarState, current] = useState(bar);
    const hello = true;
    const [checked, setChecked, currentChecked] = useState(false);
    const check = () => setChecked(!currentChecked());
    const component = (cb: (v: Component) => void) => {
        return checked((value) => cb(value ? <p>Checked</p> : <HelloWorld foo={barState}></HelloWorld>))
    }
    return  <>
        <div>
            <p class={barState}>Lorem</p>
            {barState}
            <HelloWorld foo={barState}></HelloWorld>
            <input type="checkbox" onClick={check} />
            {component}
            <button onClick={() => {
                setBarState(current() + hello);
            }}> append </button>
        </div>
    </>;
}

const a = foo('hello')
const root = document.body;
root.appendChild(a.fragment)