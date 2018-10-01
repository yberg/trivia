import {Game} from './game';
import {Player} from './player';

export class GameRunner {
    public static main(): void {
        const game = new Game();
        game.add(new Player("Chet"));
        game.add(new Player("Pat"));
        game.add(new Player("Sue"));

        while (game.next()) {
            console.log('-----------------------');
        }
    }
}

GameRunner.main();
