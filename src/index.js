/* eslint-env browser */
import './styles.css';
import './role_sets/stage';
import './role_sets/mugsOnLine';
import './supersets/setA';
import generateMugs from './roles/mugsOnLine_generateMugs';
import sendPulse from './roles/stage_sendPulse';

sendPulse.start();
generateMugs.start();
sendPulse.fireItself();
