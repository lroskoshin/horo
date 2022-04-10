import { Unsubscriber } from '@horo/core';

export type Dispatcher<Value> = {
    (value: Value): void
}

export type State<Value> = {
    (cb: (value: Value) => void): Unsubscriber;
}

export type Current<Value> = {
    (): Value;
}

export function useState<Value>(value: Value): [State<Value>, Dispatcher<Value>, Current<Value>] {
    let currentValue = value;
    const linsteners: Array<(value: Value) => void> = [];

    return [
        (cb: (value: Value) => void) => {
            cb(currentValue);
            linsteners.push(cb);
            return () => {
                const index = linsteners.indexOf(cb);
                linsteners.splice(index);
            };
        }, 
        (newValue: Value) => {
            currentValue = newValue;
            linsteners.forEach((cb) => cb(currentValue));
        },
        () => currentValue
    ];
}
