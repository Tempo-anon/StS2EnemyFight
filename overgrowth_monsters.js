import { Monster } from "./monster.js";

export class Nibbit extends Monster {
    constructor() {
    super("Nibbit", 42, 46, "./images/StS2_Nibbit.webp");
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
    super("Fuzzy Wurm Crawler", 55, 57, "./images/StS2_Fuzzy_Wurm_Crawler.webp");
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

export class ShrinkerBeetle extends Monster {
    constructor() {
        super("Shrinker Beetle", 38, 40, "./images/StS2_Shrinker_Beetle.webp");
    }
    shrinker(opponent, log) {
        // TODO: Change weak with shrinker
        this.applyWeak(opponent, log, 99); 
    }
    chomp(opponent, log) {
        this.attack(opponent, log, 7);
    }
    stomp(opponent, log) {
        this.attack(opponent, log, 13);
    }
    onTurn(turn, opponent, log) {
        super.onTurn(turn, opponent, log);
        if (turn == 1) {
            this.shrinker(opponent, log);
        } else {
            if (turn % 2 == 0) {
                this.chomp(opponent, log);
            } else {
                this.stomp(opponent, log);
            }
        }
    }
}

export class CubexConstruct extends Monster {
    constructor() {
        super("Cubex Construct", 65, 65, "./images/StS2_Cubex_Construct.webp");
        this.artifact = 1;
    }
    chargeUp(log) {
        this.buffStr(log, 2);
    }
    repeaterBlast(opponent, log) {
        this.attack(opponent, log, 7);
        this.buffStr(log, 2);
    }
    expelBlast(opponent, log) {
        this.multiAtk(opponent, log, 5, 2);
    }
    onTurn(turn, opponent, log) {
        super.onTurn(turn, opponent, log);
        if (turn == 1) {
            this.chargeUp(log);
        } else {
            if ((turn - 1) % 3 == 0) {
                this.expelBlast(opponent, log);
            } else {
                this.repeaterBlast(opponent, log);
            }
        }
    }
}

export class Mawler extends Monster {
    constructor() {
        super("Mawler", 72, 76, "./images/StS2_Mawler.webp");
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


export class Byrdonis extends Monster {
    constructor() {
    super("Byrdonis", 81, 84, "./images/StS2_Byrdonis.webp");
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
        super("Bygone Effigy", 127, 127, "./images/StS2_Bygone_Effigy.webp");
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
        super.onTurn(turn, opponent, log);
        if (turn == 1) {
            this.sleep(log);
        } else if (turn == 2) {
            this.wake(log);
        } else {
            this.slashes(opponent, log);
        }
    }
}

export class VineShambler extends Monster {
    constructor() {
        super("Vine Shambler", 61, 61, "./images/StS2_Vine_Shambler.webp");
    }

    swipe(opponent, log) {
        this.multiAtk(opponent, log, 6, 2);
    }

    graspingVines(opponent, log) {
        this.attack(opponent, log, 8);
        // TODO: tangled
    }

    chomp(opponent, log) {
        this.attack(opponent, log, 16);
    }

    onTurn(turn, opponent, log) {
        super.onTurn(turn, opponent, log);
        if (turn % 3 == 1) {
            this.swipe(opponent, log);
        } else if (turn % 3 == 2) {
            this.graspingVines(opponent, log);
        }  else {
            this.chomp(opponent, log);
        }
    }
}

export class Vantom extends Monster {
    constructor() {
        super("Vantom", 173, 173, "./images/StS2_Vantom.webp");
        this.slippery = 9;
    }

    inkBlot(opponent, log) {
        this.attack(opponent, log, 7);
    }

    inkyLance(opponent, log) {
        this.multiAtk(opponent, log, 6, 2);
    }

    dismember(opponent, log) {
        this.attack(opponent, log, 27);
    }

    prepare(log) {
        this.buffStr(log, 2);
    }

    onTurn(turn, opponent, log) {
        super.onTurn(turn, opponent, log);
        if (turn % 4 == 1) {
            this.inkBlot(opponent, log);
        } else if (turn % 4 == 2) {
            this.inkyLance(opponent, log);
        } else if (turn % 4 == 3) {
            this.dismember(opponent, log);
        } else {
            this.prepare(log);
        }
    }
}

export class KinPriest extends Monster {
    constructor() {
        super("Kin Priest", 190, 190, "./images/StS2_Kin_Priest.webp");
    }

    orbOfFrailty(opponent, log) {
        this.attack(opponent, log, 8);
        // TODO: This is frail not vuln
        this.applyVuln(opponent, log, 1); 
    }

    orbOfWeakness(opponent, log) {
        this.attack(opponent, log, 8);
        this.applyWeak(opponent, log, 1);
    }

    soulBeam(opponent, log) {
        this.multiAtk(opponent, log, 3, 3);
    }

    darkRitual(log) {
        this.buffStr(log, 2);
    }

    onTurn(turn, opponent, log) {
        super.onTurn(turn, opponent, log);
        if (turn % 4 == 1) {
            this.orbOfFrailty(opponent, log);
        } else if (turn % 4 == 2) {
            this.orbOfWeakness(opponent, log);
        } else if (turn % 4 == 3) {
            this.soulBeam(opponent, log);
        } else {
            this.darkRitual(log);
        }
    }
}

export class CeremonialBeast extends Monster {
    constructor() {
        super("Ceremonial Beast", 252, 252, "./images/StS2_Ceremonial_Beast.webp");
        this.phase2 = false;
    }

    stamp(log) {
        log.push("Ceremonial Beast is plowing!");
    }

    plow(opponent, log) {
        this.attack(opponent, log, 18);
        this.buffStr(log, 2);
    }

    stun(log) {
        log.push("Ceremonial Beast is stunned!");
        this.strength = 0;
        this.phase2 = true;
    }

    beastCry(log) {
        // TODO: Ringing?
        log.push("Ceremonial Beast cries out!");
    }

    stomp(opponent, log) {
        this.attack(opponent, log, 15);
    }

    crush(opponent, log) {
        this.attack(opponent, log, 17);
        this.buffStr(log, 3);
    }

    onTurn(turn, opponent, log) {
        super.onTurn(turn, opponent, log);
        if (turn == 1) {
            this.stamp(log);
        } else {
            if (this.phase2 == false) {
                if (this.hp <= 150) {
                    this.stun(log);
                } else {
                    this.plow(opponent, log);
                }
            } else {
                if (turn % 4 == 1) {
                    this.beastCry(log);
                } else if (turn % 4 == 2) {
                    this.stomp(opponent, log);
                } else {
                    this.crush(opponent, log);
                }
            }
        }
    }
}