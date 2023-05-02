import { useList } from './use-list';

function id(n: number) {
  return { id: n.toString() };
}

describe('useList', () => {
  it('should return the same list if the list is the same', () => {
    const list = [id(1), id(2), id(3)];
    const result = useList(list);
    expect(result.current).toBe(list);
  });
  
  it('should remove an item', () => {
    const list = [id(1), id(2), id(3)];
    const fn = jest.fn();
    const result = useList(list);
    result.mutations(fn);
    result.remove('2');
    expect(result.current).toEqual([id(1), id(3)]);
    expect(fn).toHaveBeenCalledWith([{ type: 'remove', order: 1 }]);
  });
  
  it('should remove all items', () => {
    const list = [id(1), id(2), id(3)];
    const fn = jest.fn();
    const result = useList(list);
    result.mutations(fn);
    result.removeAll();
    expect(result.current).toEqual([]);
    expect(fn).toHaveBeenCalledWith([{ type: 'removeAll' }]);
  });
  
  it('should remove a slice of items', () => {
    const list = [id(1), id(2), id(3), id(4), id(5)];
    const fn = jest.fn();
    const result = useList(list);
    result.mutations(fn);
    result.removeSlice(1, 4);
    expect(result.current).toEqual([id(1), id(5)]);
    expect(fn).toHaveBeenCalledWith([{ type: 'removeSlice', from: 1, to: 4 }]);
  });
  
  it('should add an item', () => {
    const list = [id(1), id(2), id(3)];
    const fn = jest.fn();
    const result = useList(list);
    result.mutations(fn);
    result.add(id(4), 1);
    expect(result.current).toEqual([id(1), id(4), id(2), id(3)]);
    expect(fn).toHaveBeenCalledWith([{ type: 'add', order: 1, value: id(4) }]);
  });
  
  it('should move an item', () => {
    const list = [id(1), id(2), id(3)];
    const fn = jest.fn();
    const result = useList(list);
    result.mutations(fn);
    result.move(1, 2);
    expect(result.current).toEqual([id(1), id(3), id(2)]);
    expect(fn).toHaveBeenCalledWith([{ type: 'move', fromPosition: 1, to: 2 }]);
  });
});
