import { injectDynamicValue } from './inject-dynamic-value';
import { injectStaticValue } from './inject-static-value';
import { isStaticInsertion, Unsubscriber, ValueInsertion } from './insertion';


export function insertValue(socket: Comment, valueInsertion: ValueInsertion): Unsubscriber {
    if(isStaticInsertion(valueInsertion)) {
        return injectStaticValue(socket, valueInsertion);
    } else {
        return injectDynamicValue(socket, valueInsertion);
    }
}
