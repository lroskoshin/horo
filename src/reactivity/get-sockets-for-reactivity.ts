export function getSocketsForReactivity(fragment: DocumentFragment): Comment[] {
    const iterator = document.createTreeWalker(
        fragment, 
        NodeFilter.SHOW_COMMENT,
    );
    // Conversion to array is redundant 
    // Currently there is a conversion due to the replacement of the root comment 
    const nodeList: Comment[] = [];

    while(iterator.nextNode()) nodeList.push(iterator.currentNode as Comment);
    return nodeList;
}
