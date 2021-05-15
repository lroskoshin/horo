import { StaticInsertion, Unsubscriber } from './insertions';
import { mergeComponents } from '../merge-components';

export function injectStaticValue(socket: Comment, insertion: StaticInsertion): Unsubscriber {
    if(typeof insertion === 'string') {
        socket.replaceWith(insertion);
        // Temporary dummy fn
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        return () => {};
    } else {
        const component = Array.isArray(insertion) ? mergeComponents(insertion) : insertion;
        socket.replaceWith(component.fragment);
        return component.unsubscribe;
    }
}
