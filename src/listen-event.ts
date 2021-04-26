import { ensureSubscription, Instertions } from './insertions/insertions';

export function listenEvent(fragment: DocumentFragment, insertions: Instertions[]): void {
    const listeningElements = fragment.querySelectorAll('[data-event]');
    listeningElements.forEach((element: Element) => {
        const [eventName, index] = (element.getAttribute('data-event') as string).split(':');
        const listener = ensureSubscription(insertions[parseInt(index)]);
        element.addEventListener(eventName, (event: Event) => {
            listener.next(event);
        });
    });
}
