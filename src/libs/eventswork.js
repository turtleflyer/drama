/**
 *   eventsStore structure:
 *  Map(
 *    [roleSet, Map(
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
 *    [element, { roleSet, types: Set of types }]
 *  )
 *
 */
const elementsMap = new Map();
const customEventTypes = new Set();
const onAddElementActionsMap = new Map();
const queueData = [];
const countTypesInQueue = new Map();
const exhaustTypesMap = new Map();
const routine = { interpretTarget: t => t };
const fireFromQueueType = Symbol('@@fireFromQueue');

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
function getSomeFromDeep(obj, key, create) {
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
  const deepMap = getSomeFromDeep(map, key, () => new Map());
  return { map: deepMap, next: getFromDeepMap.bind(null, deepMap) };
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

export function defineRoutine({ interpretTarget }) {
  if (interpretTarget) {
    routine.interpretTarget = interpretTarget;
  }
}

/**
 * Function returns the callback to attach to event listener
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
          roleSet: target ? elementsMap.get(target).belong : parent,
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

  return (event) => {
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
  const setOfTypes = getSomeFromDeep(elementEntry, 'types', () => new Set());
  if (!setOfTypes.has(type)) {
    if (routine.interpretTarget(target)) {
      routine.interpretTarget(target).addEventListener(type, getCallback(target, type));
    }
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
  if (!customEventTypes.has(type) && parent.size > 0) {
    const mapOfIDs = getFromDeepMap(eventsStore, parent).next(type).map;
    if (mapOfIDs.size === 0) {
      [...parent].forEach((element) => {
        // eslint-disable-next-line
        if (element instanceof RoleSet) {
          addCallbackToChildren(element, type);
        } else {
          addCallback(element, type);
        }
      });
    }
  }
}

const addElementType = Symbol('@@addElement');

registerEventType(addElementType);

/**
 * Function returns the list of types of events the ancestors
 * of the element have handles of whom.
 *
 * @param {EventsWork} context
 * @param {RoleSet} roleSet
 * @param {*[]} types
 * @returns {*[]}
 */
function combineTypes(roleSet, types) {
  let getTypes = types;
  if (!getTypes) {
    getTypes = [];
  }
  getTypes = getTypes.concat(
    [...getFromDeepMap(eventsStore, roleSet).map.keys()].filter(type => typeof type === 'string'),
  );
  const parentEntry = elementsMap.get(roleSet);
  if (parentEntry) {
    combineTypes(parentEntry.belong, getTypes);
  }
  return getTypes;
}

export class RoleSet extends Set {
  /**
   *Creates an instance of RoleSet.
   * @param {Set|Array} list
   */
  constructor(elements) {
    super(elements);
    if (elements) {
      elements.forEach((e) => {
        elementsMap.set(e, { belong: this });
      });
    }
    onAddElementActionsMap.set(this, () => {});
    // eslint-disable-next-line
    eventChain(
      {
        roleSet: this,
        type: addElementType,
        action: (...args) => {
          onAddElementActionsMap.get(this)(...args);
        },
      },
      Symbol('@@elementAdded'),
    );
  }

  /**
   *
   *
   * @param {Element} element
   */
  addElement(element) {
    this.add(element);
    const elementEntry = getSomeFromDeep(
      elementsMap,
      element,
      () => (element instanceof RoleSet ? {} : { types: new Set() }),
    );
    if (elementEntry.belong) {
      elementEntry.belong.delete(element);
    }
    elementEntry.belong = this;
    const types = combineTypes(this);
    types.forEach((type) => {
      if (element instanceof RoleSet) {
        addCallbackToChildren(element, type);
      } else {
        addCallback(element, type);
      }
    });
    // eslint-disable-next-line
    fireEvent(this, addElementType, { addedElement: element, stopPropagation: true });
  }

  deleteElement(element) {
    this.delete(element);
    elementsMap.get(element).belong = null;
  }

  clearElements() {
    [...this].forEach(e => this.deleteElement(e));
  }
}

const worker = new RoleSet([]);

export function setActionOnAddElement(roleSet, action) {
  onAddElementActionsMap.set(roleSet, action);
}

function invokePromiseHandle() {
  let promiseHandle;
  const promise = new Promise((resolve) => {
    promiseHandle = resolve;
  });
  return { promise, promiseHandle };
}

/**
 *
 *
 * @param {UnitClass} roleSet
 * @param {string} type
 * @param {Symbol} eventID
 * @returns
 * @memberof EventsWork
 */
function waitGroupEvent(roleSet, type, eventID) {
  const { promise, promiseHandle } = invokePromiseHandle();
  addCallbackToChildren(roleSet, type);
  getFromDeepMap(eventsStore, roleSet)
    .next(type)
    .map.set(eventID, promiseHandle);
  return promise;
}

/**
 *
 *
 * @param {(Element|UnitClass)} roleSet
 * @param {string} type
 * @param {Object} event
 * @memberof EventsWork
 */
export function fireEvent(roleSet, type, event) {
  if (roleSet instanceof RoleSet) {
    if (roleSet.size > 0) {
      [...roleSet].forEach((e) => {
        if (!event || !event.stopPropagation || !(e instanceof RoleSet)) {
          queueData.push({ target: e, type, event });
          const countType = countTypesInQueue.get(type);
          countTypesInQueue.set(type, countType ? countType + 1 : 1);
        }
      });
      fireEvent(worker, fireFromQueueType);
    } else {
      getCallback(null, type, roleSet)(event);
    }
  } else {
    getCallback(roleSet, type)(event);
  }
}

/**
 *
 *
 * @typedef {Onject} DataToAction
 * @property {Element} target
 * @property {Object} event
 * @property {Symbol} eventID
 * @property {UnitClass} roleSet
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
 * @property {UnitClass|Set} roleSet
 * @property {string} type
 * @property {ToDoIfFired} action
 * @property {?IfTerminate} checkIfTerminate
 */

/**
 * @param {ChainInit} description
 * @param {?Symbol} eventID
 * @returns {UnitClass}
 * @memberof EventsWork
 */
export function eventChain(description, eventID) {
  const {
    roleSet, type, action, typeRegistered,
  } = description;
  const checkIfTerminate = description.checkIfTerminate || (() => false);
  const memory = description.memory || {};
  const furtherDescription = { ...description, checkIfTerminate, memory };
  if (!(typeRegistered || typeof type === 'string' || customEventTypes.has(type))) {
    registerEventType(type);
    furtherDescription.typeRegistered = true;
  }
  let getId = eventID;
  if (!eventID) {
    getId = typeof type === 'string' ? Symbol(`@@${type}-event`) : type;
  }
  waitGroupEvent(roleSet, type, getId).then((data) => {
    if (
      checkIfTerminate({
        ...data,
        type,
        memory,
      })
    ) {
      eventsStore
        .get(roleSet)
        .get(type)
        .delete(getId);
    } else {
      action({
        ...data,
        type,
        memory,
      });
      eventChain(furtherDescription, data.eventID);
    }
  });
  return eventID;
}

export function waitWhenTypeExhausted(type) {
  const { promise, promiseHandle } = invokePromiseHandle();
  // Register the promise handle to exhaustTypesMap
  exhaustTypesMap.set(type, promiseHandle);
  return promise;
}

eventChain(
  {
    roleSet: worker,
    type: fireFromQueueType,
    action() {
      if (queueData.length > 0) {
        const { target, type, event } = queueData.shift();
        fireEvent(target, type, event);
        // Look if waitWhenTypeExhausted for this type has been activated
        const countType = countTypesInQueue.get(type) - 1;
        if (countType === 0 && exhaustTypesMap.has(type)) {
          // Fulfill the according promise sending the name of the type to it
          exhaustTypesMap.get(type)(type);
          exhaustTypesMap.delete(type);
        }
        countTypesInQueue.set(type, countType);
        // Next call of fireEvent of fireFomQueueType is doing asynchronously to make a chance to
        // fulfill the according promise and create the new one for the next target form the queue
        Promise.resolve().then(() => fireEvent(worker, fireFromQueueType));
      }
    },
  },
  Symbol('@@queue'),
);
