import { ProtoComponent } from './proto-component';
import * as t from '@babel/types';
import { NodePath } from '@babel/traverse';

export class Component {
    private template: t.StringLiteral;
    private insertion: t.ArrayExpression;
    public root: NodePath<t.JSXFragment | t.JSXElement>;

    constructor(proto: ProtoComponent) {
        this.root = proto.getRoot() as NodePath<t.JSXFragment | t.JSXElement>;
        this.template = t.stringLiteral(proto.template.join(''));
        this.insertion = t.arrayExpression(proto.insertions);
    }

    public getComponent() {
        return t.callExpression(t.identifier('horo'), [this.template, this.insertion]);
    }
}
