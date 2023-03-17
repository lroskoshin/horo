/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { 
    attrsPrefix,
    eventHandlingPrefix, 
    insertionPrefix, 
} from '../instruction';
import { insertValue } from '../insertion/insert-value';
import { Component, ensureSubscription, ensureValueInsertion, Insertion, Subscribable, Unsubscriber } from '../insertion/insertion';
import { listenEvent } from '../listen-event';
import { getSocketsForReactivity } from './get-sockets-for-reactivity';
import { insertAttr } from '../insertion/insert-attr';
import { noop } from 'src/utils/noop';

export type ArrayWithStringIndex<T> = T[] & {
    [index: string]: T;
}

export function makeItReactive(fragment: Node, insertions: ArrayWithStringIndex<Insertion>): Pick<Component, 'unsubscribe' | 'address'> {
    const sockets = getSocketsForReactivity(fragment);
    if(sockets.length === 0) {
        return {
            unsubscribe: noop,
            address: () => {
                return {
                    start: fragment.firstChild!,
                    end: fragment.lastChild!,
                };
            }
        };
    }
    const unsubscribes: Unsubscriber[] = [];
    for (const socket of sockets) {
        const instruction = socket.textContent as string;
        const typeInstruction = instruction.substring(0, 2);
        switch (typeInstruction) {
            case insertionPrefix: {
                const insertion = ensureValueInsertion(insertions[instruction.substring(2)]);
                unsubscribes.push(insertValue(socket, insertion));
                break;
            }
            case eventHandlingPrefix: {
                const [eventName, insertionIndex] = instruction.substring(2).split(':');
                const subscription = ensureSubscription(insertions[insertionIndex]);
                listenEvent(socket.nextElementSibling as Element, eventName, subscription);
                break;
            }
            case attrsPrefix: {
                const [attrName, insertionIndex] = instruction.substring(2).split(':');
                const insertion = ensureValueInsertion(insertions[insertionIndex]);
                const unsubscribe = insertAttr(socket.nextElementSibling as Element, attrName, insertion as string | Subscribable<string>);
                if(unsubscribe !== noop) {
                    unsubscribes.push(unsubscribe);
                }
                break;
            }
        }
    }

    const unsubscribe = () => {
        for (const unsubscribe of unsubscribes) {
            unsubscribe();
        }
    };
    const first = sockets[0];
    const last = sockets[sockets.length - 1];
    const start = (fragment.firstChild === first && first.textContent!.startsWith(insertionPrefix)) ? first : document.firstChild;
    const end = (fragment.lastChild === last && last.textContent!.startsWith(insertionPrefix)) ? last : document.lastChild;
    return {
        unsubscribe,
        address: () => {
            return {
                start: start as Node,
                end: end as Node,
            };
        }
    };
}
