export type Subscribable<T> = {
    subscribe(listner: (value: T) => void): void;
};

export type Subscription<T> = {
    next(value: T): void;
};

export type Instertions = Subscribable<unknown> | Subscription<Event>;

export function ensureSubscribable(instertion: Instertions): Subscribable<unknown> {
    if('subscribe' in instertion && typeof instertion.subscribe === 'function') {
        return instertion;
    } 
    throw new Error('The passed value is not a Subscribable.');
} 

export function ensureSubscription(instertion: Instertions): Subscription<unknown> {
    if('next' in instertion && typeof instertion.next === 'function') {
        return instertion;
    } 
    throw new Error('The passed value is not a Subscription.');
} 
