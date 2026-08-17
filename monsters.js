export class Monster {
    constructor(name, hp, maxHp, strength, image) {
    this.name = name;
    this.hp = hp;
    this.maxHp = maxHp;
    this.strength = strength;
    this.image = image;
    this.weakTurns = 0;
    this.vulnTurns = 0;
    this.block = 0;
    this.artifact = 0;
    }

    onTurn(turn, opponent, log) {
        this.block = 0; // Reset block at start of turn
    }

    endTurn(turn, opponent, log) {
        if (this.weakTurns > 0) this.weakTurns -= 1;
        if (this.vulnTurns > 0) this.vulnTurns -= 1;
    }

    attack(opponent, log, dmg) {
        let baseDmg = dmg + this.strength; 
        let weakDmg = this.weakTurns > 0 ? Math.floor(0.75 * baseDmg) : baseDmg; 
        let dmgAfterVuln = opponent.vulnTurns > 0 ? Math.floor(1.5 * weakDmg) : weakDmg;

        log.push(`⚔️ ${this.name} attacks ${opponent.name} for ${dmgAfterVuln} damage!`);

        if (opponent.block >= dmgAfterVuln) {
            opponent.block -= dmgAfterVuln;
            log.push(`🛡️ ${opponent.name}'s block absorbed the attack!`);
        } else {
            let dmgAfterBlock = dmgAfterVuln - opponent.block;
            opponent.block = 0;
            opponent.hp = Math.max(0, opponent.hp - dmgAfterBlock);
            log.push(`💥 ${opponent.name} takes ${dmgAfterBlock} damage!`);
        }
    }

    multiAtk(opponent, log, dmg, times) {
        for (let time = 0; time < times; time++) {
            this.attack(opponent, log, dmg);
            if (opponent.hp <= 0) break;
        }
    }

    gainBlock(log, blockAmt) {
        this.block += blockAmt;
        log.push(`🛡️ ${this.name} gains ${blockAmt} block!`);
        }

        buffStr(log, strAmt) {
        this.strength += strAmt;
        log.push(`💪 ${this.name} gains ${strAmt} strength!`);
    }

    applyWeak(opponent, log, weakAmt) {
        if (opponent.artifact > 0) {
            log.push(`${opponent.name}'s artifact blocked the debuff!`);
            opponent.artifact -= 1;
        } else {
            opponent.weakTurns += weakAmt;
            log.push(`${opponent.name} has become weak for ${weakAmt} turns!`)
        }
    }

    applyVuln(opponent, log, vulnAmt) {
        if (opponent.artifact > 0) {
            log.push(`${opponent.name}'s artifact blocked the debuff!`);
            opponent.artifact -= 1;
        } else {
            opponent.vulnTurns += vulnAmt;
            log.push(`${opponent.name} has become vulnerable for ${vulnAmt} turns!`)
        }
    }
}

export class Nibbit extends Monster {
    constructor() {
    super("Nibbit", 42, 46, 0, "./images/StS2_Nibbit.webp");
    }

    butt(opponent, log) {
    this.attack(opponent, log, 12);
    }

    hesitantSlice(opponent, log) {
    this.attack(opponent, log, 6);
    this.gainBlock(log, 5);
    }

    hiss(log) {
    this.buffStr(log, 2);
    }

    onTurn(turn, opponent, log) {
    super.onTurn(turn, opponent, log);
    if (turn % 3 == 1) {
        this.butt(opponent, log);
    } else if (turn % 3 == 2) {
        this.hesitantSlice(opponent, log);
    } else {
        this.hiss(log);
    }
    }
}

export class FuzzyWurmCrawler extends Monster {
    constructor() {
    super("Fuzzy Wurm Crawler", 55, 57, 0, "./images/StS2_Fuzzy_Wurm_Crawler.webp");
    }

    acidGoop(opponent, log) {
    this.attack(opponent, log, 4);
    }

    inhale(log) {
    this.buffStr(log, 7);
    }

    onTurn(turn, opponent, log) {
        super.onTurn(turn, opponent, log);
        if (turn % 2 == 1) {
            this.acidGoop(opponent, log);
        } else {
            this.inhale(log);
        }
    }
}

export class Mawler extends Monster {
    constructor() {
        super("Mawler", 72, 76, 0, "./images/StS2_Mawler.webp");
        this.lastMove = "None";
        this.alreadyRoared = false;
    }

    ripAndTear(opponent, log) {
        this.attack(opponent, log, 14);
        this.lastMove = "ripAndTear";
    }

