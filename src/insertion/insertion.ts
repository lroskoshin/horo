export type Unsubscriber = () => void;

export type Unsubscribable = {
    unsubscribe: Unsubscriber;
}

export type Subscribable<T> = {
    subscribe(listner: (value: T) => void): Unsubscribable;
};

export type Subscription<T> = {
    next(value: T): void;
};

export interface Component {
    unsubscribe(): void;
    fragment: DocumentFragment;
}
export type StaticInsertion = string | Component | Component[];
export type DynamicInsertion = Subscribable<string | Component | Component[]>;
export type ValueInsertion = DynamicInsertion | StaticInsertion;
export type Instertion = Subscription<Event> | ValueInsertion;
// TO-DO: Optimize type guarding
export function isStaticInsertion(insertion: Instertion): insertion is StaticInsertion {
    return typeof insertion === 'string' || 'fragment' in insertion || Array.isArray(insertion);
}
export function isDynamicInsertion(insertion: Instertion): insertion is StaticInsertion {
    return typeof insertion !== 'string' && 'subscribe' in insertion && typeof insertion.subscribe === 'function';
}

export function ensureValueInsertion(instertion: Instertion): ValueInsertion {
    if(isStaticInsertion(instertion) ||  isDynamicInsertion(instertion)) {
        return instertion;
    } 
    throw new Error('The passed value is not Instertable.');
} 

export function ensureSubscription(instertion: Instertion): Subscription<unknown> {
    if(typeof instertion !== 'string' && 'next' in instertion && typeof instertion.next === 'function') {
        return instertion;
    } 
    throw new Error('The passed value is not a Subscription.');
} 
