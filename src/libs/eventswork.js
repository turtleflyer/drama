class EventsWork {
  constructor() {
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
    this.eventsStore = new Map();

    /**
     *  elementsMap structure:
     *  Map(
     *    [element, { roleSet, types: Set of types }]
     *  )
     *
     */
    this.elementsMap = new Map();
    this.customEventTypes = new Set();
    this.onAddElementActionsMap = new Map();
    this.exhaustTypesMap = new Map();
    this.routine = { interpretTarget: t => t };
    this.propagationKey = Symbol('propagationKey');
    this.nullKey = Symbol('@@eventswork/nullKey');
    this.parentKey = Symbol('@@eventswork/parentKey');
    this.addElementEventType = Symbol('@@addElement');
    this.registerEventType(this.addElementEventType);
    this.RoleSet = this.invokeRoleSetClass();
    this.worker = new this.RoleSet([]);
    this.fireFromQueueType = Symbol('@@eventswork/fireFromQueue');
    this.fireFromQueueId = Symbol('@@eventswork/fireFromQueueId');
    this.queueData = [];
    this.countTypesInQueue = new Map();

    this.worker.name = '@@worker';

    this.eventChain(
      {
        roleSet: this.worker,
        type: this.fireFromQueueType,
        action: () => {
          if (this.queueData.length > 0) {
            const { target, type, event } = this.queueData.shift();
            this.fireEvent(target, type, event);

            // Look if waitWhenTypeExhausted for this type has been activated
            const countType = this.countTypesInQueue.get(type) - 1;
            if (countType === 0 && this.exhaustTypesMap.has(type)) {
              // Fulfill the according promise sending the name of the type to it
              this.exhaustTypesMap.get(type)(type);
              this.exhaustTypesMap.delete(type);
            }
            this.countTypesInQueue.set(type, countType);

            // Next call of fireEvent of fireFomQueueType is doing asynchronously to
            // make a chance to
            // fulfill the according promise and create the new one for
            // the next target form the queue
            // prettier-ignore
            Promise.resolve().then(
              () => this.getCallback(
                { [this.nullKey]: true, [this.parentKey]: this.worker },
                this.fireFromQueueType,
              )(),
            );
          }
        },
      },
      this.fireFromQueueId,
    );

    this.defineRoutine = this.defineRoutine.bind(this);
    this.managePropagation = this.managePropagation.bind(this);
    this.stopBubbling = this.stopBubbling.bind(this);
    this.stopPropagatingNested = this.stopPropagatingNested.bind(this);
    this.setActionOnAddElement = this.setActionOnAddElement.bind(this);
    this.fireEvent = this.fireEvent.bind(this);
    this.eventChain = this.eventChain.bind(this);
    this.waitWhenTypeExhausted = this.waitWhenTypeExhausted.bind(this);
  }

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
  static getSomeFromDeep(obj, key, create) {
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
  static getFromDeepMap(map, key) {
    const deepMap = EventsWork.getSomeFromDeep(map, key, () => new Map());
    return { map: deepMap, next: EventsWork.getFromDeepMap.bind(null, deepMap) };
  }

  defineRoutine({ interpretTarget, defaultPropagation }) {
    Object.assign(this.routine, { interpretTarget, defaultPropagation });
  }

  /**
   *
   *
   * @param {*} type
   * @memberof EventsWork
   */
  registerEventType(type) {
    this.customEventTypes.add(type);
  }

  managePropagation(event, option) {
    // eslint-disable-next-line
    const { stopBubbling, stopPropagatingNested } = option;
    if (!event[this.propagationKey]) {
      event[this.propagationKey] = {};
    }
    Object.assign(event[this.propagationKey], {
      // If stopBubbling is assigned true its value changes by empty set (still get true value)
      stopBubbling: stopBubbling ? new Set() : null,
      stopPropagatingNested,
    });
    return event;
  }

  stopBubbling(event = {}) {
    this.managePropagation(event, { stopBubbling: true });
    // eslint-disable-next-line
    event.stopPropagatingNested = this.stopPropagatingNested.bind(null, event);
    return event;
  }

  stopPropagatingNested(event = {}) {
    this.managePropagation(event, { stopPropagatingNested: true });
    event.stopBubbling = this.stopBubbling.bind(null, event);
    return event;
  }

  applyDefaultPropagation(event) {
    if (!event[this.propagationKey]) {
      event[this.propagationKey] = {};
      const { defaultPropagation } = this.routine;
      if (defaultPropagation) {
        this.managePropagation(event, defaultPropagation);
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
  getCallback(target, type) {
    // eslint-disable-next-line
    const stageCallback = (target, type, event, ancestor) => {
      let getAncestor = ancestor;
      if (!ancestor) {
        getAncestor = target[this.parentKey] || this.elementsMap.get(target).belong;
      }
      const mapOfTypes = EventsWork.getFromDeepMap(this.eventsStore, getAncestor).map;
      if (mapOfTypes.has(type)) {
        [...mapOfTypes.get(type).entries()].forEach((typeEntry) => {
          const [eventID, handle] = typeEntry;
          handle({
            target,
            roleSet: target[this.parentKey] || this.elementsMap.get(target).belong,
            type,
            event,
            eventID,
          });
        });
      }
      const grandAncestorEntry = this.elementsMap.get(getAncestor);
      if (grandAncestorEntry) {
        stageCallback(target, type, event, grandAncestorEntry.belong);
      }
    };

    return (event = {}) => {
      stageCallback(target, type, this.applyDefaultPropagation(event));
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
    const setOfTypes = EventsWork.getSomeFromDeep(elementEntry, 'types', () => new Set());
    if (!setOfTypes.has(type)) {
      if (this.routine.interpretTarget(target)) {
        this.routine.interpretTarget(target).addEventListener(type, this.getCallback(target, type));
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
  addCallbackToChildren(parent, type) {
    if (parent.size > 0) {
      const mapOfIDs = EventsWork.getFromDeepMap(this.eventsStore, parent).next(type).map;
      if (mapOfIDs.size === 0) {
        [...parent].forEach((element) => {
          // eslint-disable-next-line
          if (element instanceof RoleSet) {
            this.addCallbackToChildren(element, type);
          } else {
            this.addCallback(element, type);
          }
        });
      }
    }
  }

  /**
   * Function returns the list of types of events the ancestors
   * of the element have handles of whom.
   *
   * @param {EventsWork} context
   * @param {RoleSet} roleSet
   * @param {*[]} types
   * @returns {*[]}
   */
  combineTypes(roleSet, types = []) {
    let collectedTypes = types.concat(
      [...EventsWork.getFromDeepMap(this.eventsStore, roleSet).map.keys()].filter(
        type => typeof type === 'string',
      ),
    );
    const parentEntry = this.elementsMap.get(roleSet);
    if (parentEntry) {
      collectedTypes = this.combineTypes(parentEntry.belong, collectedTypes);
    }
    return collectedTypes;
  }

  invokeRoleSetClass() {
    const parentClass = this;

    return class RoleSet extends Set {
      /**
       *Creates an instance of RoleSet.
       * @param {Set|Array} list
       */
      constructor(elements) {
        super(elements);
        if (elements) {
          elements.forEach((e) => {
            parentClass.elementsMap.set(e, { belong: this });
          });
        }
        parentClass.onAddElementActionsMap.set(this, () => {});
        // eslint-disable-next-line
        parentClass.eventChain(
          {
            roleSet: this,
            type: parentClass.addElementEventType,
            action: (...args) => {
              parentClass.onAddElementActionsMap.get(this)(...args);
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
        const elementEntry = EventsWork.getSomeFromDeep(
          parentClass.elementsMap,
          element,
          () => (element instanceof RoleSet ? {} : { types: new Set() }),
        );
        if (elementEntry.belong) {
          elementEntry.belong.delete(element);
        }
        elementEntry.belong = this;
        const types = parentClass.combineTypes(this);
        types.forEach((type) => {
          if (element instanceof RoleSet) {
            parentClass.addCallbackToChildren(element, type);
          } else {
            parentClass.addCallback(element, type);
          }
        });
        // eslint-disable-next-line
        parentClass.fireEvent(
          new Set([element]),
          parentClass.addElementEventType,
          parentClass.managePropagation({}, { stopBubbling: true, stopPropagatingNested: true }),
        );
        return this;
      }

      deleteElement(element) {
        this.delete(element);
        parentClass.elementsMap.get(element).belong = null;
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
    };
  }

  setActionOnAddElement(roleSet, action) {
    this.onAddElementActionsMap.set(roleSet, action);
    return roleSet;
  }

  static invokePromiseHandle() {
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
  waitGroupEvent(roleSet, type, eventID) {
    const { promise, promiseHandle } = EventsWork.invokePromiseHandle();
    if (typeof type === 'string') {
      this.addCallbackToChildren(roleSet, type);
    }
    EventsWork.getFromDeepMap(this.eventsStore, roleSet)
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
  fireEvent(target, type, event = {}) {
    this.applyDefaultPropagation(event);
    if (target instanceof Set) {
      let toProcess;
      if (target.size > 0) {
        toProcess = [...target];
      } else {
        // If target is empty RoleSet the object with signal property is passing to callback
        toProcess = [{ [this.nullKey]: true, [this.parentKey]: target }];
      }
      toProcess.forEach((e) => {
        if (!(event[this.propagationKey].stopPropagatingNested && e instanceof RoleSet)) {
          this.queueData.push({ target: e, type, event });
          const countType = this.countTypesInQueue.get(type);
          this.countTypesInQueue.set(type, countType ? countType + 1 : 1);
        }
      });
      this.getCallback(
        { [this.nullKey]: true, [this.parentKey]: this.worker },
        this.fireFromQueueType,
      )();
    } else {
      this.getCallback(target, type)(event);
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
  eventChain(description, eventID) {
    const {
      roleSet, type, action, typeRegistered,
    } = description;
    const checkIfTerminate = description.checkIfTerminate || (() => false);
    const furtherDescription = { ...description, checkIfTerminate };
    if (!(typeRegistered || typeof type === 'string' || this.customEventTypes.has(type))) {
      this.registerEventType(type);
      furtherDescription.typeRegistered = true;
    }
    let getID = eventID;
    if (!eventID) {
      getID = typeof type === 'string'
        ? Symbol(`${type}-eventID`)
        : Symbol(`${type.description}-eventID`);
    }
    this.waitGroupEvent(roleSet, type, getID).then((arg) => {
      const { target, event } = arg;
      // Check if target is subject of situation of preventing bubbling.
      // In this case we check if target was already processing.
      // So this is a criteria that further processing is a bubbling.
      if (
        event[this.propagationKey].stopBubbling
        && event[this.propagationKey].stopBubbling.has(target)
      ) {
        this.eventChain(furtherDescription, getID);
      } else if (checkIfTerminate(arg)) {
        this.eventsStore
          .get(roleSet)
          .get(type)
          .delete(getID);
      } else {
        action(arg);
        if (event[this.propagationKey].stopBubbling) {
          event[this.propagationKey].stopBubbling.add(target);
        }
        this.eventChain(furtherDescription, getID);
      }
    });
    return eventID;
  }

  waitWhenTypeExhausted(type) {
    let getType = type;
    if (type === 'onAddElement') {
      getType = this.addElementEventType;
    }
    if (this.countTypesInQueue.get(getType)) {
      const { promise, promiseHandle } = EventsWork.invokePromiseHandle();
      // Register the promise handle to exhaustTypesMap
      this.exhaustTypesMap.set(getType, promiseHandle);
      return promise;
    }
    return Promise.resolve();
  }
}

const {
  RoleSet,
  defineRoutine,
  managePropagation,
  stopBubbling,
  stopPropagatingNested,
  setActionOnAddElement,
  fireEvent,
  eventChain,
  waitWhenTypeExhausted,
} = new EventsWork();

export default EventsWork;

export {
  RoleSet,
  defineRoutine,
  managePropagation,
  stopBubbling,
  stopPropagatingNested,
  setActionOnAddElement,
  fireEvent,
  eventChain,
  waitWhenTypeExhausted,
};
