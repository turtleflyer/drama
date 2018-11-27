import { ActorsSet, Actor } from '../../../libs/actors_and_roles';
import stage from '../../../role_sets/stage/stage';
import { objectivesParams } from '../assets/gameplay_params';

const postedSign = new Actor('div', objectivesParams.position, stage.scaleF).attachClassName(
  'objectives',
);

// eslint-disable-next-line
export const objectives = new ActorsSet();

objectives.name = 'objectives';

objectives.getInitializer(function () {
  postedSign.node.insertAdjacentHTML(
    'beforeend',
    `<p>The goal is to get</p><p class="objectives--money">${
      stage.params.levelParams.moneyToEarn
    }</p><p>before the night ends</p>`,
  );
  postedSign.getAppendedAsChild(stage);
  this.addElement(postedSign);
});
