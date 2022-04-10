import { Subscribable, Unsubscriber } from './insertion';

export function insertAttr(socket: Element, attrName: string, insertion: string | Subscribable<string>): Unsubscriber | void {
    const attr = document.createAttribute(attrName);
    socket.setAttributeNode(attr);
    if(typeof insertion === 'string') {
        attr.value = insertion;
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        return () => {};
    } else {
        const unsubscriber = insertion((value: string) => {
            attr.value = value;
        });
        return unsubscriber;
    }
}
