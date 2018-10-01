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
    it('should add the players correctly', () => {
        const game = new Game();
        game.add(new Player('player1'));
        expect(game.getPlayers().length).to.equal(1);
        game.add(new Player('player2'));
        expect(game.getPlayers().length).to.equal(2);

        game.getPlayers().forEach((player, i) => {
            expect(player.getName()).to.equal(`player${i+1}`);
        });
    });

    it('should play the players in order', () => {
        const game = new Game();
        game.add(new Player('player1'));
        game.add(new Player('player2'));
        game.add(new Player('player3'));
        expect(game.getCurrentPlayer().getName()).to.equal('player1');
        game.next();
        expect(game.getCurrentPlayer().getName()).to.equal('player2');
        game.next();
        expect(game.getCurrentPlayer().getName()).to.equal('player3');
        game.next();
        expect(game.getCurrentPlayer().getName()).to.equal('player1');
    });

    it('should finish', () => {
        const game = new Game();
        game.add(new Player('player1'));
        game.add(new Player('player2'));
        expect(game.isGameOver()).to.be.false;
        while (game.next());
        expect(game.isGameOver()).to.be.true;
    });

    it('should have given 6 Coins to the winner only', () => {
        const game = new Game();
        const player1 = new Player('player1');
        game.add(player1);
        const player2 = new Player('player2');
        game.add(player2);
        const player3 = new Player('player3');
        game.add(player3);
        while (game.next());
        expect(game.getCurrentPlayer().getPurse()).to.equal(6);
        const players = game.getPlayers();
        players.forEach(player => {
            if (player.getName() !== game.getCurrentPlayer().getName()) {
                expect(player.getPurse()).to.be.lessThan(6);
            }
        });
    });
});
