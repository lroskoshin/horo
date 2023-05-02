export type Mutation = Add | Remove | Move | RemoveAll | RemoveSlice;

export type ID = {
    id: string;
}

export type Remove = {
    type: 'remove';
    order: number;
}

export type RemoveAll = {
    type: 'removeAll';
}

export type Add = {
    type: 'add';
    order: number;
    value: ID;
}

export type Move = {
    type: 'move';
    fromPosition: number;
    to: number;
}

export type RemoveSlice = {
    type: 'removeSlice';
    from: number;
    to: number;
}
