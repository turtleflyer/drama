const eventsStore = new Map();
const customEventTypes = new Map();

// function waitEvent(arg, { type }) {
//   let nodes = arg;
//   if (!Array.isArray(arg)) {
//     nodes = [arg];
//   }

//   const proms = nodes.map((n) => {
//     let nodeData = eventsStore.get(n);
//     if (!nodeData) {
//       nodeData = new Map();
//       eventsStore.set(n, nodeData);
//     }
//     let entry = nodeData.get(type);
//     if (!entry) {
//       entry = {};
//       nodeData.set(type, entry);
//     }
//     const { promise, handle } = entry;
//     if (!promise) {
//       entry.promise = new Promise((resolve) => {
//         entry.handle = resolve;
//       });
//       if (!handle) {
//         const callback = (e) => {
//           nodeData.get(type).handle({ node: n, event: e });
//         };
//         n.addEventListener(type, callback);
//       }
//     }
//     return entry.promise;
//   });
//   return Promise.race(proms);
// }

function waitGroupEvent(arg, { id, type }) {
  let nodes = arg;
  if (!Array.isArray(arg)) {
    nodes = [arg];
  }

  let newPromiseHandle;
  const promiseToGet = new Promise((resolve) => {
    newPromiseHandle = resolve;
  });

  nodes.forEach((n) => {
    let nodeData = eventsStore.get(n);
    if (!nodeData) {
      nodeData = new Map();
      eventsStore.set(n, nodeData);
    }

    let handles = nodeData.get(type);
    if (!handles) {
      handles = new Map();
      nodeData.set(type, handles);
      n.addEventListener(type, (e) => {
        [...nodeData.get(type).values()].forEach(handle => handle({ node: n, event: e, id }));
      });
    }
    handles.set(id, newPromiseHandle);
  });

  return promiseToGet;
}

export { waitGroupEvent };
