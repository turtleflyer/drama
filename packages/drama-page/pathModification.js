function removeSectionsPartFromPath(path) {
  return path.replace('/sections', '');
}

function extractBeforeFirstSlash(path) {
  const extract = path.match(/\/.*?\//);
  return extract && extract[0];
}

module.exports = { removeSectionsPartFromPath, extractBeforeFirstSlash };
