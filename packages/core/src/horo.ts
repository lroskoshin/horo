import { Component, Insertion } from './insertion/insertion';
import { parseTemplate } from './parser/parse-template';
import { makeComponent } from './make-component';

// To-Do: empty components
export function horo(templateChunks: TemplateStringsArray, ...insertions: Insertion[]): Component {
    const template = parseTemplate(templateChunks);
    return makeComponent(template, insertions);
}
