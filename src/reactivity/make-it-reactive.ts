import { eventHandlingPrefixLength, insertionPrefixLength, isEventHandlingInstruction, isInsertionInsctruction } from 'src/instruction';
import { insertValue } from '../insertion/insert-value';
import { ensureSubscription, ensureValueInsertion, Instertion, Unsubscriber } from '../insertion/insertion';
import { listenEvent } from '../listen-event';
import { getSocketsForReactivity } from './get-sockets-for-reactivity';

export type ArrayWithStringIndex<T> = T[] & {
    [index: string]: T;
}

export function makeItReactive(fragment: DocumentFragment, insertions: ArrayWithStringIndex<Instertion>): Unsubscriber {
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
            const subscripption = ensureSubscription(insertions[insertionIndex]);
            unsubscribes.push(listenEvent(socket.nextElementSibling as Element, eventName, subscripption));
        }
    }
    return () => {
        unsubscribes.forEach(u => u());
    };
}

