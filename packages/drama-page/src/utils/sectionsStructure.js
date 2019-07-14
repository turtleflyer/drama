// prettier-ignore
const sortKeysInObject = obj => Object.keys(obj)
  .sort((key1, key2) => obj[key1].orderIndex - obj[key2].orderIndex);

const supplyFreshPromise = () => {
  let resolver;
  return [
    new Promise((resolve) => {
      resolver = resolve;
    }),
    resolver,
  ];
};

const sortSections = () => {
  let [waitSorting, finishSorting] = supplyFreshPromise();
  let pathsOrder = {};
  let prevEntry;

  return [
    function sort(sections, parentPath) {
      if (!parentPath && !finishSorting) {
        [waitSorting, finishSorting] = supplyFreshPromise();
        prevEntry = undefined;
      }

      const sortedKeys = sortKeysInObject(sections);
      const sortedSections = {};

      // eslint-disable-next-line no-restricted-syntax
      for (const key of sortedKeys) {
        const value = { ...sections[key] };
        if (!value.noContent) {
          pathsOrder[key] = { prev: prevEntry };
          if (prevEntry) {
            pathsOrder[prevEntry.path].next = { path: key, title: value.title };
          }
          prevEntry = { path: key, title: value.title };
        }
        if (value.subsections) {
          value.subsections = sort(value.subsections, key);
        }
        sortedSections[key] = value;
      }

      if (!parentPath) {
        finishSorting(pathsOrder);
        finishSorting = null;
        pathsOrder = {};
      }

      return sortedSections;
    },
    path => waitSorting.then(order => ({ ...order[path] })),
  ];
};

const deepInStructure = (data, structure, remainingPath = '/', path = '') => {
  // Extracts first fragment which has a form '/aaa/'. For
  // string '/' takes the full string
  const nextRemainingPath = remainingPath.match(/^.{1}(.*?\/)?(.*)/)[2];
  const nextPath = path + remainingPath.slice(0, remainingPath.length - nextRemainingPath.length);
  const subSection = {
    orderIndex: 0,
    noContent: false,
    ...(structure[nextPath] || {}),
  };

  if (nextRemainingPath === '') {
    return { ...structure, [nextPath]: { ...subSection, ...data } };
  }

  return {
    ...structure,
    [nextPath]: {
      ...subSection,
      subsections: deepInStructure(data, subSection.subsections || {}, nextRemainingPath, nextPath),
    },
  };
};

const [sectionsStructure, siblingSections] = (() => {
  let lastData;
  let structure;
  const [sort, siblings] = sortSections();

  return [
    (edges) => {
      if (edges !== lastData) {
        const allSections = edges.reduce(
          (
            bringStructureMap,
            {
              node: {
                frontmatter: { title, orderIndex = 0, noContent },
                fields: { sectionPath = '/' },
              },
            },
          ) => deepInStructure(
            { title, orderIndex, noContent: noContent || false },
            bringStructureMap,
            sectionPath,
          ),
          {},
        );

        structure = sort(allSections);
        lastData = edges;
      }

      return structure;
    },
    siblings,
  ];
})();

export { sectionsStructure, siblingSections };
