import clearSet from '../../../../../role_classes/clearSet';
import setA from '../setA';

export default clearSet.registerAction(setA, {
  action({ actorsSet }) {
    actorsSet.clear();
  },
});
