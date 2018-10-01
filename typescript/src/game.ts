import {Player} from './player';

export class Game {

    private players: Array<Player> = [];
    private currentPlayerIndex: number = 0;
    private isGettingOutOfPenaltyBox: boolean = false;

    private popQuestions: Array<string> = [];
    private scienceQuestions: Array<string> = [];
    private sportsQuestions: Array<string> = [];
    private rockQuestions: Array<string> = [];

    private categories = [
        'Pop', 'Science', 'Sports', 'Rock',
        'Pop', 'Science', 'Sports', 'Rock',
        'Pop', 'Science', 'Sports', 'Rock',
    ];

    constructor() {
        for (let i = 0; i < 50; i++) {
            this.popQuestions.push("Pop Question " + i);
            this.scienceQuestions.push("Science Question " + i);
            this.sportsQuestions.push("Sports Question " + i);
            this.rockQuestions.push("Rock Question " + i);
        }
    }

    public add(player: Player) {
        this.players.push(player);
        console.log(player.getName() + " was added");
        console.log("They are player number " + this.players.length);
    }

    public next(player = this.players[this.currentPlayerIndex], roll = Math.floor(Math.random() * 6) + 1) {
        console.log(player.getName() + " is the current player");
        console.log("They have rolled a " + roll);

        if (player.isInPenaltyBox()) {
            if (roll % 2 !== 0) {
                this.isGettingOutOfPenaltyBox = true;

                console.log(player.getName() + " is getting out of the penalty box");
                player.setPlace((player.getPlace() + roll) % this.categories.length);

                console.log(player.getName() + "'s new location is " + player.getPlace());
                console.log("The category is " + this.getCurrentCategory());
                this.askQuestion();
            } else {
                console.log(player.getName() + " is not getting out of the penalty box");
                this.isGettingOutOfPenaltyBox = false;
            }
        } else {
            player.setPlace((player.getPlace() + roll) % this.categories.length);
        
            console.log(player.getName() + "'s new location is " + player.getPlace());
            console.log("The category is " + this.getCurrentCategory());
            this.askQuestion();
        }

        if (Math.floor(Math.random() * 10) === 7) {
            this.printWrongAnswer();
        } else {
            this.printCorrectAnswer();
        }

        if (this.didPlayerWin()) {
            return false;
        }

        this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;

        return true;
    }

    public getNextPlayer() {
        return this.players[this.currentPlayerIndex];
    }

    private askQuestion(): void {
        switch (this.getCurrentCategory()) {
            case 'Pop':
                console.log(this.popQuestions.shift());
                break;
            case 'Science':
                console.log(this.scienceQuestions.shift());
                break;
            case 'Sports':
                console.log(this.sportsQuestions.shift());
                break;
            case 'Rock':
                console.log(this.rockQuestions.shift());
                break;
        }
    }

    private getCurrentCategory(): string {
        const place = this.players[this.currentPlayerIndex].getPlace();
        return this.categories[place];
    }

    private didPlayerWin(): boolean {
        return this.players[this.currentPlayerIndex].getPurse() === 6;
    }

    private printWrongAnswer() {
        const player = this.players[this.currentPlayerIndex];
        console.log('Question was incorrectly answered');
        console.log(player.getName() + " was sent to the penalty box");
        player.setInPenaltyBox(true);
    }

    private printCorrectAnswer() {
        const player = this.players[this.currentPlayerIndex];
        if (!player.isInPenaltyBox() || (player.isInPenaltyBox() && this.isGettingOutOfPenaltyBox)) {
            console.log("Answer was correct!!!!");
            player.setPurse(player.getPurse() + 1);
            console.log(player.getName() + " now has " + player.getPurse() + " Gold Coins.");
        }
    }

}