function traverseObjectStructure(action) {
  return function (obj, ...args) {
    function goDeep(subObj) {
      if (typeof subObj === 'object' && subObj !== null && !Array.isArray(subObj)) {
        const resObj = {};
        for (const key in subObj) {
          if (Object.prototype.hasOwnProperty.call(subObj, key)) {
            resObj[key] = action(key, goDeep(subObj[key]), ...args);
          }
        }
        return resObj;
      }
      return action(null, subObj, ...args);
    }

    return goDeep(obj);
  };
}

export const createObjStructureImage = traverseObjectStructure((key, subObj) => {
  if (key === null) {
    return { value: subObj };
  }
  return subObj;
});

export const revertToOriginalStructure = traverseObjectStructure((_, subObj) => {
  if (subObj && (subObj.value || subObj.value === null)) {
    return subObj.value;
  }
  return subObj;
});
