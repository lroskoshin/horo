import traverse, { NodePath } from '@babel/traverse';
import * as t from '@babel/types';
import { attrsPrefix, insertionPrefix } from '../../src/instruction';

export type Opening = NodePath<t.JSXOpeningElement> | NodePath<t.JSXOpeningFragment>;
export type Closing = NodePath<t.JSXClosingElement> | NodePath<t.JSXClosingFragment>;
export type Children = NodePath<t.JSXText> | NodePath<t.JSXExpressionContainer>;

export class ProtoComponent {
    private openings: Opening[] = [];
    private closings: Closing[] = [];
    public template: string[] = [];
    public insertions: t.Expression[] = [];

    constructor(path: NodePath<t.JSX>) {
        traverse(path.node, {
            JSXOpeningFragment: (path) => {
                this.addOpening(path);
            },
            JSXOpeningElement: (path) => {
                this.addOpening(path);
            },
            JSXClosingElement: (path) => {
                this.addClosing(path);
            },
            JSXClosingFragment: (path) => {
                this.addClosing(path);

            },
            JSXText: (path) => {
                this.addText(path);
            },
            JSXExpressionContainer: (path) => {
                if(path.parentPath.isJSXElement() || path.parentPath.isJSXFragment()) {
                    this.addExpression(path);
                }
            }
        }, path.scope, path);
    }

    public getRoot() {
        return this.openings[0].parentPath as NodePath<t.JSXFragment | t.JSXElement>;
    }

    private addOpening(path: Opening) {
        this.openings.push(path);
        if(path.isJSXOpeningElement() && t.isJSXIdentifier(path.node.name)) {
            if(/^[A-Z].+/.test(path.node.name.name)) {
                this.addComponentOpening(path);
            } else {
                this.addHTMLOpening(path);
            }
        }
    }

    private addComponentOpening(path: NodePath<t.JSXOpeningElement>) {
        if(t.isJSXIdentifier(path.node.name)) {
            const attrs = new Attributes(path.node.attributes);
            const props = attrs.getAttrs().map((attr) => {
                return t.objectProperty(t.stringLiteral(attr.name), attr.value);
            });
            const insertion = t.callExpression(t.identifier(path.node.name.name), [t.objectExpression(props)]);
            this.template.push(`<!--${insertionPrefix}${this.insertions.length}-->`);
            this.insertions.push(insertion);
        }
    }

    private addHTMLOpening(path: NodePath<t.JSXOpeningElement>) {
        if(t.isJSXIdentifier(path.node.name)) {
            const tagName = path.node.name.name;
            const attributes = new Attributes(path.node.attributes);
            if(attributes.hasDynamicAttrs()) {
                this.template.push(`${attributes.getComment(this.insertions.length)}`);
                this.insertions.push(...attributes.getDynamicAttrs().map(({value})=> value));
            }
            this.template.push(`<${tagName}${attributes.getAttrsForHTMLElement()}${path.node.selfClosing ? '/' : ''}>`);
        }
    }

    private addClosing(path: Closing) {
        this.closings.push(path);
        if(path.isJSXClosingElement() && t.isJSXIdentifier(path.node.name)) {
            if(!(/^[A-Z].+/.test(path.node.name.name))) {
                this.template.push(`</${path.node.name.name}>`);
            }
        }
    }

    private addText(path: NodePath<t.JSXText>) {
        this.template.push(path.node.value.trim());
    }

    private addExpression(path: NodePath<t.JSXExpressionContainer>) {
        if(t.isExpression(path.node.expression)) {
            this.template.push(`<!--${insertionPrefix}${this.insertions.length}-->`);
            this.insertions.push(path.node.expression);
        }
    }
}

type Attr = {name: string, value: t.Expression | t.StringLiteral | t.BooleanLiteral};

class Attributes {
    private attrs: Attr[] = [];
    constructor(attributes: Array<t.JSXAttribute | t.JSXSpreadAttribute>) {
        attributes.forEach((attr) => {
            if(t.isJSXAttribute(attr)) {
                this.processAttr(attr);
            }
        });
    }

    public getComment(offset: number) {

        const protoComments = this.getDynamicAttrs().map((attr, index) => {
            return {
                index: index + offset,
                name: attr.name,
                type: attr.name.startsWith('on') ? 'event' : 'attr'
            };
        });

        const comments = protoComments.map((protoComment) => {
            return protoComment.type === 'attr' ? `<!--${attrsPrefix}${protoComment.name}:${protoComment.index}-->` : `<!--@${protoComment.name.slice(2).toLowerCase()}:${protoComment.index}-->`;
        });

        return comments.join('');
    }

    public hasDynamicAttrs() {
        return this.getDynamicAttrs().length !== 0;
    }

    public getAttrs() {
        return this.attrs;
    }

    public getAttrsForHTMLElement() {
        return this.getStaticAttrs().map((attr) => `${attr.name}=${(attr.value as t.StringLiteral).value}`).join(' ');
    }

    public getStaticAttrs() {
        return this.attrs.filter((attr) => !t.isExpression(attr.value));
    }

    public getDynamicAttrs() {
        return this.attrs.filter((attr) => t.isExpression(attr.value));
    }

    private processAttr(attr: t.JSXAttribute) {
        const name = this.ensureName(attr);
        if(attr.value) {
            if(t.isStringLiteral(attr.value)) {
                this.attrs.push({name , value: attr.value});
            } else {
                this.attrs.push({name, value: this.getDynamicAttrValue(attr)});
            }
        } else {
            this.attrs.push({name, value: t.booleanLiteral(true)});
        }
    }

    private getDynamicAttrValue(attr: t.JSXAttribute) {
        const expration = (attr.value as t.JSXExpressionContainer).expression as t.Expression;
        return expration;
    }

    private ensureName(attr: t.JSXAttribute) {
        return t.isJSXIdentifier(attr.name) ? attr.name.name : attr.name.name.name;
    }
}
