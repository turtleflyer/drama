/* eslint-env browser */
import { GameActor, parseDescription, getUnit } from '../gamelibrary';
import { fireEvent } from '../eventswork';
import { switchTypes } from '../usingparams';

export default parseDescription({
  FaucetSwitches: {
    nested() {
      return [...getUnit('Faucets')].map((f) => {
        const div = document.createElement('div');
        f.node.appendChild(div);
        const faucetSwitch = new GameActor(div, f.switchPlace);
        faucetSwitch.faucet = f;
        f.switch = faucetSwitch;
        return faucetSwitch;
      });
    },

    mechanism: {
      switchState: {
        type: 'click',
        action({ target, event }) {
          console.log('click');
          event.preventDefault();
          event.stopPropagation();
          const { faucet } = target;
          const { switchType, beerTypes, activeState } = faucet;
          const Faucets = getUnit('Faucets');
          console.log('Faucets: ', Faucets);
          switch (switchType) {
            case switchTypes.NORMAL:
              activeState.switchOpened = !activeState.switchOpened;
              fireEvent(Faucets, 'switchImg', { affected: faucet });
              break;

            case switchTypes.DUAL:
              [activeState.beer] = beerTypes.filter(b => b !== activeState.beer);
              fireEvent(Faucets, 'switchImg', { affected: faucet });
              break;

            default:
              break;
          }
          fireEvent(getUnit('BeerJet'), 'setJet');
        },
      },
    },
  },
});
