import { RolesManipulator } from '../../../libs/actors_and_roles';
import generateMugs from '../role_sets/mugsOnLine/roles/generateMugs';
import { draggingMug } from '../role_sets/dragMug';
import { drag } from '../../../role_sets/stage/stage_roles';
import { startDrag } from '../supersets/mugs';
import { dropMug } from '../supersets/dropPlaces';

export default new RolesManipulator([draggingMug, startDrag, generateMugs, drag, dropMug]);
