import { noop } from 'src/utils/noop';
import { Subscribable, Unsubscriber } from './insertion';

export function insertAttr(socket: Element, attrName: string, insertion: string | Subscribable<string>): Unsubscriber {
    const attr = document.createAttribute(attrName);
    socket.setAttributeNode(attr);
    if(typeof insertion === 'string') {
        attr.value = insertion;
        return noop;
    } else {
        return insertion((value: string) => {
            attr.value = value;
        });
    }
}
