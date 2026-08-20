export class Monster {
    constructor(name, hp, maxHp, image) {
        this.name = name;
        this.hp = hp; // + Math.floor(Math.random() * (maxHp - hp + 1));
        this.maxHp = maxHp;
        this.strength = 0;
        this.image = image;
        this.weakTurns = 0;
        this.vulnTurns = 0;
        this.block = 0;
        this.artifact = 0;
        this.slippery = 0;
        this.intangible = 0;
        this.plating = 0;
        this.soaring = false;
        this.nemesis = false;
        this.shrink = false;
        this.thorns = 0;
        this.exoskeleton = false;
        this.dmgCap = false;
        this.dmgCapAmt = 0;
    }

    onTurn(turn, opponent, log) {
        this.block = 0; // Reset block at start of turn
        if (opponent.plating > 0) {
            log.push(`${opponent.name} has ${opponent.plating} plating!`)
            opponent.block += opponent.plating;
        }
    }

    endTurn(turn, opponent, log) {
        if (this.weakTurns > 0) this.weakTurns -= 1;
        if (this.vulnTurns > 0) this.vulnTurns -= 1;
        if (this.intangible > 0) this.intangible -= 1;
        if (this.plating > 0) this.plating -= 1;
    }

    attack(opponent, log, dmg) {
        let baseDmg = Math.max(0, dmg + this.strength); 
        let shrinkDmg = this.shrink ? Math.floor(0.70 * baseDmg) : baseDmg
        let weakDmg = this.weakTurns > 0 ? Math.floor(0.75 * shrinkDmg) : shrinkDmg; 
        let dmgAfterVuln = opponent.vulnTurns > 0 ? Math.floor(1.5 * weakDmg) : weakDmg;

        log.push(`⚔️ ${this.name} attacks ${opponent.name} for ${dmgAfterVuln} damage!`);

        if (opponent.block >= dmgAfterVuln) {
            opponent.block -= dmgAfterVuln;
            log.push(`🛡️ ${opponent.name}'s block absorbed the attack!`);
        } else {
            let dmgAfterBlock = dmgAfterVuln - opponent.block;
            opponent.block = 0;

            if (opponent.soaring == true) {
                log.push(`🦉 ${opponent.name} takes half damage!`);
                dmgAfterBlock = Math.floor(dmgAfterBlock / 2);
            }

            if (opponent.exoskeleton == true && dmgAfterBlock > 9) {
                log.push(`🪳 ${opponent.name}'s exoskeleton reduces damage!`);
                dmgAfterBlock = 9;
            }

            if (opponent.slippery > 0) {
                log.push(`💧 ${opponent.name} is slippery!`);
                dmgAfterBlock = 1;
                opponent.slippery -= 1;
            }

            if (opponent.intangible > 0 || opponent.nemesis) {
                log.push(`👻 ${opponent.name} is intangible!`);
                dmgAfterBlock = 1;
            }

            if (opponent.dmgCap) {
                if (dmgAfterBlock >= opponent.dmgCapAmt) {
                    dmgAfterBlock = opponent.dmgCapAmt;
                    log.push(`🥟 ${opponent.name} blocks the damage!`);
                }
                opponent.dmgCapAmt -= dmgAfterBlock;
            }

            opponent.hp = Math.max(0, opponent.hp - dmgAfterBlock);
            log.push(`💥 ${opponent.name} takes ${dmgAfterBlock} damage!`);
        }

        if (opponent.thorns > 0) {
            this.hp -= opponent.thorns;
            log.push(`🌵 ${this.name} takes ${opponent.thorns} damage from thorns!`)
        }

        
    }

    multiAtk(opponent, log, dmg, times) {
        for (let time = 0; time < times; time++) {
            this.attack(opponent, log, dmg);
            if (opponent.hp <= 0 || this.hp <= 0) break;
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

    heal(log, healAmt) {
        this.hp += healAmt;
        log.push(`❇️ ${this.name} healed ${healAmt} HP!`);
    }

    // Tries to apply a debuff on the opponent, returns true if possible, false if blocked by artifact
    applyDebuff(opponent, log) {
        if (opponent.artifact > 0) {
            log.push(`⚙️ ${opponent.name}'s artifact blocked the debuff!`);
            opponent.artifact -= 1;
            return false;
        }
        return true;
    }

    applyShrink(opponent, log) {
        if (this.applyDebuff(opponent, log)) {
            opponent.shrink = true;
            log.push(`🪲 ${opponent.name} has shrunk!`)
        }
    }

    applyWeak(opponent, log, weakAmt) {
        if (this.applyDebuff(opponent, log)) {
            opponent.weakTurns += weakAmt;
            log.push(`🥀 ${opponent.name} has become weak for ${weakAmt} turns!`)
        }
    }

    applyVuln(opponent, log, vulnAmt) {
        if (this.applyDebuff(opponent, log)) {
            opponent.vulnTurns += vulnAmt;
            log.push(`💔 ${opponent.name} has become vulnerable for ${vulnAmt} turns!`)
        }
    }

    applyNegStrength(opponent, log, negAmt) {
        if (this.applyDebuff(opponent, log)) {
            opponent.strength -= negAmt;
            log.push(`${opponent.name} lost ${negAmt} strength!`)
        }
    }

}