import { calculateMutations } from './calculate-mutations';
function id(n: number) {
    return { id: n.toString() };
}

it('should calculate mutations', () => {
    const a = [id(1), id(2), id(3)];
    const b = [id(2), id(3), id(4)];
    const mutations = calculateMutations(a, b);
    expect(mutations).toEqual([
        { type: 'remove', order: 0 },
        { type: 'add', order: 2, value: id(4) },
    ]);
});


it('should calculate mutations with movement', () => {
    const a = [id(1), id(2), id(3)];
    const b = [id(3), id(1), id(2)];
    const mutations = calculateMutations(a, b);
    expect(mutations).toEqual([
        { type: 'move', fromPosition: 2, to: 0 }
    ]);
});
