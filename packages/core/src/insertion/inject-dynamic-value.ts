/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Component, DynamicInsertion, Unsubscriber } from './insertion';
import { noop } from 'src/utils/noop';

export function injectDynamicValue(socket: Comment, insertion: DynamicInsertion): Unsubscriber {
    const currentRange = document.createRange();
    let lastUnsubscriber = noop;
    let start: Node = socket;
    let end: Node = socket;
    let lastAddress: Component['address'] = () => {
        return {
            start,
            end,
        };
    };
    
    const unsubscribe = insertion((value: Component | string) => {
        const address = lastAddress();
        currentRange.setStartBefore(address.start);
        currentRange.setEndAfter(address.end);
        currentRange.deleteContents();
        lastUnsubscriber();
        if(typeof value === 'string') {
            const textNode = document.createTextNode(value);
            start = textNode;
            end = textNode;
            currentRange.insertNode(textNode);
            lastUnsubscriber = noop;
        } else {
            lastAddress = value.address;
            currentRange.insertNode(value.fragment);
            lastUnsubscriber = value.unsubscribe;
        }
    });

    return () => {
        lastUnsubscriber();
        unsubscribe();
    };
}
