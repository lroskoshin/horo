export type Unsubscriber = () => void;
//TO-DO: remove unsubscriber after onDestroy hook will be added
export type Subscribable<T> = {
    (listner: (value: T) => void): Unsubscriber | void;
};

export type Subscription<T> = {
    (value: T): void;
};

type Subscriptions<T> = T extends infer K ? Subscription<K> : never;

export interface Component {
    unsubscribe(): void;
    fragment: DocumentFragment;
}
export type StaticInsertion = string | Component;
export type DynamicInsertion = Subscribable<string | Component>;
export type ValueInsertion = DynamicInsertion | StaticInsertion;
export type Instertion = Subscriptions<GlobalEventHandlersEventMap[keyof GlobalEventHandlersEventMap]> | ValueInsertion;
// TO-DO: Optimize type guarding
export function isStaticInsertion(insertion: Instertion): insertion is StaticInsertion {
    return typeof insertion === 'string' || 'fragment' in insertion;
}

export function isDynamicInsertion(insertion: Instertion): insertion is DynamicInsertion {
    return typeof insertion === 'function';
}

export function ensureValueInsertion(instertion: Instertion): ValueInsertion {
    if(isStaticInsertion(instertion) ||  isDynamicInsertion(instertion)) {
        return instertion;
    }

    throw new Error('The passed value is not Instertable.');
} 

export function ensureSubscription(instertion: Instertion): Subscription<Event> {
    if(typeof instertion === 'function') {
        return instertion as Subscription<Event> ;
    }

    throw new Error('The passed value is not a Subscription.');
} 
