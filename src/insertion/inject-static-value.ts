import { StaticInsertion, Unsubscriber } from './insertion';

export function injectStaticValue(socket: Comment, insertion: StaticInsertion): Unsubscriber {
    if(typeof insertion === 'string') {
        socket.replaceWith(insertion);
        // Temporary dummy fn
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        return () => {};
    } else {
        socket.replaceWith(insertion.fragment);
        return insertion.unsubscribe;
    }
}
