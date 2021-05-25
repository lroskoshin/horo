export const insertionPrefix = 'insert:';
export const insertionPrefixLength = insertionPrefix.length;
export const eventHandlingPrefix = 'listen:';
export const eventHandlingPrefixLength = insertionPrefix.length;

export function isInsertionInsctruction(instruction: string): boolean {
    return instruction.startsWith(insertionPrefix);
}

export function isEventHandlingInstruction(instruction: string): boolean {
    return instruction.startsWith(eventHandlingPrefix);
}
