import {Player} from './player';

export class Game {

    private players: Array<Player> = [];
    private currentPlayerIndex: number = 0;
    private isGettingOutOfPenaltyBox: boolean = false;

    private popQuestions: Array<string> = [];
    private scienceQuestions: Array<string> = [];
    private sportsQuestions: Array<string> = [];
    private rockQuestions: Array<string> = [];

    constructor() {

        for (let i = 0; i < 50; i++) {
            this.popQuestions.push("Pop Question " + i);
            this.scienceQuestions.push("Science Question " + i);
            this.sportsQuestions.push("Sports Question " + i);
            this.rockQuestions.push(this.createRockQuestion(i));
          }
    }

    private createRockQuestion(index: number): string {
        return "Rock Question " + index;
    }

    public add(name: string): boolean {
        this.players.push(new Player(name));

        console.log(name + " was added");
        console.log("They are player number " + this.players.length);

        return true;
    }

    public roll(roll: number) {
        const player = this.players[this.currentPlayerIndex];
        console.log(player.getName() + " is the current player");
        console.log("They have rolled a " + roll);
    
        if (player.isInPenaltyBox()) {
          if (roll % 2 != 0) {
            this.isGettingOutOfPenaltyBox = true;
    
            console.log(player.getName() + " is getting out of the penalty box");
            player.setPlace(player.getPlace() + roll);
            if (player.getPlace() > 11) {
                player.setPlace(player.getPlace() - 12);
            }
    
            console.log(player.getName() + "'s new location is " + player.getPlace());
            console.log("The category is " + this.currentCategory());
            this.askQuestion();
          } else {
            console.log(player.getName() + " is not getting out of the penalty box");
            this.isGettingOutOfPenaltyBox = false;
          }
        } else {
    
          player.setPlace(player.getPlace() + roll);
          if (player.getPlace() > 11) {
            player.setPlace(player.getPlace() - 12);
          }
    
          console.log(player.getName() + "'s new location is " + player.getPlace());
          console.log("The category is " + this.currentCategory());
          this.askQuestion();
        }
    }

    private askQuestion(): void {
        if (this.currentCategory() == 'Pop')
            console.log(this.popQuestions.shift());
        if (this.currentCategory() == 'Science')
            console.log(this.scienceQuestions.shift());
        if (this.currentCategory() == 'Sports')
            console.log(this.sportsQuestions.shift());
        if (this.currentCategory() == 'Rock')
            console.log(this.rockQuestions.shift());
    }

    private currentCategory(): string {
        const player = this.players[this.currentPlayerIndex];
        if (player.getPlace() == 0)
            return 'Pop';
        if (player.getPlace() == 4)
            return 'Pop';
        if (player.getPlace() == 8)
            return 'Pop';
        if (player.getPlace() == 1)
            return 'Science';
        if (player.getPlace() == 5)
            return 'Science';
        if (player.getPlace() == 9)
            return 'Science';
        if (player.getPlace() == 2)
            return 'Sports';
        if (player.getPlace() == 6)
            return 'Sports';
        if (player.getPlace() == 10)
            return 'Sports';
        return 'Rock';
    }

    private didPlayerWin(): boolean {
        return !(this.players[this.currentPlayerIndex].getPurse() == 6)
    }

    public wrongAnswer(): boolean {
        const player = this.players[this.currentPlayerIndex];
        console.log('Question was incorrectly answered');
        console.log(player.getName() + " was sent to the penalty box");
        player.setInPenaltyBox(true);
    
        this.currentPlayerIndex += 1;
        if (this.currentPlayerIndex == this.players.length)
            this.currentPlayerIndex = 0;
        return true;
    }

    public wasCorrectlyAnswered(): boolean {
        const player = this.players[this.currentPlayerIndex];
        if (player.isInPenaltyBox()) {
            if (this.isGettingOutOfPenaltyBox) {
              console.log('Answer was correct!!!!');
              player.setPurse(player.getPurse() + 1);
              console.log(player.getName() + " now has " + player.getPurse() + " Gold Coins.");
      
              var winner = this.didPlayerWin();
              this.currentPlayerIndex += 1;
              if (this.currentPlayerIndex == this.players.length)
                this.currentPlayerIndex = 0;
      
              return winner;
            } else {
              this.currentPlayerIndex += 1;
              if (this.currentPlayerIndex == this.players.length)
                this.currentPlayerIndex = 0;
              return true;
            }
      
      
          } else {
      
            console.log("Answer was correct!!!!");
      
            player.setPurse(player.getPurse() + 1);
            console.log(player.getName() + " now has " + player.getPurse() + " Gold Coins.");
      
            var winner = this.didPlayerWin();
      
            this.currentPlayerIndex += 1;
            if (this.currentPlayerIndex == this.players.length)
                this.currentPlayerIndex = 0;
      
            return winner;
          }
    }

    public getPlayers(): Array<Player> {
        return this.players;
    }

}