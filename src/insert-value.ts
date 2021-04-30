import { Instertions, Component, DynamicInsertion, ensureValueInsertion, isStationInsertion, StaticInsertion } from './insertions/insertions';
interface InsertionAddress {
    start: Node,
    end: Node,
}

type ArrayWithStringIndex<T> = T[] & {
    [index: string]: T;
}

export function insertValue(fragment: DocumentFragment, insertions: Instertions[]): void {
    const socketsForIsnert = fragment.querySelectorAll('[data-index]');
    socketsForIsnert.forEach((socket: Element) => {
        const index = socket.getAttribute('data-index') as string;
        const insertion = ensureValueInsertion((insertions as ArrayWithStringIndex<Instertions>)[index]);
        if(isStationInsertion(insertion)) {
            injectStaticValue(socket, insertion);
        } else {
            injectDynamicValue(socket, insertion);
        }
    });
}

function injectStaticValue(socket: Element, insertion: StaticInsertion): void {
    socket.replaceWith(typeof insertion === 'string' ? insertion : insertion.fragment);
}

function injectDynamicValue(socket: Element, insertion: DynamicInsertion): void {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    let lastDestroyer = () => {};
    // Временное решение, возможно нужно будет перейти на Range целиком. 
    // Пока это не возможно так как вставка корневого DocumentFragment его очищает,
    // что приводит к потери указателя.
    let address: InsertionAddress = {
        end: socket,
        start: socket,  
    };
    const currentRange = document.createRange();
    
    insertion.subscribe((value: Component | string) => {
        currentRange.setStartBefore(address.start);
        currentRange.setEndAfter(address.end);
        if(typeof value === 'string') {
            address = injectDynamicText(currentRange, value);
        } else {
            address = injectDynamicComponent(currentRange, value);
            lastDestroyer();
            lastDestroyer = value.delete;
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
