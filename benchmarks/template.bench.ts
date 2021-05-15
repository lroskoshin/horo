// This benchmark is for performance comparing querySelector vs TreeWalker 
// In the browser, the result may be different

import { Suite } from 'benchmark';
import 'global-jsdom/register';

export function templateBenchamrk(): void {
    const root = getRootElement();
    const suite = new Suite();
    suite
    .add('Tree Walker', () => {
        treeWalker(root);
    })
    .add('Query Selector', () => {
        querySelector(root);
    })
    .on('cycle', function(event: unknown) {
        console.log(String(event.target));
    })
    .on('complete', function(this: Suite) {
        console.log('Fastest is ' + this.filter('fastest').map('name'));
    })
    .run({ 'async': true });
}

function getRootElement(): HTMLElement {
    const rootElem = document.createElement('div');
    rootElem.innerHTML = `
        <div>
            <!-- foo -->
            <span data-id="foo"> </span>
        </div>
        <div>
            <!-- foo -->
            <span data-id="foo"> </span>
        </div>
        <div>
            <!-- foo -->
            <span data-id="foo"> </span>
        </div>
        <div>
            <!-- foo -->
            <span data-id="foo"> </span>
        </div>
        <div>
            <!-- foo -->
            <span data-id="foo"> </span>
        </div>
        <div>
            <!-- foo -->
            <span data-id="foo"> </span>
        </div>
        <div>
            <!-- foo -->
            <span data-id="foo"> </span>
        </div>
        <div>
            <!-- foo -->
            <span data-id="foo"> </span>
        </div>
        <div>
            <!-- foo -->
            <span data-id="foo"> </span>
        </div>
        <div>
            <!-- foo -->
            <span data-id="foo"> </span>
        </div>
        <div>
            <!-- foo -->
            <span data-id="foo"> </span>
        </div>
        <div>
            <!-- foo -->
            <span data-id="foo"> </span>
        </div>
        <div>
            <!-- foo -->
            <span data-id="foo"> </span>
        </div>
        <div>
            <!-- foo -->
            <span data-id="foo"> </span>
        </div>
    `;
    return rootElem;
}

function treeWalker(rootElem: HTMLElement) {
    const iterator = document.createTreeWalker(
        rootElem, 
        NodeFilter.SHOW_COMMENT,
    );
    let node;
    while ((node = iterator.nextNode())) {
        node;
    }
}

function querySelector(rootElem: HTMLElement): void {
    const items = rootElem.querySelectorAll('[data-id]');
    let node;
    const iterator = items.entries();
    while ((node = iterator.next().value)) {
        node;
    }
}
