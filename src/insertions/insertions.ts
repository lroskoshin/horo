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
export type StaticInsertion = (string & {fragment: undefined}) | Component;
export type DynamicInsertion = Subscribable<string | Component>;
export type ValueInsertion = DynamicInsertion | StaticInsertion;
export type Instertions = Subscription<Event> | ValueInsertion;
// TO-DO: Optimize type guarding
export function isStationInsertion(insertion: Instertions): insertion is StaticInsertion {
    return typeof insertion === 'string' || 'fragment' in insertion;
}
export function isDynamicInsertion(insertion: Instertions): insertion is StaticInsertion {
    return typeof insertion !== 'string' && 'subscribe' in insertion && typeof insertion.subscribe === 'function';
}

export function ensureValueInsertion(instertion: Instertions): ValueInsertion {
    if(isStationInsertion(instertion) ||  isDynamicInsertion(instertion)) {
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
