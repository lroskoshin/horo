import { ensureSubscribable, Instertions, Subscribable, Component } from './insertions/insertions';

interface InsertionAddress {
    start: Node,
    end: Node,
}

export function insertReactiveNode(fragment: DocumentFragment, insertions: Instertions[]): void {
    const socketsForIsnert = fragment.querySelectorAll('[data-index]');
    socketsForIsnert.forEach((socket: Element) => {
        const index = parseInt(socket.getAttribute('data-index') as string);
        const insertion = ensureSubscribable(insertions[index]);
        inject(socket, insertion);
        
    });
}

function inject(socket: Element, insertion: Subscribable<Component | string>) {
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
            address = injectText(currentRange, value);
        } else {
            address = injectComponent(currentRange, value);
            lastDestroyer();
            lastDestroyer = value.delete;
        }
    });
}

function injectText(range: Range, value: string): InsertionAddress {
    const textNode = document.createTextNode(value);
    range.deleteContents();
    range.insertNode(textNode);
    range.selectNode(textNode);
    return {
        end: textNode,
        start: textNode,
    };
}

function injectComponent(range: Range, value: Component): InsertionAddress {
    range.deleteContents();
    const address: InsertionAddress = {
        start: value.fragment.firstChild as Node,
        end: value.fragment.lastChild as Node,
    };
    range.insertNode(value.fragment);
    return address;
}
