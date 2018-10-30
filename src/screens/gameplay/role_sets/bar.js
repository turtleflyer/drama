import { ActorsSet } from '../../../libs/actors_and_roles';
import Bar from '../actor_classes/Bar/Bar';

const bar = new ActorsSet();
bar.getInitializer(function () {
  this.addElement(new Bar());
});

export default bar;
