import { ID, Move, Mutation } from './mutatuions';

export function calculateMutations(oldState: ID[], newState:ID[]): Mutation[] {
    const mutations: Mutation[] = [];
    const moved: Move[] = [];

    const oldStateOrdered = toOrdered(oldState);
    const newStateOrdered = toOrdered(newState);
    let oldIndex = 0;
    let newIndex = 0;
    while (oldIndex < oldState.length || newIndex < newState.length) {
        const oldItem = oldState[oldIndex];
        const newItem = newState[newIndex];
        const oldItemInNewState = oldItem ? newStateOrdered[oldItem.id] : -1;
        const newItemInOldState = newItem ? oldStateOrdered[newItem.id] : -1;

        if (oldItemInNewState === undefined) {
            mutations.push({
                type: 'remove',
                order: oldIndex,
            });
            oldIndex++;
            continue;
        }
        if (newItemInOldState === undefined) {
            mutations.push({
                type: 'add',
                order: newIndex,
                value: newItem,
            });
            newIndex++;
            continue;
        }
        if (oldItemInNewState > newIndex && newItemInOldState !== oldIndex) {
            moved.push({
                type: 'move',
                fromPosition: newItemInOldState,
                to: newIndex,
            });
            newIndex++;
            continue;
        }

        newIndex++;
        oldIndex++;
    }
    return mutations.concat(moved);
}

function toOrdered(a: ID[]) {
    const ordered: Record<string, number> = {};
    for(const index in a) {
        ordered[a[index].id] = Number(index);
    }
    return ordered;
}
