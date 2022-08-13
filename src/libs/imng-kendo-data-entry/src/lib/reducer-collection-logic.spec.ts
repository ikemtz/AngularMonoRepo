import { addStateCollectionItem, removeStateCollectionItem, updateStateCollectionItem } from './reducer-collection-logic';

describe('Reducer Collection Logic', () => {
  let collection: { id: string, val: string; }[];
  beforeEach(() => {
    collection = [{ id: 'x', val: 'y' }, { id: 'a', val: 'b' }];
  });
  it('should updateStateCollectionItem', () => {
    const result = updateStateCollectionItem(collection, { id: 'x', val: 'z' });
    expect(result).toMatchSnapshot();
  });
  it('should updateStateCollectionItem with no match', () => {
    const result = updateStateCollectionItem(collection, { id: 'p', val: 'z' });
    expect(result).toMatchSnapshot();
  });
  it('should removeStateCollectionItem', () => {
    const result = removeStateCollectionItem(collection, { id: 'x', val: 'z' });
    expect(result).toMatchSnapshot();
  });
  it('should removeStateCollectionItem with no match', () => {
    const result = removeStateCollectionItem(collection, { id: 'u', val: 'z' });
    expect(result).toMatchSnapshot();
  });
  it('should addStateCollectionItem', () => {
    const result = addStateCollectionItem(collection, { id: 'u', val: 'z' });
    expect(result).toMatchSnapshot();
  });
});
