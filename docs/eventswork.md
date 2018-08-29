## Usage

```js
import EventsWork from './eventswork';

const { makeUnit, registerEventType, fireEvent, eventChain } = new EventsWork();
```

```js
/**
 * @param {Set} list
 * @returns {Unit}
 * @memberof EventsWork
 */
makeUnit(list);
```

```js
/**
 * @param {string} type
 * @memberof EventsWork
 */
registerEventType(type);
```

```js
/**
 * @param {(Element|Unit)} target
 * @param {string} type
 * @param {Object} eventObj
 * @memberof EventsWork
 */
fireEvent(target, type, eventObj);
```

```js
/**
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
 * @param {Symbol} id
 * @returns {Unit}
 * @memberof EventsWork
 */
eventChain(description, id);
```
