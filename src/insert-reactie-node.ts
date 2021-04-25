import { Instertions, Subscribable } from './insertions';

export function insertReactiveNode(fragment: DocumentFragment, inserts: Instertions[]): void {
    const socketsForIsnert = fragment.querySelectorAll('[data-index]');
    socketsForIsnert.forEach((socket: Element) => {
        const textNode = document.createTextNode('');
        const index = socket.getAttribute('data-index');
        (inserts[parseInt(index as string)] as Subscribable<unknown>).subscribe((value: any) => {
            textNode.nodeValue = value;
        });
        socket.replaceWith(textNode);
    });
}
