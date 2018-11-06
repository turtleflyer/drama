import { ActorsSet } from '../../../libs/actors_and_roles';
import CustomersTable from '../actor_classes/CustomersTable/CustomersTable';

const customersTable = new ActorsSet();
customersTable.getInitializer(function () {
  this.addElement(new CustomersTable());
});

customersTable.name = 'customersTable';

export default customersTable;
