import { ParseResult } from '@babel/parser';
import traverse from '@babel/traverse';
import { File } from '@babel/types';
import { Component } from './components/component';
import { ProtoComponent } from './components/proto-component';
import * as t from '@babel/types';
import { NodePath } from '@babel/traverse';

export function recursiveParsing(ast: ParseResult<File>) {
    const roots: NodePath<t.JSX>[] = [];
    traverse(ast, {
        JSX(path) {
            if(!path.parentPath.isJSX()) {
                roots.push(path);
            }
        }
    });

    const components = [];

    for(let i = roots.length - 1; i >= 0; i--) {
        const root = roots[i];
        const proto = new ProtoComponent(root);
        components.push(new Component(proto));
    }

    return components;
}
