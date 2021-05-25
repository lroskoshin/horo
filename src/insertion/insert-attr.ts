import { Subscribable, Unsubscriber } from './insertion';

export function insertAttr(socket: Element, attrName: string, insertion: string | Subscribable<string>): Unsubscriber {
    const attr = document.createAttribute(attrName);
    socket.setAttributeNode(attr);
    if(typeof insertion === 'string') {
        attr.value = insertion;
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        return () => {};
    } else {
        const subscription = insertion.subscribe((value: string) => {
            attr.value = value;
        });
        return subscription.unsubscribe;
    }
}
