import { Component, Instertion } from './insertion/insertion';
import { parseTemplate } from './parser/parse-template';
import { makeComponent } from './make-components';

// To-Do: empty components
export function horo(templateChunks: TemplateStringsArray, ...insertions: Instertion[]): Component {
    const template = parseTemplate(templateChunks);
    return makeComponent(template, insertions);
}
