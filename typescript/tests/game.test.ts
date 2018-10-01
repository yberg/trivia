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
        game.addPlayer(new Player('player1'));
        expect(game.getPlayers().length).to.equal(1);
        game.addPlayer(new Player('player2'));
        expect(game.getPlayers().length).to.equal(2);

        game.getPlayers().forEach((player, i) => {
            expect(player.getName()).to.equal(`player${i+1}`);
        });
    });

    it('should play the players in order', () => {
        const game = new Game();
        game.addPlayer(new Player('player1'));
        game.addPlayer(new Player('player2'));
        game.addPlayer(new Player('player3'));
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
        game.addPlayer(new Player('player1'));
        game.addPlayer(new Player('player2'));
        expect(game.isGameOver()).to.be.false;
        while (game.next());
        expect(game.isGameOver()).to.be.true;
    });

    it('should have given 6 Coins to the winner only', () => {
        const game = new Game();
        const player1 = new Player('player1');
        game.addPlayer(player1);
        const player2 = new Player('player2');
        game.addPlayer(player2);
        const player3 = new Player('player3');
        game.addPlayer(player3);
        while (game.next());
        expect(game.getCurrentPlayer().getPurse()).to.equal(6);
        const players = game.getPlayers();
        players.forEach(player => {
            if (player.getName() !== game.getCurrentPlayer().getName()) {
                expect(player.getPurse()).to.be.lessThan(6);
            }
        });
    });

    it('should not give Coins to a player in the penalty box', () => {
        const game = new Game();
        const player = new Player('player1');
        game.addPlayer(player);
        for (let i = 0; i < 50; i++) {
            player.setInPenaltyBox(true);
            game.next(player, 2);
        }
        expect(player.getPurse()).to.equal(0);
    });

    it('should give a player 5 Coins after 5 correct answers', () => {
        const game = new Game();
        const player = new Player('player1');
        game.addPlayer(player);
        for (let i = 0; i < 50; i++) {
            if (i % 10 === 0) {
                player.setInPenaltyBox(false);
                game.next(undefined, undefined, true);
            } else {
                game.next(undefined, undefined, false);
            }
        }
        expect(game.getCurrentPlayer().getPurse()).to.equal(5);
    });
});
