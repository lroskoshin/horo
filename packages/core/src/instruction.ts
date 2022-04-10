export const insertionPrefix = 'insert:';
export const insertionPrefixLength = insertionPrefix.length;
export const eventHandlingPrefix = '@';
export const eventHandlingPrefixLength = eventHandlingPrefix.length;
export const attrsPrefix = 'attrs:';
export const attrsPrefixLength = attrsPrefix.length;

export function isInsertionInsctruction(instruction: string): boolean {
    return instruction.startsWith(insertionPrefix);
}

export function isEventHandlingInstruction(instruction: string): boolean {
    return instruction.startsWith(eventHandlingPrefix);
}

export function isAttrsInstruction(instruction: string): boolean {
    return instruction.startsWith(attrsPrefix);
}
