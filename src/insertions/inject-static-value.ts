import { StaticInsertion } from './insertions';

export function injectStaticValue(socket: Element, insertion: StaticInsertion): void {
    socket.replaceWith(typeof insertion === 'string' ? insertion : insertion.fragment);
}
