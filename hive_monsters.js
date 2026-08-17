import { Monster } from "./monster.js";

export class HunterKiller extends Monster {
    constructor() {
        super("Hunter Killer", 121, 121, "./images/StS2_Hunter_Killer.webp");
        this.lastMove = "None";
    }
    tenderizingGoop(log) {
        log.push("Hunter Killer applies tenderizing goop! (But nothing happened)");
    }
    bite(opponent, log) {
        this.attack(opponent, log, 17);
        this.lastMove = "bite";
    }
    puncture(opponent, log) {
        this.multiAtk(opponent, log, 7, 3);
        this.lastMove = "puncture";
    }
    
    onTurn(turn, opponent, log) {
        super.onTurn(turn, opponent, log);

        if (turn == 1) {
            this.tenderizingGoop(log);
            return;
        }

        if (this.lastMove = "bite") {
            this.puncture(opponent, log);
            return;
        }

        let availableMoves = [this.bite, this.puncture, this.puncture];
        const selectedMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
        selectedMove.call(this, opponent, log);
    }
}

export class MysteriousKnight extends Monster {
    constructor() {
        super("Mysterious Knight", 145, 145, "./images/StS2_Mysterious_Knight.webp");
        this.strength = 6;
        this.plating = 6;
        this.lastMove = "None";
    }
    breaker(opponent, log) {
        this.buffStr(log, 3);
        this.lastMove = "breaker";
    }
    flail(opponent, log) {
        this.multiAtk(opponent, log, 9, 2);
        this.lastMove = "flail";
    }
    ram(opponent, log) {
        this.attack(opponent, log, 15);
        this.lastMove = "ram";
    }

    onTurn(turn, opponent, log) {
        super.onTurn(turn, opponent, log);

        if (turn == 1) {
            this.ram(opponent, log);
        } else {
            let availableMoves = [this.breaker, this.flail, this.ram];
            
            if (this.lastMove == "breaker") {
                availableMoves = availableMoves.filter(move => move !== this.breaker);
            }
            if (this.lastMove == "flail") {
                availableMoves = availableMoves.filter(move => move !== this.flail);
            }
            if (this.lastMove == "ram") {
                availableMoves = availableMoves.filter(move => move !== this.ram);
            }
            const selectedMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
            selectedMove.call(this, opponent, log);
        }
    }
}

export class Entomancer extends Monster {
    constructor() {
        super("Entomancer", 145, 145, "./images/StS2_Entomancer.webp");
        this.hive = 1;
    }
    beeeees(opponent, log) {
        this.multiAtk(opponent, log, 3, 7);
    }
    spear(opponent, log) {
        this.attack(opponent, log, 18);
    }
    pheremoneSpit(log) {
        if (this.hive == 3) {
            this.buffStr(log, 2);
        } else {
            this.buffStr(log, 1);
            this.hive += 1;
        }
    }

    onTurn(turn, opponent, log) {
        super.onTurn(turn, opponent, log);
        if (turn % 3 == 1) {
            this.beeeees(opponent, log);
        } else if (turn % 3 == 2) {
            this.spear(opponent, log);
        } else {
            this.pheremoneSpit(log);
        }
    }
}

// TODO: Using strength instead of vital spark
export class InfestedPrism extends Monster {
    constructor() {
        super("Infested Prism", 161, 161, "./images/StS2_Infested_Prism.webp");
        this.strength = 2;
    }
    jab(opponent, log) {
        this.attack(opponent, log, 15);
    }
    radiate(opponent, log) {
        this.attack(opponent, log, 11);
        this.gainBlock(log, 16);
    }
    whirlwind(opponent, log) {
        this.multiAtk(opponent, log, 5, 3);
    }
    pulsate(opponent, log) {
        this.attack(opponent, log, 8);
        this.gainBlock(log, 20);
        this.buffStr(log, 2);
    }
    onTurn(turn, opponent, log) {
        super.onTurn(turn, opponent, log);
        if (turn % 4 == 1) {
            this.jab(opponent, log);
        } else if (turn % 4 == 2) {
            this.radiate(opponent, log);
        } else if (turn % 4 == 3) {
            this.whirlwind(opponent, log);
        } else {
            this.pulsate(opponent, log);
        }
    }
}

// TODO: Make this a real multi enemy fight
export class Decimillipede extends Monster {
    constructor() {
        super("Decimillipede", 40 * 3, 46 * 3, "./images/StS2_Decimillipede_Left.webp");
        this.hive = 1;
    }
    bulk(opponent, log) {
        this.attack(opponent, log, 6);
        this.buffStr(log, 2);
    }
    writhe(opponent, log) {
        this.multiAtk(opponent, log, 5, 2);
    }
    outgas(opponent, log) {
        this.attack(opponent, log, 8);
        this.applyWeak(opponent, log, 1);
    }

