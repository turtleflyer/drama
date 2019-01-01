// eslint-disable-next-line
export function makePlaceAbleHighlighting(cl) {
  const getObj = cl.prototype || cl;
  Object.defineProperties(getObj, {
    highlight: {
      value(toHighlight = true) {
        if (toHighlight) {
          this.node.style['background-color'] = 'rgba(255, 255, 255, 0.2)';
        } else {
          this.node.style['background-color'] = null;
        }
      },
    },
  });
}
