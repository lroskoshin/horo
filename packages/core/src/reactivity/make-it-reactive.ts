import { 
    attrsPrefixLength, 
    eventHandlingPrefixLength, 
    insertionPrefixLength, 
    isAttrsInstruction, 
    isEventHandlingInstruction, 
    isInsertionInsctruction 
} from '../instruction';
import { insertValue } from '../insertion/insert-value';
import { ensureSubscription, ensureValueInsertion, Insertion, Subscribable, Unsubscriber } from '../insertion/insertion';
import { listenEvent } from '../listen-event';
import { getSocketsForReactivity } from './get-sockets-for-reactivity';
import { insertAttr } from '../insertion/insert-attr';

export type ArrayWithStringIndex<T> = T[] & {
    [index: string]: T;
}

export function makeItReactive(fragment: DocumentFragment, insertions: ArrayWithStringIndex<Insertion>): Unsubscriber {
    const sockets = getSocketsForReactivity(fragment);
    const unsubscribes: Unsubscriber[] = [];
    for (let i = 0; i < sockets.length; i++) {
        const socket = sockets[i];
        const instruction = socket.textContent as string;
        // TO-DO: Replace type guarding
        if (isInsertionInsctruction(instruction)) {
            const insertion = ensureValueInsertion(insertions[instruction.substring(insertionPrefixLength)]);
            unsubscribes.push(insertValue(socket, insertion));
        } else if (isEventHandlingInstruction(instruction)) {
            const [eventName, insertionIndex] = instruction.substring(eventHandlingPrefixLength).split(':');
            const subscription = ensureSubscription(insertions[insertionIndex]);
            unsubscribes.push(listenEvent(socket.nextElementSibling as Element, eventName, subscription));
        } else if (isAttrsInstruction(instruction)) {
            const [attrName, insertionIndex] = instruction.substring(attrsPrefixLength).split(':');
            const insertion = ensureValueInsertion(insertions[insertionIndex]);
            const unsubscribe = insertAttr(socket.nextElementSibling as Element, attrName, insertion as string | Subscribable<string>);
            if(unsubscribe) {
                unsubscribes.push(unsubscribe);
            }
        }
    }
    return () => {
        unsubscribes.forEach(u => u());
    };
}

