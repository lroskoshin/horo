import { parseTemplate } from '../src/parser/parse-template';

describe('Join template', () => {
    const template = getTemplateChunks`
        <div>
            <span class="${undefined}" @click="${undefined}" id="foo"></span>
            <p>${undefined}</p>
        </div>
    `;
    const joinedTemplate = parseTemplate(template);
    it('Should be string', () => {
        expect(typeof joinedTemplate).toEqual('string');
    });

    it('Should have comment markers', () => {
        expect(joinedTemplate).toEqual(expect.stringContaining('<!--attrs:class:0-->'));
        expect(joinedTemplate).toEqual(expect.stringContaining('<!--@click:1-->'));
        expect(joinedTemplate).toEqual(expect.stringContaining('<!--insert:2-->'));
        expect(joinedTemplate).toEqual(expect.stringContaining('id="foo"'));
    });
});

function getTemplateChunks(template: TemplateStringsArray, ..._args: unknown[]) {
    return template;
}
