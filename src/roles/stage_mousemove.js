/* eslint-env browser */
import mousemove from '../role_classes/mousemove';
import stage from '../role_sets/stage';

export default mousemove.registerAction(stage, {
  action({ target, event }) {
    console.log('mousemove');
    event.preventDefault();
    const { clientX, clientY } = event;
    const { scaleFactor } = target;
    fireEvent(getUnit('DragMug'), 'followMouse', {
      x: (clientX - this.position.x) / scaleFactor,
      y: (clientY - this.position.y) / scaleFactor,
    });
  },
});
