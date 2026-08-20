import { Monster } from "./monster.js";
const scrollCount = 3;
export class ScrollOfBiting extends Monster {
    constructor() {
        super(`Scroll of Biting (x ${scrollCount})`, 31 * scrollCount, 38 * scrollCount, "./images/StS2_Scroll_of_Biting.webp");
        this.randTurn = Math.floor(Math.random() * 3) + 1;
    }
    chomp(opponent, log) {
        this.attack(opponent, log, scrollCount * 14);
    }
    moreTeeth(log) {
        this.buffStr(log, 2);
    }
    chew(opponent, log) {
        this.multiAtk(opponent, log, scrollCount * 5, 2);
    }
    onTurn(turn, opponent, log) {
        super.onTurn(turn, opponent, log);
        
        if (this.randTurn % 3 == 1) {
            this.chomp(opponent, log);
        } else if (this.randTurn % 3 == 2) {
            this.moreTeeth(log);
        }  else {
            this.chew(opponent, log);
        }
        this.randTurn += 1;
    }
}

export class DevotedSculptor extends Monster {
    constructor() {
        super("Devoted Sculptor", 162, 162, "./images/StS2_Devoted_Sculptor.webp");
        this.ritual = false;
    }
    forbiddenIncatation(log) {
        log.push("Devoted Sculptor cries out a forbidden incantation...");
        log.push("CA CAWWW!!!!!!!");
        this.ritual = true;
    }
    savage(opponent, log) {
        this.attack(opponent, log, 12);
    }
    onTurn(turn, opponent, log) {
        super.onTurn(turn, opponent, log);
        if (this.ritual == true) {
            this.buffStr(log, 9);
        }
        if (turn == 1) {
            this.forbiddenIncatation(log);
        } else {
           this.savage(opponent, log);
        }
    }
}

export class SlimedBerserker extends Monster {
    constructor() {
        super("Slimed Berserker", 266, 266, "./images/StS2_Slimed_Berserker.webp");
    }
    vomitIchor(log) {
        log.push('🤮 Slimed Berserker shuffled 10 slimes into the deck! (But nothing happened)');
    }
    furiousPummeling(opponent, log) {
        this.multiAtk(opponent, log, 4, 4);
    }
    leechingHug(opponent, log) {
        this.applyWeak(opponent, log, 3);
        this.applyVuln(opponent, log, 3);
    }
    smother(opponent, log) {
        this.attack(opponent, log, 30);
    }
    onTurn(turn, opponent, log) {
        super.onTurn(turn, opponent, log);
        
        if (turn % 4 == 1) {
            this.vomitIchor(log);
        } else if (turn % 4 == 2) {
            this.furiousPummeling(opponent, log);
        } else if (turn % 4 == 3) {
            this.leechingHug(opponent, log);
        } else {
            this.smother(opponent, log);
        }
    }
}

export class FrogKnight extends Monster {
    constructor() {
        super("Frog Knight", 191, 191, "./images/StS2_Frog_Knight.webp");
        this.plating = 15;
        this.beetleCharged = false;
        this.lastMove = "none";
    }
    
    tongueLash(opponent, log) {
        this.attack(opponent, log, 13);
        // TODO: Frail
        this.applyVuln(opponent, log, 2);
        this.lastMove = "tongueLash";
    }
    strikeDownEvil(opponent, log) {
        this.attack(opponent, log, 21);
        this.lastMove = "strikeDownEvil";
    }
    forTheQueen(log) {
        this.buffStr(log, 5);
        this.lastMove = "forTheQueen";
    }
    beetleCharge(opponent, log) {
        this.attack(opponent, log, 25);
        this.beetleCharged = true;
        this.lastMove = "beetleCharge";
    }
    onTurn(turn, opponent, log) {
        super.onTurn(turn, opponent, log);
        
        if (this.lastMove == "tongueLash") {
            this.strikeDownEvil(opponent, log);
            return;
        }
        if (this.lastMove == "strikeDownEvil") {
            this.forTheQueen(log);
            return;
        }
        if (this.lastMove == "forTheQueen") {
            if (this.beetleCharged == false && this.hp < Math.floor(191 / 2)) {
                this.beetleCharge(opponent, log);
            } else {
                this.tongueLash(opponent, log);
            }
            return;
        }
        this.tongueLash(opponent, log);
    }
}

export class GlobeHead extends Monster {
    constructor() {
        super("Globe Head", 148, 148, "./images/StS2_Globe_Head.webp");
    }
    
