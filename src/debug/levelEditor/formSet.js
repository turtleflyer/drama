import { RoleSet, eventChain } from './eventswork_forms_export';

const formsSet = new RoleSet([]);
formsSet.name = 'formsSet';

export default formsSet;

export const formTypes = {
  FORM_TO_ACCEPT_VALUE: '@@formTypes/FORM_TO_ACCEPT_VALUE',
  FAUCETS_RELATED_FORM: '@@formTypes/FAUCETS_RELATED_FORM',
};

eventChain({
  roleSet: formsSet,
  type: 'submit',
  action({ event }) {
    event.preventDefault();
  },
});

eventChain({
  roleSet: formsSet,
  type: 'change',
  action({ target, event: { target: affectedForm } }) {
    const formUpdateMethods = {
      [formTypes.FORM_TO_ACCEPT_VALUE]: () => {
        target.value = affectedForm.value;
      },

      [formTypes.FAUCETS_RELATED_FORM]: () => {
        target.checkState(affectedForm.name, affectedForm.checked);
      },
    };
    formUpdateMethods[target.type]();
  },
});
