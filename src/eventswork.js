/**
 *   eventsStore structure:
 *  Map(
 *    [unit, Map(
 *      [type, Map(
 *        [eventID, [...resolve]]
 *      )]
 *    )]
 *  )
 */
const eventsStore = new Map();

/**
 *  elementsMap structure:
 *  Map(
 *    [element, { unit, types: Set of types }]
 *  )
 *
 */
const elementsMap = new Map();
const customEventTypes = new Set();
const registeredUnites = new Map();

/**
 *
 *
 * @function
 * @name whatToDo
 * @returns {*}
 */

/**
 *
 *
 * @param {Onject|Map} obj
 * @param {*} key
 * @param {whatToDo} create
 * @returns
 */
function getSome(obj, key, create) {
  let toGet;
  if (obj instanceof Map) {
    toGet = obj.get(key);
  } else {
    toGet = obj[key];
  }
  if (!toGet) {
    toGet = create();
    if (obj instanceof Map) {
      obj.set(key, toGet);
    } else {
      // eslint-disable-next-line
      obj[key] = toGet;
    }
  }
  return toGet;
}

/**
 *
 *
 * @typedef {Object} Returned
 * @property {Map} map
 * @property {getFromDeepMap.bind} next
 */

/**
 *
 *
 * @param {Map} map
 * @param {*} key
 * @returns {Returned}
 *
 */
function getFromDeepMap(map, key) {
  const deepMap = getSome(map, key, () => new Map());
  return { map: deepMap, next: getFromDeepMap.bind(null, deepMap) };
}

class Unit extends Set {
  /**
   *Creates an instance of Unit.
   * @param {Set} list
   */
  constructor(list) {
    const elements = [...list];
    super(elements);
    elements.forEach((element) => {
      elementsMap.set(element, { belong: this });
    });
  }

  /**
   *
   *
   * @param {EventsWork} context
   * @param {Unit} unit
   * @param {*[]} types
   * @returns {*[]}
   */
  static combineTypes(unit, types) {
    let getTypes = types;
    if (!getTypes) {
      getTypes = [];
    }
    getTypes = getTypes.concat([...getFromDeepMap(eventsStore, unit).map.keys()]);
    const parentEntry = elementsMap.get(unit);
    if (parentEntry) {
      Unit.combineTypes(parentEntry.belong, getTypes);
    }
    return getTypes;
  }

  /**
   *
   *
   * @param {Element} element
   */
  addElement(element) {
    this.add(element);
    const elementEntry = getSome(
      elementsMap,
      element,
      () => (element instanceof Unit ? {} : { types: new Set() }),
    );
    if (elementEntry.belong) {
      elementEntry.belong.delete(element);
    }
    elementEntry.belong = this;
    const types = Unit.combineTypes(this);
    if (element instanceof Unit) {
      types.forEach((type) => {
        if (customEventTypes.has(type) && !customEventTypes.get(type)) {
          return;
        }
        addCallbackToChildren(element, type);
      });
    } else {
      types.forEach((type) => {
        if (!this.customEventTypes.has(type)) {
          addCallback(element, type);
        }
      });
    }
  }
}

/**
 *
 *
 * @param {EventsWork} context
 * @param {Element} target
 * @param {*} type
 * @returns {callback}
 */
function getCallback(target, type) {
  // eslint-disable-next-line no-shadow
  const stageCallback = (target, type, eventObj, parent) => {
    let getParent = parent;
    if (!parent) {
      getParent = elementsMap.get(target).belong;
    }
    const mapOfTypes = eventsStore.get(getParent);
    if (mapOfTypes.has(type)) {
      [...mapOfTypes.get(type).entries()].forEach((typeEntry) => {
        if (typeEntry) {
          const [eventID, handle] = typeEntry;
          handle({ target, event: eventObj, eventID });
        }
      });
    }
    const grandEntry = elementsMap.get(getParent);
    if (grandEntry) {
      stageCallback(target, type, eventObj, grandEntry.belong);
    }
  };

  return function callback(eventObj) {
    stageCallback(target, type, eventObj);
  };
}

