import { insertionPrefix, attrsPrefix, eventHandlingPrefix } from '../instruction';

// eslint-disable-next-line no-useless-escape
const attrsPattern = /(<[a-z\=\"\s\-]* )([a-z\-\@]*)="?$/mi;
export function parseTemplate(template: TemplateStringsArray): string {
    let result = template[0];
    for (let index = 1; index < template.length; index++) {
        const currentChunk = template[index];
        const dataAttr = result.match(attrsPattern);
        if(dataAttr === null) {
            // Contetn isertion
            result =`${result}<!--${insertionPrefix}${index-1}-->${currentChunk}`;
        } else if(dataAttr[2].startsWith('@')) {
            // Event handling
            result =`${result.replace(attrsPattern, (m, p1, p2) => `<!--${eventHandlingPrefix}${p2.substring(1)}:${index-1}-->${p1}`)}${removeQuote(currentChunk)}`;
        } else {
            // Reactive attr
            result = `${result.replace(attrsPattern, `<!--${attrsPrefix}$2:${index-1}-->$1`)}${removeQuote(currentChunk)}`;
        }
    }
    return result;
}

function removeQuote(str: string) {
    return str.replace(/^(["])/m, '');
}
