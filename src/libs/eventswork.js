/**
 *   eventsStore structure:
 *  Map(
 *    [roleSet, Map(
 *      [type, Map(
 *        [eventID, promiseHandle]
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
const exhaustTypesMap = new Map();
const routine = { interpretTarget: t => t };
const propagationKey = Symbol('propagationKey');
const nullKey = Symbol('@@eventswork/nullKey');
const parentKey = Symbol('@@eventswork/parentKey');

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

export function defineRoutine({ interpretTarget, defaultPropagation }) {
  Object.assign(routine, { interpretTarget, defaultPropagation });
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

export function managePropagation(event, option) {
  // eslint-disable-next-line
  const { stopBubbling, stopPropagatingNested } = option;
  if (!event[propagationKey]) {
    event[propagationKey] = {};
  }
  Object.assign(event[propagationKey], {
    // If stopBubbling is assigned true its value changes by empty set (still get true value)
    stopBubbling: stopBubbling ? new Set() : null,
    stopPropagatingNested,
  });
  return event;
}

export function stopBubbling(event = {}) {
  managePropagation(event, { stopBubbling: true });
  // eslint-disable-next-line
  event.stopPropagatingNested = stopPropagatingNested.bind(null, event);
  return event;
}

export function stopPropagatingNested(event = {}) {
  managePropagation(event, { stopPropagatingNested: true });
  event.stopBubbling = stopBubbling.bind(null, event);
  return event;
}

function applyDefaultPropagation(event) {
  if (!event[propagationKey]) {
    event[propagationKey] = {};
    const { defaultPropagation } = routine;
    if (defaultPropagation) {
      managePropagation(event, defaultPropagation);
    }
  }
  return event;
}

/**
 * Function returns the callback to attach to event listener
 *
 * @param {EventsWork} context
 * @param {Element} target
 * @param {*} type
 * @returns {callback}
 */
function getCallback(target, type) {
  // eslint-disable-next-line
  function stageCallback(target, type, event, ancestor) {
    let getAncestor = ancestor;
    if (!ancestor) {
      getAncestor = target[parentKey] || elementsMap.get(target).belong;
    }
    const mapOfTypes = getFromDeepMap(eventsStore, getAncestor).map;
    if (mapOfTypes.has(type)) {
      [...mapOfTypes.get(type).entries()].forEach((typeEntry) => {
        const [eventID, handle] = typeEntry;
        handle({
          target,
          roleSet: target[parentKey] || elementsMap.get(target).belong,
          type,
          event,
          eventID,
        });
      });
    }
    const grandAncestorEntry = elementsMap.get(getAncestor);
    if (grandAncestorEntry) {
      stageCallback(target, type, event, grandAncestorEntry.belong);
    }
  }

  return (event = {}) => {
    stageCallback(target, type, applyDefaultPropagation(event));
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
  if (parent.size > 0) {
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

const addElementEventType = Symbol('@@addElement');

registerEventType(addElementEventType);

/**
 * Function returns the list of types of events the ancestors
 * of the element have handles of whom.
 *
 * @param {EventsWork} context
 * @param {RoleSet} roleSet
 * @param {*[]} types
 * @returns {*[]}
 */
function combineTypes(roleSet, types = []) {
  let collectedTypes = types.concat(
    [...getFromDeepMap(eventsStore, roleSet).map.keys()].filter(type => typeof type === 'string'),
  );
  const parentEntry = elementsMap.get(roleSet);
  if (parentEntry) {
    collectedTypes = combineTypes(parentEntry.belong, collectedTypes);
  }
  return collectedTypes;
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
        type: addElementEventType,
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
    // prettier-ignore
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
    fireEvent(
      element,
      addElementEventType,
      managePropagation({}, { stopBubbling: true, stopPropagatingNested: true }),
    );
    return this;
  }

  deleteElement(element) {
    this.delete(element);
    elementsMap.get(element).belong = null;
    return this;
  }

  addElements(elements) {
    elements.forEach(e => this.addElement(e));
    return this;
  }

  clearElements() {
    [...this].forEach(e => this.deleteElement(e));
    return this;
  }
}

const worker = new RoleSet([]);
const fireFromQueueType = Symbol('@@eventswork/fireFromQueue');
const fireFromQueueId = Symbol('@@eventswork/fireFromQueueId');
const queueData = [];
const countTypesInQueue = new Map();

worker.name = '@@worker';

export function setActionOnAddElement(roleSet, action) {
  onAddElementActionsMap.set(roleSet, action);
  return roleSet;
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
  if (typeof type === 'string') {
    addCallbackToChildren(roleSet, type);
  }
  getFromDeepMap(eventsStore, roleSet)
    .next(type)
    .map.set(eventID, promiseHandle);
  return promise;
}

/**
 *
 *
 * @param {(Element|UnitClass)} target
 * @param {string} type
 * @param {Object} _event
 * @memberof EventsWork
 */
export function fireEvent(target, type, event = {}) {
  applyDefaultPropagation(event);
  if (target instanceof RoleSet) {
    let toProcess;
    if (target.size > 0) {
      toProcess = [...target];
    } else {
      // If target is empty RoleSet the object with signal property is passing to callback
      toProcess = [{ [nullKey]: true, [parentKey]: target }];
    }
    toProcess.forEach((e) => {
      if (!(event[propagationKey].stopPropagatingNested && e instanceof RoleSet)) {
        queueData.push({ target: e, type, event });
        const countType = countTypesInQueue.get(type);
        countTypesInQueue.set(type, countType ? countType + 1 : 1);
      }
    });
    getCallback({ [nullKey]: true, [parentKey]: worker }, fireFromQueueType)();
  } else {
    getCallback(target, type)(event);
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
  const furtherDescription = { ...description, checkIfTerminate };
  if (!(typeRegistered || typeof type === 'string' || customEventTypes.has(type))) {
    registerEventType(type);
    furtherDescription.typeRegistered = true;
  }
  let getID = eventID;
  if (!eventID) {
    getID = typeof type === 'string' ? Symbol(`${type}-eventID`) : Symbol(`${type.description}-eventID`);
  }
  waitGroupEvent(roleSet, type, getID).then((arg) => {
    const { target, event } = arg;
    // Check if target is subject of situation of preventing bubbling.
    // In this case we check if target was already processing.
    // So this is a criteria that further processing is a bubbling.
    if (event[propagationKey].stopBubbling && event[propagationKey].stopBubbling.has(target)) {
      eventChain(furtherDescription, getID);
    } else if (checkIfTerminate(arg)) {
      eventsStore
        .get(roleSet)
        .get(type)
        .delete(getID);
    } else {
      action(arg);
      if (event[propagationKey].stopBubbling) {
        event[propagationKey].stopBubbling.add(target);
      }
      eventChain(furtherDescription, getID);
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
        // prettier-ignore
        Promise.resolve().then(
          () => getCallback({ [nullKey]: true, [parentKey]: worker }, fireFromQueueType)(),
        );
      }
    },
  },
  fireFromQueueId,
);
