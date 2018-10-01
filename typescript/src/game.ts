import {Player} from './player';

export class Game {

    private MAX_COINS = 6;

    private players: Array<Player> = [];
    private currentPlayerIndex: number = 0;

    private popQuestions: Array<string> = [];
    private scienceQuestions: Array<string> = [];
    private sportsQuestions: Array<string> = [];
    private rockQuestions: Array<string> = [];

    private categories: Array<string> = [
        'Pop', 'Science', 'Sports', 'Rock',
        'Pop', 'Science', 'Sports', 'Rock',
        'Pop', 'Science', 'Sports', 'Rock',
    ];

    constructor() {
        for (let i = 0; i < 50; i++) {
            this.popQuestions.push('Pop Question ' + i);
            this.scienceQuestions.push('Science Question ' + i);
            this.sportsQuestions.push('Sports Question ' + i);
            this.rockQuestions.push('Rock Question ' + i);
        }
    }

    /**
     * Adds a player to the game.
     * @param player The player to add.
     */
    public add(player: Player) {
        this.players.push(player);
        console.log(player.getName() + ' was added');
        console.log('They are player number ' + this.players.length);
    }

    /**
     * Gets the players that are in the game.
     * @return A list of added players.
     */
    public getPlayers(): Array<Player> {
        return this.players;
    }

    /**
     * Gets the current player.
     * @returns {Player} The current player.
     */
    public getCurrentPlayer(): Player {
        return this.players[this.currentPlayerIndex];
    }

    /**
     * Plays the next turn.
     * @returns {boolean} Whether the game should continue.
     */
    public next(): boolean {
        const player = this.getCurrentPlayer();
        const roll = Math.floor(Math.random() * this.MAX_COINS) + 1;
        console.log(player.getName() + ' is the current player');
        console.log('They have rolled a ' + roll);

        /*
         * If the player is in the penalty box, get them out if they rolled an
         * odd number. If even, keep them in the box and end the turn.
         */
        if (player.isInPenaltyBox()) {
            if (roll % 2 !== 0) {
                player.setInPenaltyBox(false);
                console.log(player.getName() + ' is getting out of the penalty box');
            } else {
                console.log(player.getName() + ' is not getting out of the penalty box');
                this.endTurn();
                return true;
            }
        }

        // Update the player's place on the board
        player.setPlace((player.getPlace() + roll) % this.categories.length);

        const category = this.getCategory(player.getPlace());
        console.log(player.getName() + '\'s new location is ' + player.getPlace());
        console.log('The category is ' + category);
        console.log(this.getNextQuestion(category));

        /*
         * Determine if the player answered the question correcly. If not, add
         * them to the penalty box.
         */
        if (Math.floor(Math.random() * 10) === 7) {
            player.setInPenaltyBox(true);
            this.printWrongAnswer();
        } else {
            player.setPurse(player.getPurse() + 1);
            this.printCorrectAnswer();
        }

        if (this.isGameOver()) {
            return false;
        }

        this.endTurn();
        return true;
    }

    /**
     * Checks if the current player has @MAX_COINS coins.
     * @returns Whether the game is over.
     */
    public isGameOver(): boolean {
        return this.getCurrentPlayer().getPurse() === this.MAX_COINS;
    }

    /**
     * Gets the next question from a given category.
     * @param {string} category The category.
     * @returns {string} A question.
     */
    private getNextQuestion(category: string): string {
        switch (category) {
            case 'Pop':
                return this.popQuestions.shift();
            case 'Science':
                return this.scienceQuestions.shift();
            case 'Sports':
                return this.sportsQuestions.shift();
            case 'Rock':
                return this.rockQuestions.shift();
        }
    }

    /**
     * Gets a category based on an index.
     * @param {number} index The category index.
     * @returns {string} The category.
     */
    private getCategory(index: number): string {
        return this.categories[index];
    }

    /**
     * Ends a player's turn.
     */
    private endTurn() {
        this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
    }

    /**
     * Prints info about an incorrectly answered question.
     */
    private printWrongAnswer() {
        const player = this.getCurrentPlayer();
        console.log('Question was incorrectly answered');
        console.log(player.getName() + ' was sent to the penalty box');
    }

    /**
     * Prints info about a correctly answered question.
     */
    private printCorrectAnswer() {
        const player = this.getCurrentPlayer();
        console.log('Answer was correct!!!!');
        console.log(player.getName() + ' now has ' + player.getPurse() + ' Gold Coins.');
    }
}