import { Instertions, Subscription } from './insertions';

export function listenEvent(fragment: DocumentFragment, inserts: Instertions[]): void {
    const listeningElements = fragment.querySelectorAll('[data-event]');
    listeningElements.forEach((element: Element) => {
        const [eventName, index] = (element.getAttribute('data-event') as string).split(':');
        const listener = inserts[parseInt(index)] as Subscription<Event>;
        element.addEventListener(eventName, (event: Event) => {
            listener.next(event);
        });
    });
}
