function sortKeysInObject(obj) {
  return Object.keys(obj).sort((key1, key2) => obj[key1].orderIndex - obj[key2].orderIndex);
}

function sortSections(sections) {
  const sortedKeys = sortKeysInObject(sections);
  const sortedSections = {};

  // eslint-disable-next-line no-restricted-syntax
  for (const key of sortedKeys) {
    const value = { ...sections[key] };
    if (value.subsections) {
      value.subsections = sortSections(value.subsections);
    }
    sortedSections[key] = value;
  }

  return sortedSections;
}

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

function sectionsStructure(edges) {
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

  return sortSections(allSections);
}

export default sectionsStructure;
