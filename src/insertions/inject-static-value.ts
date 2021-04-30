import { StaticInsertion } from './insertions';
import { mergeComponents } from '../merge-components';

export function injectStaticValue(socket: Element, insertion: StaticInsertion): void {
    if(typeof insertion === 'string') {
        socket.replaceWith(insertion);
    } else {
        const component = Array.isArray(insertion) ? mergeComponents(insertion) : insertion;
        socket.replaceWith(component.fragment);
    }
}
