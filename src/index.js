/* eslint-env browser */
import './styles.css';
import stage from './role_sets/stage';
import mugsOnLine from './role_sets/mugsOnLine';
import setA from './supersets/setA';
import generateMugs from './roles/generateMugs';
import sendPulse from './roles/sendPulse';

// mugsOnLine.fill();
// setA.fill();
sendPulse.start();
generateMugs.start();
sendPulse.fireItself();

// console.log('sendPulse: ', sendPulse);
// console.log('generateMugs: ', generateMugs);
