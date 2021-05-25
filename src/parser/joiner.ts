import { eventHandlingPrefix, insertionPrefix, attrsPrefix } from '../instruction';

// eslint-disable-next-line no-useless-escape
const attrsPatter = /(<[a-z\=\"\s\-]* )([a-z\-\@]*)="?$/mi;
export function joiner(template: TemplateStringsArray): string {
    let result = template[0];
    for (let index = 1; index < template.length; index++) {
        const currentChunk = template[index];
        const dataAttr = result.match(attrsPatter);
        if(dataAttr === null) {
            result =`${result}<!--${insertionPrefix}${index-1}-->${currentChunk}`;
        } else if(dataAttr[2].startsWith(eventHandlingPrefix)) {
            result =`${result.replace(attrsPatter, `<!--$2:${index-1}-->$1`)}${currentChunk.replace(/^(["])/m, '')}`;
        } else {
            result = `${result.replace(attrsPatter, `<!--${attrsPrefix}$2:${index-1}-->$1`)}${currentChunk.replace(/^(["])/m, '')}`;
        }
    }
    return result;
}
