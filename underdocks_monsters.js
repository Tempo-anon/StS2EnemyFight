import { Monster } from "./monster.js";

export class Seapunk extends Monster {
    constructor() {
        super("Seapunk", 44, 46, "./images/StS2_Seapunk.webp");
    }

    seaKick(opponent, log) {
        this.attack(opponent, log, 11);
    }

    spinningKick(opponent, log) {
        this.multiAtk(opponent, log, 2, 4);
    }

    bubbleBurp(log) {
        this.gainBlock(log, 7);
        this.buffStr(log, 1);   
    }

    onTurn(turn, opponent, log) {
        super.onTurn(turn, opponent, log);
        if (turn % 3 == 1) {
            this.seaKick(opponent, log);
        } else if (turn % 3 == 2) {
            this.spinningKick(opponent, log);
        } else {
            this.bubbleBurp(opponent, log);
        }
    }
}

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

export class Toadpole extends Monster {
    constructor() {
        super("Toadpole", 21, 25, "./images/StS2_Toadpole.webp");
    }
    spikeSpit(opponent, log) {
        if (this.thorns > 0) {
            this.thorns = 0;
            log.push("Toadpole lost its spikes!");
        }
        this.multiAtk(opponent, log, 3, 3);
    }
    whirl(opponent, log) {
        this.attack(opponent, log, 7);
    }
    spiken(log) {
        this.thorns += 2;
        log.push("🌵 Toadpole gained spikes!");
    }
    onTurn(turn, opponent, log) {
        super.onTurn(turn, opponent, log);
        if (turn % 3 == 1) {
            this.whirl(opponent, log);
        } else if (turn % 3 == 2) {
            this.spiken(log);
        }  else {
            this.spikeSpit(opponent, log);
        }
    }
}

export class CalcifiedCultist extends Monster {
    constructor() {
        super("Calcified Cultist", 38, 41, "./images/StS2_Calcified_Cultist.webp");
        this.ritual = false;
    }
    incatation(log) {
        log.push("Calcified Cultist calls out an incantation...");
        log.push("OUR POWER IS UNMATCHED!");
        this.ritual = true;
    }
    darkStrike(opponent, log) {
        this.attack(opponent, log, 9);
    }
    onTurn(turn, opponent, log) {
        super.onTurn(turn, opponent, log);
        if (this.ritual == true) {
            this.buffStr(log, 2);
        }
        if (turn == 1) {
            this.incatation(log);
        } else {
           this.darkStrike(opponent, log);
        }
    }
}

