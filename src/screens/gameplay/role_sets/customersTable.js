import { ActorsSet } from '../../../libs/actors_and_roles';
import CustomersTable from '../actor_classes/CustomersTable/CustomersTable';
import stage from '../../../role_sets/stage/stage';

// eslint-disable-next-line
export const customersTable = new ActorsSet();
customersTable.getInitializer(function () {
  this.addElement(new CustomersTable(stage));
});

customersTable.name = 'customersTable';
