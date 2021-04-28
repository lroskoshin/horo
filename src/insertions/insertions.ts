export type Subscribable<T> = {
    subscribe(listner: (value: T) => void): void;
};

export type Subscription<T> = {
    next(value: T): void;
};

export interface Component {
    delete(): void;
    fragment: DocumentFragment;
}

export type Instertions = Subscribable<string | Component> | Subscription<Event> | string;

export function ensureSubscribable(instertion: Instertions): Subscribable<string | Component> {
    if(typeof instertion !== 'string' && 'subscribe' in instertion && typeof instertion.subscribe === 'function') {
        return instertion;
    } 
    throw new Error('The passed value is not a Subscribable.');
} 

export function ensureSubscription(instertion: Instertions): Subscription<unknown> {
    if(typeof instertion !== 'string' && 'next' in instertion && typeof instertion.next === 'function') {
        return instertion;
    } 
    throw new Error('The passed value is not a Subscription.');
} 
