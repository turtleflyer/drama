function removeSectionsPartFromPath(path) {
  return path.replace('/sections', '');
}

function extractBeforeFirstSlash(path) {
  return path.match(/\/.*?\//)[0];
}

module.exports = { removeSectionsPartFromPath, extractBeforeFirstSlash };
