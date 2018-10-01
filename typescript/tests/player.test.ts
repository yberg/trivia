import {expect} from 'chai';
import {describe, it} from 'mocha';
import {Player} from '../src/player';

describe('A player', () => {
  it('should be defined', () => {
      const player = new Player('test');
      expect(player).to.not.be.undefined;
      expect(player.getName()).to.equal('test');
      expect(player.getPlace()).to.equal(0);
      expect(player.getPurse()).to.equal(0);
      expect(player.isInPenaltyBox()).to.equal(false);
  });
});