import { ensureSubscribable, Instertions } from './insertions';

export function insertReactiveNode(fragment: DocumentFragment, insertions: Instertions[]): void {
    const socketsForIsnert = fragment.querySelectorAll('[data-index]');
    socketsForIsnert.forEach((socket: Element) => {
        const textNode = document.createTextNode('');
        const index = parseInt(socket.getAttribute('data-index') as string);
        const insertion = ensureSubscribable(insertions[index]);
        insertion.subscribe((value: unknown) => {
            textNode.nodeValue = value as string;
        });
        socket.replaceWith(textNode);
    });
}