    roar(opponent, log) {
        this.applyVuln(opponent, log, 3);
        this.alreadyRoared = true;
        this.lastMove = "roar";
    }

    claw(opponent, log) {
        this.multiAtk(opponent, log, 4, 2);
        this.lastMove = "claw";
    }

    onTurn(turn, opponent, log) {
        super.onTurn(turn, opponent, log);
        if (turn == 1) {
            this.claw(opponent, log);
            this.lastMove == "claw";
        } else {
            let availableMoves = [this.ripAndTear, this.roar, this.claw];
            if (this.alreadyRoared) {
                availableMoves = availableMoves.filter(move => move !== this.roar);
            }
            if (this.lastMove == "claw") {
                availableMoves = availableMoves.filter(move => move !== this.claw);
            }
            if (this.lastMove == "ripAndTear") {
                availableMoves = availableMoves.filter(move => move !== this.ripAndTear);
            }
            const selectedMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
            selectedMove.call(this, opponent, log);
        }
    }
}

export class SludgeSpinner extends Monster {
    constructor() {
        super("Sludge Spinner", 37, 39, 0, "./images/StS2_Sludge_Spinner.webp");
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
            this.lastMove == "oilSpray";
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

export class Byrdonis extends Monster {
    constructor() {
    super("Byrdonis", 81, 84, 0, "./images/StS2_Byrdonis.webp");
    }

    swoop(opponent, log) {
    this.attack(opponent, log, 17);
    this.buffStr(log, 1);
    }

    peck(opponent, log) {
    this.multiAtk(opponent, log, 3, 3);
    this.buffStr(log, 1);
    }

    onTurn(turn, opponent, log) {
    super.onTurn(turn, opponent, log);
    if (turn % 2 == 1) {
        this.swoop(opponent, log);
    } else {
        this.peck(opponent, log);
    }
    }
}

export class BygoneEffigy extends Monster {
    constructor() {
        super("Bygone Effigy", 127, 127, 0, "./images/StS2_Bygone_Effigy.webp");
    }
    sleep(log) {
        log.push("Bygone Effigy is sleeping...");
    }
    wake(log) {
        this.buffStr(log, 10);
    }
    slashes(opponent, log) {
        this.attack(opponent, log, 13);
    }
    onTurn(turn, opponent, log) {
        if (turn == 1) {
            this.sleep(log);
        } else if (turn == 2) {
            this.wake(log);
        } else {
            this.slashes(opponent, log);
        }
    }
}

export class Entomancer extends Monster {
    constructor() {
        super("Entomancer", 145, 145, 0, "./images/StS2_Entomancer.webp");
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
        if (turn % 3 == 1) {
            this.beeeees(opponent, log);
        } else if (turn % 3 == 2) {
            this.spear(opponent, log);
        } else {
            this.pheremoneSpit(log);
        }
    }
}

export class InfestedPrism extends Monster {
    constructor() {
        super("Infested Prism", 161, 161, 0, "./images/StS2_Infested_Prism.webp");
        this.hive = 1;
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
    }
    onTurn(turn, opponent, log) {
        if (turn % 5 == 1) {
            this.jab(opponent, log);
        } else if (turn % 5 == 2) {
            this.radiate(opponent, log);
        } else if (turn % 5 == 3) {
            this.whirlwind(opponent, log);
        } else {
            this.pulsate(opponent, log);
        }
    }
}

export class MechaKnight extends Monster {
    constructor() {
        super("Mecha Knight", 300, 300, 0, "./images/StS2_Mecha_Knight.webp");
        this.artifact = 3;
    }
    charge(opponent, log) {
        this.attack(opponent, log, 25);
    }
    flamethrower(opponent, log) {
        this.attack(opponent, log, 8);
    }
    windup(log) {
        this.gainBlock(log, 15);
        this.buffStr(log, 5);
    }
    heavyCleave(opponent, log) {
        this.attack(opponent, log, 35);
    }
    onTurn(turn, opponent, log) {
        if (turn == 1) {
            this.charge(opponent, log);
        } else {
            if (turn % 4 == 2) {
                this.flamethrower(opponent, log);
            } else if (turn % 4 == 3) {
                this.windup(log);
            } else {
                this.heavyCleave(opponent, log);
            }
        }
    }
}


export const monsterClasses = [Nibbit, FuzzyWurmCrawler, Mawler, Byrdonis, BygoneEffigy, SludgeSpinner, Entomancer, MechaKnight];
