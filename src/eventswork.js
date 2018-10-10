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
const unitsAddElementAction = new Map();
const queueData = new Map();
const routine = { interpretTarget: t => t, whenAddToUnit: () => {} };

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

function defineRoutine({ interpretTarget, whenAddToUnit }) {
  if (interpretTarget) {
    routine.interpretTarget = interpretTarget;
  }
  if (whenAddToUnit) {
    routine.whenAddToUnit = whenAddToUnit;
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
function getCallback(target, type, parent) {
  // eslint-disable-next-line
  function stageCallback(target, type, event, parent) {
    let getParent = parent;
    if (!parent) {
      getParent = elementsMap.get(target).belong;
    }
    const mapOfTypes = getFromDeepMap(eventsStore, getParent).map;
    if (mapOfTypes.has(type)) {
      [...mapOfTypes.get(type).entries()].forEach((typeEntry) => {
        const [eventID, handle] = typeEntry;
        handle({
          target,
          unit: target ? elementsMap.get(target).belong : parent,
          event,
          eventID,
        });
      });
    }
    const grandEntry = elementsMap.get(getParent);
    if (grandEntry) {
      stageCallback(target, type, event, grandEntry.belong);
    }
  }

  return function callback(event) {
    stageCallback(target, type, event, parent);
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
    routine.interpretTarget(target).addEventListener(type, getCallback(target, type));
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
  if (!customEventTypes.has(type)) {
    const mapOfIDs = getFromDeepMap(eventsStore, parent).next(type).map;
    if (mapOfIDs.size === 0) {
      [...parent].forEach((element) => {
        // eslint-disable-next-line
        if (element instanceof Unit) {
          addCallbackToChildren(element, type);
        } else {
          addCallback(element, type);
        }
      });
    }
  }
}

const addElementType = Symbol('@@addElement');

// eslint-disable-next-line
registerEventType(addElementType);

class Unit extends Set {
  /**
   *Creates an instance of Unit.
   * @param {Set|Array} list
   */
  constructor(list) {
    const elements = [...list];
    super(elements);
    elements.forEach((element) => {
      elementsMap.set(element, { belong: this });
    });
    unitsAddElementAction.set(this, () => {});
    // eslint-disable-next-line
    eventChain(
      {
        unit: this,
        type: addElementType,
        action: (...args) => {
          unitsAddElementAction.get(this)(...args);
        },
      },
      Symbol('@@elementAdded'),
    );
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
    routine.whenAddToUnit.bind(this)(element, elementEntry.belong);
    if (elementEntry.belong) {
      elementEntry.belong.delete(element);
    }
    elementEntry.belong = this;
    const types = Unit.combineTypes(this);
    if (element instanceof Unit) {
      types.forEach((type) => {
        addCallbackToChildren(element, type);
      });
    } else {
      types.forEach((type) => {
        if (!customEventTypes.has(type)) {
          addCallback(element, type);
        }
      });
    }
    // eslint-disable-next-line
    fireEvent(this, addElementType, { addedElement: element });
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

function setActionOnAddedElement(unit, action) {
  unitsAddElementAction.set(unit, action);
}

const worker = makeUnit([]);

const fireFromQueueType = Symbol('@@fireFromQueue');

// eslint-disable-next-line
registerEventType(fireFromQueueType);

// eslint-disable-next-line
eventChain(
  {
    unit: worker,
    type: fireFromQueueType,
    action: function fire() {
      const [nextE] = queueData.keys();
      if (nextE) {
        [...queueData.get(nextE).entries()].forEach(([type, event]) => {
          // eslint-disable-next-line
          fireEvent(nextE, type, event);
        });
        queueData.delete(nextE);
        // eslint-disable-next-line
        Promise.resolve().then(() => fireEvent(worker, fireFromQueueType));
      }
    },
  },
  Symbol('@@queue'),
);

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
 * @param {(Element|UnitClass)} unit
 * @param {string} type
 * @param {Object} event
 * @memberof EventsWork
 */
function fireEvent(unit, type, event) {
  if (unit instanceof Unit) {
    if (unit.size > 0) {
      [...unit].forEach((e) => {
        const mapOfTypes = getFromDeepMap(queueData, e).map;
        mapOfTypes.set(type, event);
      });
      fireEvent(worker, fireFromQueueType);
    } else {
      getCallback(null, type, unit)(event);
    }
  } else {
    getCallback(unit, type)(event);
  }
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
 * @typedef {Object} ChainInit
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
function eventChain(description, eventID, memory = {}) {
  const { unit, type, action } = description;
  const terminate = description.terminate ? description.terminate : () => false;
  let getId = eventID;
  if (!eventID) {
    getId = Symbol(`@@${type}-event`);
  }
  waitGroupEvent(unit, type, getId).then((data) => {
    if (
      terminate({
        ...data,
        type,
        memory,
      })
    ) {
      eventsStore
        .get(unit)
        .get(type)
        .delete(getId);
    } else {
      action({
        ...data,
        type,
        memory,
      });
      eventChain(description, data.eventID, memory);
    }
  });
  return eventID;
}

export {
  defineRoutine,
  makeUnit,
  setActionOnAddedElement,
  registerEventType,
  fireEvent,
  eventChain,
};
