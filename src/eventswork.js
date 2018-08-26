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

function getFromDeepMap(map, key) {
  const deepMap = getSome(map, key, () => new Map());
  return { map: deepMap, next: getFromDeepMap.bind(null, deepMap) };
}

function stageCallback(context, type, target, eventObj, parent) {
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
    stageCallback(context, type, target, eventObj, grandEntry.belong);
  }
}

function getCallback(context, type, target) {
  return function callback(eventObj) {
    stageCallback(context, type, target, eventObj);
  };
}

function addCallback(context, target, type) {
  const elementEntry = context.elementsMap.get(target);
  const setOfTypes = getSome(elementEntry, 'types', () => new Set());
  if (!setOfTypes.has(type)) {
    target.addEventListener(type, getCallback(context, type, target));
    setOfTypes.add(type);
  }
}

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

class Unit extends Set {
  constructor(context, list) {
    const elements = [...list];
    super(elements);
    this.context = context;
    elements.forEach((element) => {
      context.elementsMap.set(element, { belong: this });
    });
  }

  addElement(element) {
    this.add(element);
    const elementEntry = getSome(
      this.context.elementsMap,
      element,
      () => (element instanceof Unit ? {} : { types: new Set() }),
    );
    elementEntry.belong = this;
    combineTypes(this.context, this).forEach(type => addCallback(this.context, element, type));
  }

  deleteElement(element) {
    this.delete(element);
    const elementEntry = this.context.elementsMap.get(element);
    if (elementEntry && elementEntry.belong === this) {
      elementEntry.belong = null;
    }
  }
}

class EventsWork {
  constructor() {
    Object.defineProperties(this, {
      /*
       eventsStore structure:
      Map(
        [unit, Map(
          [type, Map(
            [id, [...resolve]]
          )]
        )]
      )
      */
      eventsStore: {
        value: new Map(),
      },

      /*
      elementsMap structure:
      Map(
        [element, { unit, types: Set of types }]
      )
      */
      elementsMap: {
        value: new Map(),
      },
      customEventTypes: {
        value: new Map(),
      },
    });

    this.makeUnit = this.makeUnit.bind(this);
    this.waitGroupEvent = this.waitGroupEvent.bind(this);
    this.eventChain = this.eventChain.bind(this);
  }

  makeUnit(list) {
    return new Unit(this, list);
  }

  waitGroupEvent(unit, { type, id }) {
    let promiseHandle;
    const promiseToGet = new Promise((resolve) => {
      promiseHandle = resolve;
    });

    const mapOfIDs = getFromDeepMap(this.eventsStore, unit).next(type).map;
    if (mapOfIDs.size === 0) {
      [...unit].forEach((element) => {
        addCallback(this, element, type);
      });
    }
    mapOfIDs.set(id, promiseHandle);

    return promiseToGet;
  }

  eventChain(description, id) {
    const { unit, type, action } = description;
    const terminate = description.terminate ? description.terminate : () => false;
    let getId = id;
    if (!id) {
      getId = Symbol(JSON.stringify(description));
    }
    this.waitGroupEvent(unit, { type, id: getId }).then((data) => {
      if (!terminate(data, description)) {
        action(data, description);
        this.eventChain(description, data.id);
      }
    });
  }
}

export default EventsWork;