    onTurn(turn, opponent, log) {
        super.onTurn(turn, opponent, log);
        this.writhe(opponent, log);
        this.outgas(opponent, log);
        this.bulk(opponent, log);
    }
}

// TODO: Crab mechanics
export class Crusher extends Monster {
    constructor() {
        super("Crusher", 209, 209, "./images/Crusher.png");
    }
    thrash(opponent, log) {
        this.attack(opponent, log, 12);
    }
    enlargingStrike(opponent, log) {
        this.attack(opponent, log, 4);
    }
    bugSting(opponent, log) {
        this.multiAtk(opponent, log, 6, 2);
    }
    adapt(log) {
        this.buffStr(log, 2);
    }
    guardedStrike(opponent, log) {
        this.attack(opponent, log, 12);
        this.gainBlock(log, 18);
    }

    onTurn(turn, opponent, log) {
        super.onTurn(turn, opponent, log);
        if (turn % 5 == 1) {
            this.thrash(opponent, log);
        } else if (turn % 5 == 2) {
            this.enlargingStrike(opponent, log);
        } else if (turn % 5 == 3) {
            this.bugSting(opponent, log);
        } else if (turn % 5 == 4) {
            this.adapt(log);
        } else {
            this.guardedStrike(opponent, log);
        }
    }
}

export class Rocket extends Monster {
    constructor() {
        super("Rocket", 199, 199, "./images/StS2_Rocket.webp");
    }
    targetingReticle(opponent, log) {
        this.attack(opponent, log, 3);
    }
    precisionBeam(opponent, log) {
        this.attack(opponent, log, 18);
    }
    chargeUp(log) {
        this.buffStr(log, 2);
    }
    laser(opponent, log) {
        this.attack(opponent, log, 31);
    }
    recharge(log) {
        log.push("💤 Rocket is recharging!");
    }

    onTurn(turn, opponent, log) {
        super.onTurn(turn, opponent, log);
        if (turn % 5 == 1) {
            this.targetingReticle(opponent, log);
        } else if (turn % 5 == 2) {
            this.precisionBeam(opponent, log);
        } else if (turn % 5 == 3) {
            this.chargeUp(log);
        } else if (turn % 5 == 4) {
            this.laser(opponent, log);
        } else {
            this.recharge(log);
        }
    }
}

export class TheInsatiable extends Monster {
    constructor() {
        super("The Insatiable", 321, 321, "./images/StS2_The_Insatiable.webp");
    }

    liquifyGround(log) {
        log.push("The ground has been liquified! (But nothing happened)");
    }
    thrash(opponent, log) {
        this.multiAtk(opponent, log, 8, 2);
    }
    lungingBite(opponent, log) {
        this.attack(opponent, log, 28);
    }
    salivate(log){
        this.buffStr(log, 2);
    }

    onTurn(turn, opponent, log) {
        super.onTurn(turn, opponent, log);
        if (turn == 1) {
            this.liquifyGround(log);
        } else {
            if ((turn - 1) % 4 == 2) {
                this.lungingBite(opponent, log);
            } else if ((turn - 1) % 4 == 3) {
                this.salivate(log);
            } else {
                this.thrash(opponent, log);
            }
        }
    }
}

export class KnowledgeDemon extends Monster {
    constructor() {
        super("Knowledge Demon", 379, 379, "./images/StS2_Knowledge_Demon.webp");
        this.curses = 0;
    }

    curseOfKnowledge(opponent, log) {
        log.push(`Knowledge Demon placed a curse on ${opponent.name}! (But nothing happened)`);
        this.curses += 1;
    }
    slap(opponent, log) {
        this.attack(opponent, log, 17);
    }
    knowledgeOverwhelming(opponent, log) {
        this.multiAtk(opponent, log, 8, 3);
    }
    ponder(opponent, log) {
        this.attack(opponent, log, 11);
        this.heal(log, 30);
        this.buffStr(log, 2);
    }

    onTurn(turn, opponent, log) {
        super.onTurn(turn, opponent, log);
        if (turn <= 12) {
            // Before 3 curses
            if (turn % 4 == 1) {
                this.curseOfKnowledge(opponent, log);
            } else if (turn % 4 == 2) {
                this.slap(opponent, log);
            } else if (turn % 4 == 3) {
                this.knowledgeOverwhelming(opponent, log);
            } else {
                this.ponder(opponent, log);
            }
        } else {
            if ((turn - 12) % 3 == 1) {
                this.slap(opponent, log);
            } else if ((turn - 12) % 3 == 2) {
                this.knowledgeOverwhelming(opponent, log);
            } else {
                this.ponder(opponent, log);
            }
        }
    }
}