type Subscribable<T> = {
    subscribe(listner: (value: T) => void): void;
};

type Subscription<T> = {
    next(value: T): void;
};

type Instert = Subscribable<any> | Subscription<Event>;

export function h(template: TemplateStringsArray, ...inserts: Instert[]): DocumentFragment {
    const root = document.createElement('template');
    root.innerHTML = joiner(template);
    insertReactiveNode(root.content, inserts);
    listenEvent(root.content, inserts);
    return root.content;
}

function joiner(template: TemplateStringsArray): string {
    let result = template[0];
    for (let index = 1; index < template.length; index++) {
        const element = template[index];
        const dataAttr = result.match(/data-event-([a-z]*)="?$/m);
        if(dataAttr !== null) {
            result =`${result.replace(/data-event-([a-z]*)="?$/m, 'data-event="')}${dataAttr[1]}:${index-1}"${element}`;
        } else {
            result =`${result}<span data-index=${index-1}></span>${element}`;
        }
    }
    return result;
}

function insertReactiveNode(fragment: DocumentFragment, inserts: Instert[]) {
    const socketsForIsnert = fragment.querySelectorAll('[data-index]');
    socketsForIsnert.forEach((socket: Element) => {
        const textNode = document.createTextNode('');
        const index = socket.getAttribute('data-index');
        (inserts[parseInt(index as string)] as Subscribable<any>).subscribe((value: any) => {
            textNode.nodeValue = value;
        });
        socket.replaceWith(textNode);
    });
}

function listenEvent(fragment: DocumentFragment, inserts: Instert[]) {
    const listeningElements = fragment.querySelectorAll('[data-event]');
    listeningElements.forEach((element: Element) => {
        const [eventName, index] = (element.getAttribute('data-event') as string).split(':');
        const listener = inserts[parseInt(index)] as Subscription<Event>;
        element.addEventListener(eventName, (event: Event) => {
            listener.next(event);
        });
    });
}
