import { eventHandlingPrefix, insertionPrefix } from '../instruction';

// eslint-disable-next-line no-useless-escape
const eventHandlingPattern = /(<[a-z\=\"\s]* )data-event-([a-z]*)="?$/m;
export function joiner(template: TemplateStringsArray): string {
    let result = template[0];
    for (let index = 1; index < template.length; index++) {
        const currentChunk = template[index];
        const dataAttr = result.match(eventHandlingPattern);
        if(dataAttr !== null) {
            result =`${result.replace(eventHandlingPattern, `<!--${eventHandlingPrefix}$2:${index-1}-->$1`)}${currentChunk}`;
        } else {
            result =`${result}<!--${insertionPrefix}${index-1}-->${currentChunk}`;
        }
    }
    return result;
}