    shockingSlap(opponent, log) {
        this.attack(opponent, log, 13);
        // TODO: Frail
        this.applyVuln(opponent, log, 2);
    }
    thunderStrike(opponent, log) {
        this.multiAtk(opponent, log, 6, 3);
    }
    galvanicBurst(opponent, log) {
        this.attack(opponent, log, 16);
        this.buffStr(log, 2);
    }
    onTurn(turn, opponent, log) {
        super.onTurn(turn, opponent, log);
        
        if (turn % 3 == 1) {
            this.shockingSlap(opponent, log);
        } else if (turn % 3 == 2) {
            this.thunderStrike(opponent, log);
        } else {
            this.galvanicBurst(opponent, log);
        }
    }
}

export class OwlMagistrate extends Monster {
    constructor() {
        super("Owl Magistrate", 234, 234, "./images/StS2_Owl_Magistrate.webp");
    }
    magistrateScrutiny(opponent, log) {
        this.attack(opponent, log, 16);
    }
    peckAssault(opponent, log) {
        this.multiAtk(opponent, log, 4, 6);
    }
    judicialFlight(log) {
        this.soaring = true;
        log.push("🦉 Owl Magistrate is soaring!");
    }
    verdict(opponent, log) {
        this.attack(opponent, log, 33);
        this.applyVuln(opponent, log, 4);
        this.soaring = false;
    }
    onTurn(turn, opponent, log) {
        super.onTurn(turn, opponent, log);
        if (turn % 4 == 1) {
            this.magistrateScrutiny(opponent, log);
        } else if (turn % 4 == 2) {
            this.peckAssault(opponent, log);
        } else if (turn % 4 == 3) {
            this.judicialFlight(log);
        } else {
            this.verdict(opponent, log);
        }
    }
}

export class MechaKnight extends Monster {
    constructor() {
        super("Mecha Knight", 300, 300, "./images/StS2_Mecha_Knight.webp");
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
        super.onTurn(turn, opponent, log);
        if (turn == 1) {
            this.charge(opponent, log);
        } else {
            if ((turn - 1) % 3 == 1) {
                this.flamethrower(opponent, log);
            } else if ((turn - 1) % 4 == 2) {
                this.windup(log);
            } else {
                this.heavyCleave(opponent, log);
            }
        }
    }
}

export class SoulNexus extends Monster {
    constructor() {
        super("Soul Nexus", 234, 234, "./images/StS2_Soul_Nexus.webp");
        this.lastMove = "None";
    }

    soulBurn(opponent, log) {
        this.attack(opponent, log, 29);
        this.lastMove = "soulBurn";
    }
    maelstrom(opponent, log) {
        this.multiAtk(opponent, log, 6, 4);
        this.lastMove = "maelstrom";
    }
    drainLife(opponent, log) {
        this.attack(opponent, log, 18);
        this.applyVuln(opponent, log, 2);
        this.applyWeak(opponent, log, 2);
        this.lastMove = "drainLife";
    }

    onTurn(turn, opponent, log) {
        super.onTurn(turn, opponent, log);
        if (turn == 1) {
            this.soulBurn(opponent, log);
        } else {
            let availableMoves = [this.soulBurn, this.maelstrom, this.drainLife];
            
            if (this.lastMove == "soulBurn") {
                availableMoves = availableMoves.filter(move => move !== this.soulBurn);
            }
            if (this.lastMove == "maelstrom") {
                availableMoves = availableMoves.filter(move => move !== this.maelstrom);
            }
            if (this.lastMove == "drainLife") {
                availableMoves = availableMoves.filter(move => move !== this.drainLife);
            }
            const selectedMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
            selectedMove.call(this, opponent, log);
        }
    }
}

// TODO: torchhead minion
export class Queen extends Monster {
    constructor() {
        super("Queen", 400, 400, "./images/StS2_Queen.webp");
    }

    puppetStrings(log) {
        log.push("⛓️ Queen cast Chains of Binding! (But nothing happened)");
    }
    // TODO: Frail?
    youreMine(opponent, log) {
        this.applyVuln(opponent, log, 1);
        this.applyWeak(opponent, log, 99);
        this.applyVuln(opponent, log, 99);
    }
    offWithYourHead(opponent, log) {
        this.multiAtk(opponent, log, 3, 5);
    }
    execution(opponent, log) {
        this.attack(opponent, log, 15);
    }
    enrage(log) {
        this.buffStr(log, 2);
    }
    onTurn(turn, opponent, log) {
        super.onTurn(turn, opponent, log);
        if (turn == 1) {
            this.puppetStrings(log);
            return;
        }
        if (turn == 2) {
            this.youreMine(opponent, log);
            return;
        }

        if (turn % 3 == 1) {
            this.offWithYourHead(opponent, log);
        } else if (turn % 3 == 2) {
            this.execution(opponent, log);
        } else {
            this.enrage(log);
        }
    }
}

