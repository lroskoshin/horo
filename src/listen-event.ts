import { Subscription, Unsubscriber } from './insertion/insertion';

export function listenEvent(element: Element, eventName: string, subscription: Subscription<Event>): Unsubscriber {
    const handler = (event: Event) => {
        subscription.next(event);
    };
    element.addEventListener(eventName, handler);
    return () => element.removeEventListener(eventName, handler);
}
