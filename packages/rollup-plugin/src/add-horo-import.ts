import { ParseResult } from '@babel/parser';
import { File } from '@babel/types';
import babelTemplate from '@babel/template';

export function addHoroImport(ast: ParseResult<File>) {
    const buildRequired = babelTemplate('import {makeComponent} from "@horo/core"');
    const statement = buildRequired();
    ast.program.body.unshift(...(Array.isArray(statement) ? statement : [statement]));
}