export class TestSubject extends Monster {
    constructor() {
        super("Test Subject (Phase 1)", 100, 100, "./images/StS2_Test_Subject.webp");
    }
    bite(opponent, log) {
        this.attack(opponent, log, 20);
    }
    skullBash(opponent, log) {
        this.attack(opponent, log, 14);
        this.applyVuln(opponent, log, 1);
    }
    onTurn(turn, opponent, log) {
        super.onTurn(turn, opponent, log);
        if (turn % 2 == 1) {
            this.bite(opponent, log);
        } else {
            this.skullBash(opponent, log);
        }
    }
}

export class TestSubjectPhase2 extends Monster {
    constructor() {
        super("Test Subject (Phase 2)", 200, 200, "./images/StS2_Test_Subject_Phase_2.webp");
    }
    multiClaw(turn, opponent, log) {
        this.multiAtk(opponent, log, 10, 2 + turn);
    }
    onTurn(turn, opponent, log) {
        super.onTurn(turn, opponent, log);
        this.multiClaw(turn, opponent, log);
    }
}

export class TestSubjectPhase3 extends Monster {
    constructor() {
        super("Test Subject (Phase 3)", 300, 300, "./images/StS2_Test_Subject_Phase_3.webp");
        this.nemesis = true;
    }
    lacerate(opponent, log) {
        this.multiAtk(opponent, log, 10, 3);
    }
    bigPounce(opponent, log) {
        this.attack(opponent, log, 45);
    }
    burningGrowl(log) {
        log.push("🔥 Test Subject (Phase 3) shuffled burns into the deck! (But nothing happened)");
    }
    onTurn(turn, opponent, log) {
        super.onTurn(turn, opponent, log);
        this.nemesis = !this.nemesis;
        if (turn % 3 == 1) {
            this.lacerate(opponent, log);
        } else if (turn % 3 == 2) {
            this.bigPounce(opponent, log);
        } else {
            this.burningGrowl(log);
        }
    }
}

export class Aeonglass extends Monster {
    constructor() {
        super("Aeonglass", 512, 512, "./images/800px-StS2_Aeonglass.png");
        this.artifact = 3;
        this.intensity = 0;
    }
    ebb(opponent, log) {
        this.attack(opponent, log, 22);
        this.gainBlock(log, 33);
    }
    eyeLasers(opponent, log) {
        this.multiAtk(opponent, log, 11, 2);
    }
    increasingIntensity(log) {
        this.buffStr(log, 2 + this.intensity);
        this.intensity += 1;
    }
    onTurn(turn, opponent, log) {
        super.onTurn(turn, opponent, log);
        if (turn % 3 == 1) {
            this.ebb(opponent, log);
        } else if (turn % 3 == 2) {
            this.eyeLasers(opponent, log);
        } else {
            this.increasingIntensity(log);
        }
    }
}

export class Doormaker extends Monster {
    constructor() {
        super("Doormaker", 489, 489, "./images/800px-StS2_Doormaker-Hunger.webp");
    }
    dramaticOpen(log) {
        this.hp = 489;
        this.weakTurns = 0;
        this.vulnTurns = 0;
        this.shrink = false;
        log.push("🚪 The door is opened...")
    }
    hunger(opponent, log) {
        this.attack(opponent, log, 30);
    }
    scrutiny(opponent, log) {
        this.attack(opponent, log, 24);
    }
    grasp(opponent, log) {
        this.multiAtk(opponent, log, 10, 2);
        this.buffStr(log, 3);
    }
    onTurn(turn, opponent, log) {
        super.onTurn(turn, opponent, log);
        if (turn == 1) {
            this.dramaticOpen(log);
            return;
        }
        if ((turn - 1) % 3 == 1) {
            this.hunger(opponent, log);
        } else if ((turn - 1) % 3 == 2) {
            this.scrutiny(opponent, log);
        } else {
            this.grasp(opponent, log);
        }
    }
}