import { ensureSubscription, Instertions, Unsubscriber } from './insertions/insertions';

export function listenEvent(fragment: DocumentFragment, insertions: Instertions[]): Unsubscriber {
    const listeningElements = fragment.querySelectorAll('[data-event]');
    const unsubscribes: Unsubscriber[] = [];
    listeningElements.forEach((element: Element) => {
        const [eventName, index] = (element.getAttribute('data-event') as string).split(':');
        const listener = ensureSubscription(insertions[parseInt(index)]);
        const handler = (event: Event) => {
            listener.next(event);
        };
        element.addEventListener(eventName, handler);
        unsubscribes.push(() => element.removeEventListener(eventName, handler));
    });
    return () => {
        unsubscribes.forEach(u => u());
    };
}
