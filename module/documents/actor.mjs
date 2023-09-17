export class KAAMELOTTJDRActor extends Actor {
    
    /** @override */
    prepareData() {
        super.prepareData();
    }

    /** @override */
    prepareBaseData() {
    }

    prepareDerivedData() {
        const actorData = this;
        const systemData = actorData.system;
        //const flags = actorData.flags.kaamelottjdr || {};

        //console.log("jdrsystem | DERIVED DATA");

        if (actorData.type === 'character') this._prepareCharacterData(actorData);
        // this._prepareNpcData(actorData);
    }

    _prepareCharacterData(actorData) {
        if (actorData.type !== 'character') return;
        
        // Make modifications to data here. For example:
        const systemData = actorData.system;

        //actorData.abilities.str = Math.floor((actorData.abilities.strength - 10) / 2);
        for (let [key, stat] of Object.entries(systemData.primary)) {
            // Calculate the modifier using d20 rules.
            // console.log("jdrsystem | ", stat);
            stat.total = stat.value + stat.bonus;
        }
    }

    /* -------------------------------------------- */

    /* -------------------------------------------- */
    
}