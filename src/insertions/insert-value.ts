import { injectDynamicValue } from './inject-dynamic-value';
import { injectStaticValue } from './inject-static-value';
import { Instertions, ensureValueInsertion, isStationInsertion, Unsubscriber } from './insertions';

type ArrayWithStringIndex<T> = T[] & {
    [index: string]: T;
}

export function insertValue(fragment: DocumentFragment, insertions: Instertions[]): Unsubscriber {
    const iterator = document.createTreeWalker(
        fragment, 
        NodeFilter.SHOW_COMMENT,
    );
    // Conversion to array is redundant 
    // Currently there is a conversion due to the replacement of the root comment 
    const nodeList = [];
    const unsubscribes: Unsubscriber[] = [];
    while(iterator.nextNode()) nodeList.push(iterator.currentNode as Comment);
    for (let i = 0; i < nodeList.length; i++) {
        const socket = nodeList[i];
        const insertionIndex = socket.textContent as string;
        const insertion = ensureValueInsertion((insertions as ArrayWithStringIndex<Instertions>)[insertionIndex]);
        if(isStationInsertion(insertion)) {
            injectStaticValue(socket, insertion);
        } else {
            unsubscribes.push(injectDynamicValue(socket, insertion));
        }
    }

    return () => {
        unsubscribes.forEach(u => u());
    };
}
