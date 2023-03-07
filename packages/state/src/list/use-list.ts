import { calculateMutations } from './calculate-mutations';
import { ID, Mutation } from './mutatuions';

type Listener = (mutations: Mutation[]) => void;
export function useList(init: ID[]) {
    const listeners: Listener[] = [];
    let list = init;
    const emit = (mutations: Mutation[]) => {
        listeners.forEach(listener => listener(mutations));
    };
    return {
        get current() {
            return list;
        },
        swap(newList: ID[]) {
            const mutations = calculateMutations(list, newList);
            emit(mutations);
            list = newList;
        },
        mutations(listener: Listener) {
            listeners.push(listener);
            return {
                unsubscribe() {
                    const index = listeners.indexOf(listener);
                    if (index !== -1) {
                        listeners.splice(index, 1);
                    }
                },
            };
        },
        remove(id: string) {
            const index = list.findIndex(item => item.id === id);
            if (index !== -1) {
                list.splice(index, 1);
                emit([{ type: 'remove', order: index }]);
            }
        },
        removeAll() {
            list = [];
            emit([{ type: 'removeAll' }]);
        },
        removeSlice(from: number, to: number) {
            list.splice(from, to - from);
            emit([{ type: 'removeSlice', from, to }]);
        },
        add(item: ID, index: number) {
            list.splice(index, 0, item);
            emit([{ type: 'add', order: index, value: item }]);
        },
        move(from: number, to: number) {
            const item = list[from];
            list.splice(from, 1);
            list.splice(to, 0, item);
            emit([{ type: 'move', fromPosition: from, to }]);
        }
    };
}
