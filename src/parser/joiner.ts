const eventHandlingPattern = /data-event-([a-z]*)="?$/m;
export function joiner(template: TemplateStringsArray): string {
    let result = template[0];
    for (let index = 1; index < template.length; index++) {
        const currentChunk = template[index];
        const dataAttr = result.match(eventHandlingPattern);
        if(dataAttr !== null) {
            result =`${result.replace(eventHandlingPattern, 'data-event="')}${dataAttr[1]}:${index-1}"${currentChunk}`;
        } else {
            result =`${result}<!--${index-1}-->${currentChunk}`;
        }
    }
    return result;
}
