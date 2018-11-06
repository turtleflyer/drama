import { ActorsSet, Actor } from '../../../libs/actors_and_roles';
import Bar from '../actor_classes/Bar/Bar';

// eslint-disable-next-line
export const bar = new ActorsSet();
// bar.appendAsChild = function (actor) {
//   if (actor instanceof Actor) {
//     [...this].node.appendChild(actor.node);
//   } else {
//     throw new Error('@@...');
//   }
// };
bar.getInitializer(function () {
  this.addElement(new Bar());
});

bar.name = 'bar';
