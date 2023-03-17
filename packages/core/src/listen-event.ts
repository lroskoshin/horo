import { Subscription } from './insertion/insertion';

export function listenEvent(element: Element, eventName: string, subscription: Subscription<Event>) {
    element.addEventListener(eventName, (event: Event) => {
        subscription(event);
    });
}
