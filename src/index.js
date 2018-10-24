/* eslint-env browser */
import './styles.css';
import './role_sets/stage';
import './role_sets/mugsOnLine';
import './supersets/setA';
import mugsOnLineGenerateMugs from './roles/mugsOnLine_generateMugs';
import stageSendPulse from './roles/stage_sendPulse';
import mugsStartDrag from './roles/mugs_startDrag';
import dragMugFollowMouse from './roles/dragMug_followMouse';
import stageDrag from './roles/stage_drag';

stageSendPulse.start();
mugsOnLineGenerateMugs.start();
mugsStartDrag.start();
dragMugFollowMouse.start();
stageDrag.start();
stageSendPulse.fireItself();
