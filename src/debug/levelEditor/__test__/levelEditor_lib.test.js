import { createObjStructureImage, revertToOriginalStructure } from '../levelEditor_lib';

/* eslint-env jest */
describe('Testing object structure traversing library', () => {
  test('should create object structure image', () => {
    expect(createObjStructureImage({ a: 'foo' })).toEqual({ a: { value: 'foo' } });
    expect(createObjStructureImage({ a: 'foo', b: 'bar' })).toEqual({
      a: { value: 'foo' },
      b: { value: 'bar' },
    });
    expect(createObjStructureImage({ a: 'foo', b: { c: 'bar' } })).toEqual({
      a: { value: 'foo' },
      b: { c: { value: 'bar' } },
    });
    expect(createObjStructureImage({ a: null })).toEqual({ a: { value: null } });
    expect(createObjStructureImage({ a: null, b: { c: ['foo', 'bar'] } })).toEqual({
      a: { value: null },
      b: { c: { value: ['foo', 'bar'] } },
    });
  });

  test('should revert to original structure', () => {
    expect(revertToOriginalStructure({ a: { value: 'foo' } })).toEqual({ a: 'foo' });
    expect(
      revertToOriginalStructure({
        a: { value: 'foo' },
        b: { value: 'bar' },
      }),
    ).toEqual({ a: 'foo', b: 'bar' });
    expect(
      revertToOriginalStructure({
        a: { value: 'foo' },
        b: { c: { value: 'bar' } },
      }),
    ).toEqual({ a: 'foo', b: { c: 'bar' } });
    expect(revertToOriginalStructure({ a: { value: null } })).toEqual({ a: null });
    expect(
      revertToOriginalStructure({
        a: { value: null },
        b: { c: { value: ['foo', 'bar'] } },
      }),
    ).toEqual({ a: null, b: { c: ['foo', 'bar'] } });
  });
});
