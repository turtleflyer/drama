/* eslint-env jest */
/* eslint-disable global-require */

let sectionsStructure;

describe('Test sectionStructure function', () => {
  beforeEach(() => {
    sectionsStructure = require('../sectionsStructure').default;
  });

  test('Test 1', () => {
    const edges = [
      {
        node: {
          fields: {
            sectionPath: '/1/2/',
          },
          frontmatter: {
            title: '1-2',
          },
        },
      },
      {
        node: {
          fields: {
            sectionPath: '/1/3/',
          },
          frontmatter: {
            title: '1-3',
          },
        },
      },
      {
        node: {
          fields: {
            sectionPath: '/1/',
          },
          frontmatter: {
            title: '1',
          },
        },
      },
    ];

    const sections = sectionsStructure(edges);
    expect(sections).toEqual({
      '/1/': {
        noContent: false,
        orderIndex: 0,
        title: '1',
        subsections: {
          '/1/2/': {
            noContent: false,
            orderIndex: 0,
            title: '1-2',
          },
          '/1/3/': {
            noContent: false,
            orderIndex: 0,
            title: '1-3',
          },
        },
      },
    });
  });

  test('Test 2', () => {
    const edges = [
      {
        node: {
          fields: {
            sectionPath: '/1/2/',
          },
          frontmatter: {
            title: '1-2',
          },
        },
      },
      {
        node: {
          fields: {
            sectionPath: '/1/3/',
          },
          frontmatter: {
            title: '1-3',
          },
        },
      },
      {
        node: {
          fields: {
            sectionPath: '/1/',
          },
          frontmatter: {
            title: '1',
          },
        },
      },
      {
        node: {
          fields: {
            sectionPath: '/',
          },
          frontmatter: {
            title: '$',
          },
        },
      },
      {
        node: {
          fields: {
            sectionPath: '/2/2/',
          },
          frontmatter: {
            title: '2-2',
          },
        },
      },
      {
        node: {
          fields: {
            sectionPath: '/2/1/',
          },
          frontmatter: {
            title: '2-1',
          },
        },
      },
      {
        node: {
          fields: {
            sectionPath: '/2/2/1/',
          },
          frontmatter: {
            title: '2-2-1',
          },
        },
      },
      {
        node: {
          fields: {
            sectionPath: '/2/3/1/',
          },
          frontmatter: {
            title: '2-3-1',
          },
        },
      },
    ];

    const sections = sectionsStructure(edges);
    expect(sections).toEqual({
      '/': {
        noContent: false,
        orderIndex: 0,
        title: '$',
      },
      '/1/': {
        noContent: false,
        orderIndex: 0,
        title: '1',
        subsections: {
          '/1/2/': {
            noContent: false,
            orderIndex: 0,
            title: '1-2',
          },
          '/1/3/': {
            noContent: false,
            orderIndex: 0,
            title: '1-3',
          },
        },
      },
      '/2/': {
        noContent: false,
        orderIndex: 0,

        subsections: {
          '/2/1/': {
            noContent: false,
            orderIndex: 0,
            title: '2-1',
          },
          '/2/2/': {
            noContent: false,
            orderIndex: 0,
            title: '2-2',
            subsections: {
              '/2/2/1/': {
                noContent: false,
                orderIndex: 0,
                title: '2-2-1',
              },
            },
          },
          '/2/3/': {
            noContent: false,
            orderIndex: 0,

            subsections: {
              '/2/3/1/': {
                noContent: false,
                orderIndex: 0,
                title: '2-3-1',
              },
            },
          },
        },
      },
    });
  });

  test('Test 3', () => {
    const edges = [
      {
        node: {
          fields: {
            sectionPath: '/second_parent/article2/',
          },
          frontmatter: {
            title: 'Article 2',
            orderIndex: 3,
            noContent: false,
            extra: true,
          },
        },
      },
      {
        node: {
          fields: {
            sectionPath: '/second_parent/article1/',
          },
          frontmatter: {
            title: 'Article 1',
            orderIndex: 0,
            noContent: null,
          },
        },
      },
      {
        node: {
          fields: {
            sectionPath: '/second_parent/',
          },
          frontmatter: {
            title: 'Second parent',
            orderIndex: 4,
            noContent: false,
          },
        },
      },
      {
        node: {
          fields: {
            sectionPath: '/first_parent/',
          },
          frontmatter: {
            title: 'First parent',
            orderIndex: 1,
            noContent: true,
          },
        },
      },
      {
        node: {
          fields: {
            sectionPath: '/first_parent/note1/',
          },
          frontmatter: {
            title: 'Note 1',
            orderIndex: 10,
            noContent: null,
          },
        },
      },
      {
        node: {
          fields: {
            sectionPath: '/first_parent/note2/',
          },
          frontmatter: {
            title: 'Note 2',
            orderIndex: 14,
          },
        },
      },
      {
        node: {
          fields: {},
          frontmatter: {
            noContent: true,
          },
          extra: null,
        },
      },
    ];

    const sections = sectionsStructure(edges);
    expect(sections).toEqual({
      '/': {
        orderIndex: 0,
        noContent: true,
      },
      '/first_parent/': {
        title: 'First parent',
        orderIndex: 1,
        noContent: true,
        subsections: {
          '/first_parent/note1/': {
            title: 'Note 1',
            orderIndex: 10,
            noContent: false,
          },
          '/first_parent/note2/': {
            title: 'Note 2',
            orderIndex: 14,
            noContent: false,
          },
        },
      },
      '/second_parent/': {
        title: 'Second parent',
        orderIndex: 4,
        noContent: false,
        subsections: {
          '/second_parent/article1/': {
            title: 'Article 1',
            orderIndex: 0,
            noContent: false,
          },
          '/second_parent/article2/': {
            title: 'Article 2',
            orderIndex: 3,
            noContent: false,
          },
        },
      },
    });
    expect(Object.keys(sections)).toEqual(['/', '/first_parent/', '/second_parent/']);
    expect(Object.keys(sections['/first_parent/'].subsections)).toEqual([
      '/first_parent/note1/',
      '/first_parent/note2/',
    ]);
    expect(Object.keys(sections['/second_parent/'].subsections)).toEqual([
      '/second_parent/article1/',
      '/second_parent/article2/',
    ]);
  });

  test('Test 4', () => {
    const edges = [
      {
        node: {
          fields: { sectionPath: '/test-section/' },
          frontmatter: { title: 'Test Section', orderIndex: 1, noContent: null },
        },
      },
      {
        node: {
          fields: { sectionPath: '/test-section/test1/' },
          frontmatter: { title: 'Test 1', orderIndex: 1, noContent: null },
        },
      },
      {
        node: {
          fields: { sectionPath: '/test-section/test2/' },
          frontmatter: { title: 'Test 2', orderIndex: 1, noContent: null },
        },
      },
      {
        node: {
          fields: { sectionPath: '/examples/' },
          frontmatter: { title: 'Examples', orderIndex: 0, noContent: true },
        },
      },
      {
        node: {
          fields: { sectionPath: '/examples/test1/' },
          frontmatter: { title: 'Test 1', orderIndex: 1, noContent: null },
        },
      },
      {
        node: {
          fields: { sectionPath: '/test-section/other/' },
          frontmatter: { title: 'other', orderIndex: 0, noContent: null },
        },
      },
      {
        node: {
          fields: { sectionPath: '/examples/other/' },
          frontmatter: { title: 'other', orderIndex: 0, noContent: null },
        },
      },
    ];

    const sections = sectionsStructure(edges);
    expect(sections).toEqual({
      '/test-section/': {
        title: 'Test Section',
        orderIndex: 1,
        noContent: false,
        subsections: {
          '/test-section/test1/': {
            title: 'Test 1',
            orderIndex: 1,
            noContent: false,
          },
          '/test-section/test2/': { title: 'Test 2', orderIndex: 1, noContent: false },
          '/test-section/other/': { title: 'other', orderIndex: 0, noContent: false },
        },
      },
      '/examples/': {
        title: 'Examples',
        orderIndex: 0,
        noContent: true,
        subsections: {
          '/examples/test1/': { title: 'Test 1', orderIndex: 1, noContent: false },
          '/examples/other/': { title: 'other', orderIndex: 0, noContent: false },
        },
      },
    });
  });
});
