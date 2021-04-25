export type Subscribable<T> = {
    subscribe(listner: (value: T) => void): void;
};

export type Subscription<T> = {
    next(value: T): void;
};

export type Instertions = Subscribable<unknown> | Subscription<Event>;
