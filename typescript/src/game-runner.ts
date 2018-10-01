import {Game} from './game';
import {Player} from './player';

export class GameRunner {
    public static main(): void {
        const game = new Game();
        game.addPlayer(new Player("Chet"));
        game.addPlayer(new Player("Pat"));
        game.addPlayer(new Player("Sue"));

        while (game.next()) {
            console.log('-----------------------');
        }
    }
}

GameRunner.main();
