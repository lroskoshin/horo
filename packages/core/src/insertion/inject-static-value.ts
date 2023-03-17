import { noop } from 'src/utils/noop';
import { StaticInsertion, Unsubscriber } from './insertion';

export function injectStaticValue(socket: Comment, insertion: StaticInsertion): Unsubscriber {
    if(typeof insertion === 'string') {
        socket.replaceWith(insertion);
        return noop;
    } else {
        socket.replaceWith(insertion.fragment);
        return insertion.unsubscribe;
    }
}
