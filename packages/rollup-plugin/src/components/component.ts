import { ProtoComponent } from './proto-component';
import { StringLiteral, ArrayExpression, JSXFragment, JSXElement, stringLiteral, arrayExpression, callExpression, identifier } from '@babel/types';
import { NodePath } from '@babel/traverse';

export class Component {
    private template: StringLiteral;
    private insertion: ArrayExpression;
    public root: NodePath<JSXFragment | JSXElement>;

    constructor(proto: ProtoComponent) {
        this.root = proto.getRoot() as NodePath<JSXFragment | JSXElement>;
        this.template = stringLiteral(proto.template.join(''));
        this.insertion = arrayExpression(proto.insertions);
    }

    public getComponent() {
        return callExpression(identifier('makeComponent'), [this.template, this.insertion]);
    }
}
