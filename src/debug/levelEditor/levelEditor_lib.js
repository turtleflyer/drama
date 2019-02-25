function traverseObjectStructure(action, condition) {
  return function (obj, ...args) {
    if (typeof obj !== 'object' || obj === null) {
      return action(obj, ...args);
    }
    const resObj = {};
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        if (condition(obj[key], key)) {
          resObj[key] = action(obj[key], ...args);
        } else {
          resObj[key] = traverseObjectStructure(action, condition)(obj[key], ...args);
        }
      }
    }
    return resObj;
  };
}

export const createObjStructureImage = traverseObjectStructure(
  obj => ({ value: obj }),
  (obj, key) => Array.isArray(obj) || key === 'mugsDistribution',
);

export const revertToOriginalStructure = traverseObjectStructure(
  obj => obj && obj.value,
  obj => obj && (obj.value || obj.value === null),
);
