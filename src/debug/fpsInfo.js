/* eslint-env browser */
import { ActorsSet } from '../libs/actors_and_roles';
import { updateDebugInfo, setD } from './setD';

const fpsInfo = document.createElement('div');
export default fpsInfo;
fpsInfo.style.color = 'orange';
fpsInfo.style['font-weight'] = 'bold';

const fpsSet = new ActorsSet([fpsInfo]);
fpsSet.name = 'fpsSet';
setD.addElement(fpsSet);

export const debugPulse = {};

function composeFpsInfo(prefix, data) {
  return `${prefix} ${
    data ? `${Math.round(data.averageFPS)}fps, min: ${Math.round(data.minFPS)}fps` : 'evaluating...'
  }`;
}

updateDebugInfo
  .registerAction(fpsSet, {
    action({ event: { fpsGen } }) {
      fpsInfo.innerText = `${composeFpsInfo('Generated fps:', debugPulse.info)}\r\n${composeFpsInfo(
        'Actual fps:',
        fpsGen && fpsGen.next(performance.now()).value,
      )}`;
    },
  })
  .start();
