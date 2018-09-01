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
 * @class EventsWork
 */
class EventsWork {
  /**
   *Creates an instance of EventsWork.
   * @memberof EventsWork
   */
  constructor() {
    this.UnitClass = (() => {
      const upperThis = this;
      /**
       *
       *
       * @class Unit
       * @extends {Set}
       */
      return class Unit extends Set {
        /**
         *Creates an instance of Unit.
         * @param {Set} list
         */
        constructor(list) {
          const elements = [...list];
          super(elements);
          elements.forEach((element) => {
            upperThis.elementsMap.set(element, { belong: this });
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
          getTypes = getTypes.concat([...getFromDeepMap(upperThis.eventsStore, unit).map.keys()]);
          const parentEntry = upperThis.elementsMap.get(unit);
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
            upperThis.elementsMap,
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
              if (upperThis.customEventTypes.has(type) && !upperThis.customEventTypes.get(type)) {
                return;
              }
              upperThis.addCallbackToChildren(element, type);
            });
          } else {
            types.forEach((type) => {
              if (!this.customEventTypes.has(type)) {
                upperThis.addCallback(element, type);
              }
            });
          }
        }
      };
    })();

    Object.defineProperties(this, {
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
   * @param {EventsWork} context
   * @param {Element} target
   * @param {*} type
   * @returns {callback}
   */
  getCallback(target, type) {
    // eslint-disable-next-line no-shadow
    const stageCallback = (target, type, eventObj, parent) => {
      let getParent = parent;
      if (!parent) {
        getParent = this.elementsMap.get(target).belong;
      }
      const mapOfTypes = this.eventsStore.get(getParent);
      if (mapOfTypes.has(type)) {
        [...mapOfTypes.get(type).entries()].forEach((typeEntry) => {
          if (typeEntry) {
            const [eventID, handle] = typeEntry;
            handle({ target, event: eventObj, eventID });
          }
        });
      }
      const grandEntry = this.elementsMap.get(getParent);
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
  addCallback(target, type) {
    const elementEntry = this.elementsMap.get(target);
    const setOfTypes = getSome(elementEntry, 'types', () => new Set());
    if (!setOfTypes.has(type)) {
      target.addEventListener(type, this.getCallback(target, type));
      setOfTypes.add(type);
    }
  }

  /**
   *
   *
   * @param {UnitClass} parent
   * @param {string} type
   */
  addCallbackToChildren(parent, type) {
    const mapOfIDs = getFromDeepMap(this.eventsStore, parent).next(type).map;
    if (mapOfIDs.size === 0) {
      [...parent].forEach((element) => {
        if (element instanceof this.UnitClass) {
          this.addCallbackToChildren(element, type);
        } else if (!this.customEventTypes.has(type)) {
          this.addCallback(element, type);
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
  makeUnit(list) {
    return new this.UnitClass(list);
  }

  /**
   *
   *
   * @param {*} type
   * @param {Function} insetedSetListener
   * @memberof EventsWork
   */
  registerEventType(type) {
    this.customEventTypes.add(type);
  }

  /**
   *
   *
   * @param {(Element|UnitClass)} target
   * @param {string} type
   * @param {Object} eventObj
   * @memberof EventsWork
   */
  fireEvent(target, type, eventObj) {
    if (target instanceof this.UnitClass) {
      [...target].forEach(e => this.fireEvent(e, type, eventObj));
    } else {
      this.getCallback(target, type)(eventObj);
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
  waitGroupEvent(unit, type, eventID) {
    let promiseHandle;
    const promiseToGet = new Promise((resolve) => {
      promiseHandle = resolve;
    });

    this.addCallbackToChildren(unit, type);
    getFromDeepMap(this.eventsStore, unit)
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
  eventChain(description, eventID) {
    const { unit, type, action } = description;
    let getUnit = unit;
    if (!(unit instanceof this.UnitClass)) {
      getUnit = this.makeUnit(unit);
    }
    const terminate = description.terminate ? description.terminate : () => false;
    let getId = eventID;
    if (eventID === true || !eventID) {
      getId = Symbol(JSON.stringify(description));
    }
    this.waitGroupEvent(getUnit, type, getId).then((data) => {
      if (!terminate({ ...data, unit, type })) {
        action({ ...data, unit, type });
        this.eventChain(description, data.eventID);
      }
    });
    if (eventID === true) {
      this.fireEvent(unit, type);
    }
    return eventID;
  }
}

export default EventsWork;