/**
 *
 *
 * @param {EventsWork} this
 * @param {Element} target
 * @param {string} type
 */
function addCallback(target, type) {
  const elementEntry = elementsMap.get(target);
  const setOfTypes = getSome(elementEntry, 'types', () => new Set());
  if (!setOfTypes.has(type)) {
    target.addEventListener(type, getCallback(target, type));
    setOfTypes.add(type);
  }
}

/**
 *
 *
 * @param {UnitClass} parent
 * @param {string} type
 */
function addCallbackToChildren(parent, type) {
  const mapOfIDs = getFromDeepMap(eventsStore, parent).next(type).map;
  if (mapOfIDs.size === 0) {
    [...parent].forEach((element) => {
      if (element instanceof Unit) {
        addCallbackToChildren(element, type);
      } else if (!customEventTypes.has(type)) {
        addCallback(element, type);
      }
    });
  }
}

/**
 *
 *
 * @param {Set} list
 * @returns {UnitClass}
 * @memberof EventsWork
 */
function makeUnit(list) {
  return new Unit(list);
}

function registerUnit(unit, name) {
  let getUnit = unit;
  if (!(unit instanceof Unit)) {
    getUnit = new Unit(unit);
  }
  registeredUnites.set(name, getUnit);
  return getUnit;
}

function getRegisteredUnit(name) {
  return registeredUnites.get(name);
}

/**
 *
 *
 * @param {*} type
 * @memberof EventsWork
 */
function registerEventType(type) {
  customEventTypes.add(type);
}

/**
 *
 *
 * @param {(Element|UnitClass)} target
 * @param {string} type
 * @param {Object} eventObj
 * @memberof EventsWork
 */
function fireEvent(target, type, eventObj) {
  if (target instanceof Unit) {
    [...target].forEach(e => fireEvent(e, type, eventObj));
  } else {
    getCallback(target, type)(eventObj);
  }
}

/**
 *
 *
 * @param {UnitClass} unit
 * @param {string} type
 * @param {Symbol} eventID
 * @returns
 * @memberof EventsWork
 */
function waitGroupEvent(unit, type, eventID) {
  let promiseHandle;
  const promiseToGet = new Promise((resolve) => {
    promiseHandle = resolve;
  });

  addCallbackToChildren(unit, type);
  getFromDeepMap(eventsStore, unit)
    .next(type)
    .map.set(eventID, promiseHandle);
  return promiseToGet;
}

/**
 *
 *
 * @typedef {Onject} DataToAction
 * @property {Element} target
 * @property {Object} event
 * @property {Symbol} eventID
 * @property {UnitClass} unit
 * @property {string} type
 */

/**
 * @function
 * @name ToDoIfFired
 * @param {DataToAction} sendToAct
 */

/**
 * @function
 * @name IfTerminate
 * @param {DataToAction} analyzeIt
 */

/**
 * @typedef {Onject} ChainInit
 * @property {UnitClass|Set} unit
 * @property {string} type
 * @property {ToDoIfFired} action
 * @property {?IfTerminate} terminate
 */

/**
 * @param {ChainInit} description
 * @param {?Symbol} eventID
 * @returns {UnitClass}
 * @memberof EventsWork
 */
function eventChain(description, eventID) {
  const memory = {};
  const { unit, type, action } = description;
  let getUnit = unit;
  if (!(unit instanceof Unit)) {
    getUnit = makeUnit(unit);
  }
  const terminate = description.terminate ? description.terminate : () => false;
  let getId = eventID;
  if (eventID === true || !eventID) {
    getId = Symbol(JSON.stringify(description));
  }
  waitGroupEvent(getUnit, type, getId).then((data) => {
    if (!terminate({ ...data, unit, type })) {
      action({ ...data, unit, type, memory });
      eventChain(description, data.eventID);
    }
  });
  if (eventID === true) {
    fireEvent(unit, type);
  }
  return eventID;
}

export {
  makeUnit, registerUnit, getRegisteredUnit, registerEventType, fireEvent, eventChain,
};
