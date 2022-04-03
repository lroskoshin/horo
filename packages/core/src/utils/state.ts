export type Dispatcher<Value> = {
    (value: Value): void
}

export type State<Value> = {
    (cb: (value: Value) => void): void;
}

export function state<Value>(value: Value): [State<Value>, Dispatcher<Value>] {
    let currentValue = value;
    const linsteners: Array<(value: Value) => void> = [];
    return [
        (cb) => {
            cb(currentValue);
            linsteners.push(cb);
        }, 
        (newValue: Value) => {
            currentValue = newValue; 
            linsteners.forEach((cb) => cb(currentValue));
        }
    ];
}
