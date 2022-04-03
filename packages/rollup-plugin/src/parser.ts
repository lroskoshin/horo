import { parse } from '@babel/parser';
import generate from '@babel/generator';
import { Plugin } from 'rollup';
import { recursiveParsing } from './recursive-parsing';
import { addHoroImport } from './add-horo-import';


export function parser(): Plugin {
    
    return  {
        name: 'horo-parser',
        transform(code, id) {
            if((/\.[jt]sx/).test(id)) {
                const ast = parse(code, {
                    sourceType: 'module',
                    plugins: ['jsx', 'typescript', 'importAssertions']
                });

                const stack = recursiveParsing(ast);
                
                for(let i = stack.length - 1; i >= 0; i--) {
                    const component = stack[i];
                    component.root.replaceWith(component.getComponent());
                }

                if(stack.length) {
                    addHoroImport(ast);
                }
                
                return generate(ast, {
                    jsescOption: {
                        quotes: 'single'
                    }
                });
            }
            
            return code;
        }
    };
}