export class DampCultist extends Monster {
    constructor() {
        super("Damp Cultist", 51, 53, "./images/StS2_Damp_Cultist.webp");
        this.ritual = false;
    }
    incatation(log) {
        log.push("Damp Cultist calls out an incantation...");
        log.push("CAW! CAAAAW");
        this.ritual = true;
    }
    darkStrike(opponent, log) {
        this.attack(opponent, log, 1);
    }
    onTurn(turn, opponent, log) {
        super.onTurn(turn, opponent, log);
        if (this.ritual == true) {
            this.buffStr(log, 5);
        }
        if (turn == 1) {
            this.incatation(log);
        } else {
           this.darkStrike(opponent, log);
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

export class SkulkingColony extends Monster {
    constructor() {
        super("Skulking Colony", 75, 75, "./images/StS2_Skulking_Colony.webp");
        this.dmgCap = true;
        this.dmgCapAmt = 20;
    }

    zoom(opponent, log) {
        this.attack(opponent, log, 14);
    }

    inertia(opponent, log) {
        this.attack(opponent, log, 9);
        this.buffStr(log, 2);
    }

    piercingStabs(opponent, log) {
        this.multiAtk(opponent, log, 7, 2);
    }

    onTurn(turn, opponent, log) {
        super.onTurn(turn, opponent, log);
        this.dmgCapAmt = 20;
        if (turn % 4 == 3) {
            this.inertia(opponent, log);
        } else if (turn % 4 == 0) {
            this.piercingStabs(opponent, log);
        } else {
            this.zoom(opponent, log);
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

export class LagavulinMatriarch extends Monster {
    constructor() {
        super("Lagavulin Matriarch", 222, 222, "./images/StS2_Lagavulin_Matriarch.webp");
        this.plating = 12;
        this.woke = false;
        this.wakeTurn = 0;
    }

    wake(log) {
        log.push("❗ Lagavulin Matriarch has woken up!");
        this.plating = 0;
    }

    sleep(log) {
        log.push("💤 Lagavulin Matriarch is sleeping...");
    }

    slash(opponent, log) {
        this.attack(opponent, log, 19);
    }

    disembowel(opponent, log) {
        this.multiAtk(opponent, log, 9, 2);
    }

    slash2(opponent, log) {
        this.attack(opponent, log, 12);
        this.gainBlock(log, 12);
    }

    soulSiphon(opponent, log) {
        this.applyNegStrength(opponent, log, 2);
        this.buffStr(log, 2);
    }

    onTurn(turn, opponent, log) {
        super.onTurn(turn, opponent, log);
        if (this.woke == false) {
            if (this.hp < 222 || turn == 3) {
                this.woke = true;
                this.wakeTurn = turn;
                this.wake(log);
                return;
            } else {
                this.sleep(log);
                return;
            }
        }

        if (this.wakeTurn % 4 == 1) {
            this.slash(opponent, log);
        } else if (this.wakeTurn % 4 == 2) {
            this.disembowel(opponent, log);
        } else if (this.wakeTurn % 4 == 3) {
            this.slash2(opponent, log);
        } else {
            this.soulSiphon(opponent, log);
        }
        this.wakeTurn += 1;
    }
}

export class SoulFysh extends Monster {
    constructor() {
        super("Soul Fysh", 211, 211, "./images/StS2_Soul_Fysh.webp");
    }

    beckon(log) {
        log.push("Soul Fysh beckoned! (But nothing happened)");
    }

    deGas(opponent, log) {
        this.attack(opponent, log, 16);
    }

    gaze(opponent, log) {
        this.attack(opponent, log, 7);
    }

    fade(log) {
        this.intangible += 2;
        log.push("Soul Fysh faded away!");
    }

    scream(opponent, log) {
        this.attack(opponent, log, 13);
        this.applyVuln(opponent, log, 3);
    }

    onTurn(turn, opponent, log) {
        super.onTurn(turn, opponent, log);
        if (turn % 5 == 1) {
            this.beckon(log);
        } else if (turn % 5 == 2) {
            this.deGas(opponent, log);
        } else if (turn % 5 == 3) {
            this.gaze(opponent, log);
        } else if (turn % 5 == 4) {
            this.fade(log);
        } else {
            this.scream(opponent, log);
        }
    }
}

export class WaterfallGiant extends Monster {
    constructor() {
        super("Waterfall Giant", 999, 999, "./images/StS2_Waterfall_Giant.webp");
        this.steam = 0;
        this.pressure = 0;
        this.nextTurnAboutToBlow = false;
        this.nextTurnExplode = false;
        this.exploded = false;
    }

    pressurize(log) {
        log.push("Waterfall Giant is building pressure!");
        this.steam += 15;
    }

    stomp(opponent, log) {
        this.attack(opponent, log, 15);
        this.applyWeak(opponent, log, 1);
        this.steam += 3;
    }

    ram(opponent, log) {
        this.attack(opponent, log, 7);
        this.steam += 3;
    }

    siphon(log) {
        this.heal(log, 15);
        this.steam += 3;
    }

    pressureGun(opponent, log) {
        this.attack(opponent, log, 20 + 5 * this.pressure);
        this.steam += 3;
    }

    pressureUp(opponent, log) {
        this.attack(opponent, log, 13);
        this.steam += 3;
    }

    aboutToBlow(log) {
        this.vulnTurns = 0;
        this.weakTurns = 0;
        log.push("⚠️ Waterfall Giant is about to explode!")
        this.nextTurnExplode = true;
    }

    explode(opponent, log) {
        this.attack(opponent, log, this.steam);
        this.hp = 0;
        log.push("💣 Waterfall Giant exploded!");
    }

    onTurn(turn, opponent, log) {
        super.onTurn(turn, opponent, log);
        if (this.exploded) {
            return;
        }
        if (this.nextTurnExplode) {
            this.explode(opponent, log);
            return;
        }
       
        if (this.nextTurnAboutToBlow == false && this.hp <= (999 - 240)) {
            this.nextTurnAboutToBlow = true;
        }
        if (this.nextTurnAboutToBlow) {
            this.aboutToBlow(log);
            return;
        }

        if (turn == 1) {
            this.pressurize(log);
        } else if ((turn - 1) % 5 == 1) {
            this.stomp(opponent, log);
        } else if ((turn - 1) % 5 == 2) {
            this.ram(opponent, log);
        } else if ((turn - 1) % 5 == 3) {
            this.siphon(log);
        } else if ((turn - 1) % 5 == 4) {
            this.pressureGun(opponent, log);
        } else {
            this.pressureUp(opponent, log);
        }
        
    }
}