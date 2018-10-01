import {expect} from 'chai';
import {describe, it} from 'mocha';
import {GameRunner} from '../src/game-runner';
import {Player} from '../src/player';
import {Game} from '../src/game';

describe('The test environment', () => {
    it('should pass', () => {
        expect(true).to.be.true;
    });

    it("should access game", function () {
        expect(GameRunner).to.not.be.undefined;
    });
});

describe('The game', () => {
    it('should play the players in order', () => {
        const game = new Game();
        const player1 = new Player('player1');
        game.add(player1);
        const player2 = new Player('player2');
        game.add(player2);
        const player3 = new Player('player3');
        game.add(player3);
        expect(game.getNextPlayer().getName()).to.equal(player1.getName());
        game.next();
        expect(game.getNextPlayer().getName()).to.equal(player2.getName());
        game.next();
        expect(game.getNextPlayer().getName()).to.equal(player3.getName());
        game.next();
        expect(game.getNextPlayer().getName()).to.equal(player1.getName());
    });

    it('should not give coins to a player in the penalty box', () => {
        const game = new Game();
        const player = new Player('player1');
        game.add(player);
        for (let i = 0; i < 20; i++) {
            player.setInPenaltyBox(true);
            game.next(player, 2);
        }
        expect(player.getPurse()).to.equal(0);
    });
});
