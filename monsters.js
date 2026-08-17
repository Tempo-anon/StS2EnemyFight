import {Nibbit, FuzzyWurmCrawler, Mawler, Byrdonis, BygoneEffigy, ShrinkerBeetle, CubexConstruct, VineShambler, Vantom, KinPriest, CeremonialBeast} from "./overgrowth_monsters.js";
import { SludgeSpinner, FossilStalker, HauntedShip, PunchConstruct, SewerClam, TerrorEel } from "./underdocks_monsters.js";
import { Monster } from "./monster.js";



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
        super("Infested Prism", 161, 161, "./images/StS2_Infested_Prism.webp");
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


export const monsterClasses = [Nibbit, FuzzyWurmCrawler, Mawler, Byrdonis, BygoneEffigy, ShrinkerBeetle, CubexConstruct, VineShambler, Vantom, KinPriest, CeremonialBeast, 
    SludgeSpinner, FossilStalker, HauntedShip, PunchConstruct, SewerClam, TerrorEel,
    Entomancer, MechaKnight];
