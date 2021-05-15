import { mergeComponents } from '../merge-components';
import { InsertionAddress } from './insertion-adress';
import { Component, DynamicInsertion } from './insertions';

export function injectDynamicValue(socket: Comment, insertion: DynamicInsertion): void {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    let lastDestroyer = () => {};
    // Временное решение, возможно нужно будет перейти на Range целиком. 
    // Пока это не возможно так как вставка корневого DocumentFragment очищает сам фрагмент,
    // что приводит к потери указателя.
    let address: InsertionAddress = {
        end: socket,
        start: socket,  
    };
    const currentRange = document.createRange();
    
    insertion.subscribe((value: Component | string | Component[]) => {
        currentRange.setStartBefore(address.start);
        currentRange.setEndAfter(address.end);
        if(typeof value === 'string') {
            address = injectDynamicText(currentRange, value);
        } else {
            const component = Array.isArray(value) ? mergeComponents(value) : value;
            address = injectDynamicComponent(currentRange, component);
            lastDestroyer();
            lastDestroyer = component.delete;
        }
    });
}

function injectDynamicText(range: Range, value: string): InsertionAddress {
    const textNode = document.createTextNode(value);
    range.deleteContents();
    range.insertNode(textNode);
    range.selectNode(textNode);
    return {
        end: textNode,
        start: textNode,
    };
}

function injectDynamicComponent(range: Range, value: Component): InsertionAddress {
    range.deleteContents();
    const address: InsertionAddress = {
        start: value.fragment.firstChild as Node,
        end: value.fragment.lastChild as Node,
    };
    range.insertNode(value.fragment);
    return address;
}
