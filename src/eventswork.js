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

/**
 *
 *
 * @param {EventsWork} context
 * @param {Element} target
 * @param {string} type
 * @returns {callback}
 */
function getCallback(context, target, type) {
  // eslint-disable-next-line no-shadow
  function stageCallback(context, target, type, eventObj, parent) {
    let getParent = parent;
    if (!parent) {
      getParent = context.elementsMap.get(target).belong;
    }
    const mapOfTypes = context.eventsStore.get(getParent);
    if (mapOfTypes.has(type)) {
      [...mapOfTypes.get(type).entries()].forEach((typeEntry) => {
        if (typeEntry) {
          const [id, handle] = typeEntry;
          handle({ target, event: eventObj, id });
        }
      });
    }
    const grandEntry = context.elementsMap.get(getParent);
    if (grandEntry) {
      stageCallback(context, target, type, eventObj, grandEntry.belong);
    }
  }

  return function callback(eventObj) {
    stageCallback(context, target, type, eventObj);
  };
}

/**
 *
 *
 * @param {EventsWork} context
 * @param {Element} target
 * @param {string} type
 */
function addCallback(context, target, type) {
  const elementEntry = context.elementsMap.get(target);
  const setOfTypes = getSome(elementEntry, 'types', () => new Set());
  if (!setOfTypes.has(type)) {
    target.addEventListener(type, getCallback(context, target, type));
    setOfTypes.add(type);
  }
}

/**
 *
 *
 * @param {EventsWork} context
 * @param {Unit} parent
 * @param {string} type
 */
function addCallbackToChildren(context, parent, type) {
  const mapOfIDs = getFromDeepMap(context.eventsStore, parent).next(type).map;
  if (mapOfIDs.size === 0) {
    [...parent].forEach((element) => {
      if (element instanceof Unit) {
        addCallbackToChildren(context, element, type);
      } else {
        addCallback(context, element, type);
      }
    });
  }
}

/**
 *
 *
 * @param {EventsWork} context
 * @param {Unit} unit
 * @param {string} types
 * @returns {string[]}
 */
function combineTypes(context, unit, types) {
  let getTypes = types;
  if (!getTypes) {
    getTypes = [];
  }
  getTypes = getTypes.concat([...getFromDeepMap(context.eventsStore, unit).map.keys()]);
  const parentEntry = context.elementsMap.get(unit);
  if (parentEntry) {
    combineTypes(context, parentEntry.belong, getTypes);
  }
  return getTypes;
}

/**
 *
 *
 * @class Unit
 * @extends {Set}
 */
class Unit extends Set {
  /**
   *Creates an instance of Unit.
   * @param {EventsWork} context
   * @param {Set} list
   * @memberof Unit
   */
  constructor(context, list) {
    const elements = [...list];
    super(elements);
    this.context = context;
    elements.forEach((element) => {
      context.elementsMap.set(element, { belong: this });
    });
  }

  /**
   *
   *
   * @param {Element} element
   * @memberof Unit
   */
  addElement(element) {
    this.add(element);
    const elementEntry = getSome(
      this.context.elementsMap,
      element,
      () => (element instanceof Unit ? {} : { types: new Set() }),
    );
    if (elementEntry.belong) {
      elementEntry.belong.delete(element);
    }
    elementEntry.belong = this;
    if (element instanceof Unit) {
      combineTypes(this.context, this).forEach(type => addCallbackToChildren(this.context, element, type));
    } else {
      combineTypes(this.context, this).forEach(type => addCallback(this.context, element, type));
    }
  }

  // deleteElement(element) {
  //   this.delete(element);
  //   const elementEntry = this.context.elementsMap.get(element);
  //   if (elementEntry && elementEntry.belong === this) {
  //     elementEntry.belong = null;
  //   }
  // }
}

/**
 *
 *
 * @class EventsWork
 */
class EventsWork {
  /**
   *Creates an instance of EventsWork.
   * @memberof EventsWork
   */
  constructor() {
    Object.defineProperties(this, {
      /**
       *   eventsStore structure:
       *  Map(
       *    [unit, Map(
       *      [type, Map(
       *        [id, [...resolve]]
       *      )]
       *    )]
       *  )
       */
      eventsStore: {
        value: new Map(),
      },

      /**
       *  elementsMap structure:
       *  Map(
       *    [element, { unit, types: Set of types }]
       *  )
       *
       */
      elementsMap: {
        value: new Map(),
      },
      customEventTypes: {
        value: new Set(),
      },
    });

    this.makeUnit = this.makeUnit.bind(this);
    this.registerEventType = this.registerEventType.bind(this);
    this.fireEvent = this.fireEvent.bind(this);
    this.waitGroupEvent = this.waitGroupEvent.bind(this);
    this.eventChain = this.eventChain.bind(this);
  }

  /**
   *
   *
   * @param {Set} list
   * @returns {Unit}
   * @memberof EventsWork
   */
  makeUnit(list) {
    return new Unit(this, list);
  }

  /**
   *
   *
   * @param {string} type
   * @memberof EventsWork
   */
  registerEventType(type) {
    this.customEventTypes.add(type);
  }

  /**
   *
   *
   * @param {(Element|Unit)} target
   * @param {string} type
   * @param {Object} eventObj
   * @memberof EventsWork
   */
  fireEvent(target, type, eventObj) {
    if (target instanceof Unit) {
      [...target].forEach(e => this.fireEvent(e, type, eventObj));
    } else {
      getCallback(this, target, type)(eventObj);
    }
  }

  /**
   *
   *
   * @param {Unit} unit
   * @param {string} type
   * @param {Symbol} id
   * @returns
   * @memberof EventsWork
   */
  waitGroupEvent(unit, type, id) {
    let promiseHandle;
    const promiseToGet = new Promise((resolve) => {
      promiseHandle = resolve;
    });

    if (!this.customEventTypes.has(type)) {
      addCallbackToChildren(this, unit, type);
    }
    getFromDeepMap(this.eventsStore, unit)
      .next(type)
      .map.set(id, promiseHandle);
    return promiseToGet;
  }

  /**
   *
   *
   * @typedef {Onject} DataToAction
   * @property {Element} target
   * @property {Object} event
   * @property {Symbol} id
   * @property {Unit} unit
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
   * @property {Unit|Set} unit
   * @property {string} type
   * @property {ToDoIfFired} action
   * @property {?IfTerminate} terminate
   */

  /**
   * @param {ChainInit} description
   * @param {?Symbol} id
   * @returns {Unit}
   * @memberof EventsWork
   */
  eventChain(description, id) {
    const { unit, type, action } = description;
    let getUnit = unit;
    if (!(unit instanceof Unit)) {
      getUnit = this.makeUnit(unit);
    }
    const terminate = description.terminate ? description.terminate : () => false;
    let getId = id;
    if (id === true || !id) {
      getId = Symbol(JSON.stringify(description));
    }
    this.waitGroupEvent(getUnit, type, getId).then((data) => {
      if (!terminate({ ...data, unit, type })) {
        action({ ...data, unit, type });
        this.eventChain(description, data.id);
      }
    });
    if (id === true) {
      [...unit].forEach(target => this.fireEvent(target, type));
    }
    return getUnit;
  }
}

export default EventsWork;
