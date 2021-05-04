export function joiner(template: TemplateStringsArray): string {
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
