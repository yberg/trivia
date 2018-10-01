export class Player {

    private name: string;
    private place: number;
    private purse: number;
    private inPenaltyBox: boolean;

    constructor(name: string) {
        this.name = name;
        this.place = 0;
        this.purse = 0;
        this.inPenaltyBox = false;
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string) {
        this.name = name;
    }

    public getPlace(): number {
        return this.place;
    }

    public setPlace(place: number) {
        this.place = place;
    }

    public getPurse(): number {
        return this.purse;
    }

    public setPurse(purse: number) {
        this.purse = purse;
    }

    public isInPenaltyBox(): boolean {
        return this.inPenaltyBox;
    }

    public setInPenaltyBox(inPenaltyBox: boolean) {
        this.inPenaltyBox = inPenaltyBox;
    }
}
