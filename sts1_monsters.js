import { Monster } from "./monster.js";

export class CorruptHeart extends Monster {
    constructor() {
        super("Corrupt Heart", 750, 750, "./images/CorruptHeart.webp");
        this.dmgCap = true;
        this.dmgCapAmt = 300;
        this.intensity = 1;
        this.lastMove = "none";
    }
    debilitate(opponent, log) {
        this.applyVuln(opponent, log, 2);
        this.applyWeak(opponent, log, 2);
        // Frail
        // this.applyVuln(opponent, log, 2);
    }
    bloodShots(opponent, log) {
        this.multiAtk(opponent, log, 2, 12);
        this.lastMove = "bloodShots";
    }
    echo(opponent, log) {
        this.attack(opponent, log, 40);
        this.lastMove = "echo";
    }
    buff(log) {
        this.strength = Math.max(0, this.strength);
        this.buffStr(log, 2);
        if (this.intensity == 1) {
            this.artifact += 2;
        } else if (this.intensity == 2) {
            // beat of death
        } else if (this.intensity == 3) {
            // painful stabs
        } else if (this.intensity == 4) {
            this.buffStr(log, 10);
        } else {
            this.buffStr(log, 50);
        }
        this.intensity += 1;
    }
    
    onTurn(turn, opponent, log) {
        super.onTurn(turn, opponent, log);
        this.dmgCapAmt = 300;
        let availableMoves = [this.bloodShots, this.echo];
        const selectedMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
        if (turn == 1) {
            this.debilitate(opponent, log);
            return;
        }
        if ((turn - 1) % 3 == 0) {
            this.buff(log);
            return;
        } else if ((turn - 1) % 3 == 1) {
            selectedMove.call(this, opponent, log);
        } else {
            if (this.lastMove == "bloodShots") {
                this.echo(opponent, log);
            } else {
                this.bloodShots(opponent, log);
            }
        }
    }
}