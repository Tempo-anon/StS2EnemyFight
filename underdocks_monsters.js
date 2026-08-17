import { Monster } from "./monster.js";

export class SludgeSpinner extends Monster {
    constructor() {
        super("Sludge Spinner", 37, 39, "./images/StS2_Sludge_Spinner.webp");
        this.lastMove = "None";
    }

    oilSpray(opponent, log) {
        this.attack(opponent, log, 8);
        this.applyWeak(opponent, log, 1);
        this.lastMove = "oilSpray";
    }

    slam(opponent, log) {
        this.attack(opponent, log, 11);
        this.lastMove = "slam";
    }

    rage(opponent, log) {
        this.attack(opponent, log, 3);
        this.buffStr(log, 3);
        this.lastMove = "rage";
    }

    onTurn(turn, opponent, log) {
        super.onTurn(turn, opponent, log);
        if (turn == 1) {
            this.oilSpray(opponent, log);
        } else {
            let availableMoves = [this.oilSpray, this.slam, this.rage];
            
            if (this.lastMove == "oilSpray") {
                availableMoves = availableMoves.filter(move => move !== this.oilSpray);
            }
            if (this.lastMove == "slam") {
                availableMoves = availableMoves.filter(move => move !== this.slam);
            }
            if (this.lastMove == "rage") {
                availableMoves = availableMoves.filter(move => move !== this.rage);
            }
            const selectedMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
            selectedMove.call(this, opponent, log);
        }
    }
}

export class FossilStalker extends Monster {
    constructor() {
        super("Fossil Stalker", 51, 53, "./images/StS2_Fossil_Stalker.webp");
    }

    latch(opponent, log) {
        this.attack(opponent, log, 12);
    }

    tackle(opponent, log) {
        this.attack(opponent, log, 8);
        // TODO: Frail
        this.applyVuln(opponent, log, 1);
    }

    lash(opponent, log) {
        this.multiAtk(opponent, log, 3, 2);
    }

    suck(log) {
        log.push("Fossil Stalker is sucking strength!")
        this.buffStr(log, 3);
    }

    onTurn(turn, opponent, log) {
        super.onTurn(turn, opponent, log);
        let startingHp = opponent.hp;
        if (turn == 1) {
            this.latch(opponent, log);
        } else {
            let availableMoves = [this.latch, this.tackle, this.lash];
            const selectedMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
            selectedMove.call(this, opponent, log);
        }
        if (opponent.hp < startingHp) {
            this.suck(log);
        }
    }
}

export class HauntedShip extends Monster {
    constructor() {
        super("Haunted Ship", 63, 63, "./images/StS2_Haunted_Ship.webp");
    }

    haunt(opponent, log) {
        this.applyWeak(opponent, log, 3);
    }

    swipe(opponent, log) {
        this.attack(opponent, log, 13);
    }

    stomp(opponent, log) {
        this.multiAtk(opponent, log, 4, 3);
    }

    onTurn(turn, opponent, log) {
        super.onTurn(turn, opponent, log);
        if (turn == 1) {
            this.haunt(opponent, log);
        } else {
            if (turn % 2 == 0) {
                this.swipe(opponent, log);
            } else {
                this.stomp(opponent, log);
            }
        }
    }
}

export class PunchConstruct extends Monster {
    constructor() {
        super("Punch Construct", 55, 55, "./images/StS2_Punch_Construct.webp");
        this.artifact = 1;
    }

    ready(log) {
        this.gainBlock(log, 10);
    }

    fastPunch(opponent, log) {
        this.multiAtk(opponent, log, 5, 2);
        // TODO: Frail
        this.applyVuln(opponent, log, 1);
    }

    strongPunch(opponent, log) {
        this.attack(opponent, log, 14);
    }

    onTurn(turn, opponent, log) {
        super.onTurn(turn, opponent, log);
        if (turn % 3 == 1) {
            this.ready(log);
        } else if (turn % 3 == 2) {
            this.fastPunch(opponent, log);
        } else {
            this.strongPunch(opponent, log);
        }
    }
}

export class SewerClam extends Monster {
    constructor() {
        super("Sewer Clam", 56, 56, "./images/StS2_Sewer_Clam.webp");
        this.plating = 8;
    }

    jet(opponent, log) {
        this.attack(opponent, log, 10);
    }

    pressurize(log) {
        this.buffStr(log, 4);
    }

    onTurn(turn, opponent, log) {
        super.onTurn(turn, opponent, log);

        if (turn % 2 == 0) {
            this.jet(opponent, log);
        } else {
            this.pressurize(log);
        }
        
    }
}

export class TerrorEel extends Monster {
    constructor() {
        super("Terror Eel", 140, 140, "./images/StS2_Terror_Eel.webp");
        this.phase2 = false;
        this.vigor = false;
        this.lastMove = "thrash";
        this.needToTerror = false;
    }

    crash(opponent, log) {
        if (this.vigor == true) {
            this.attack(opponent, log, 16 + 6)
        } else {
            this.attack(opponent, log, 16);
        }
        this.lastMove = "crash";
        this.vigor = false;
    }

    thrash(opponent, log) {
        this.multiAtk(opponent, log, 3, 3);
        this.lastMove = "thrash";
        this.vigor = true;
    }

    stun(log) {
        log.push("Terror Eel is stunned!");
        this.phase2 = true;
    }

    terror(opponent, log) {
        this.applyVuln(opponent, log, 99);
        this.needToTerror = true;
    }


    onTurn(turn, opponent, log) {
        super.onTurn(turn, opponent, log);
        let availableMoves = [this.crash, this.thrash];
        if (this.lastMove == "crash") {
            availableMoves = availableMoves.filter(move => move !== this.crash);
        }
        if (this.lastMove == "thrash") {
            availableMoves = availableMoves.filter(move => move !== this.thrash);
        }
        const selectedMove = availableMoves[0];
        if (this.phase2 == false) {
            if (this.hp <= 70) {
                this.stun(log);
            } else {
                selectedMove.call(this, opponent, log);
            }
        } else {
            if (this.needToTerror == false) {
                this.terror(opponent, log);
            } else {
                selectedMove.call(this, opponent, log);
            }
        }
    }
}