import { ActorsSet } from '../../../libs/actors_and_roles';
import Bar from '../actor_classes/Bar/Bar';
import stage from '../../../role_sets/stage/stage';

// eslint-disable-next-line
export const bar = new ActorsSet();
bar.getInitializer(function () {
  this.addElement(new Bar(stage));
});
bar.stage = stage;

bar.name = 'bar';
