import { injectDynamicValue } from './inject-dynamic-value';
import { injectStaticValue } from './inject-static-value';
import { Instertions, ensureValueInsertion, isStationInsertion } from './insertions';

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
