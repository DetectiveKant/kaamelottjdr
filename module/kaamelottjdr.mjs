// Import document classes.
import { KAAMELOTTJDRActor } from "./documents/actor.mjs";
// import { KAAMELOTTJDRItem } from "./documents/item.mjs";
// Import sheet classes.
import { KAAMELOTTJDRActorSheet } from "./sheets/actor-sheet.mjs";
// import { KAAMELOTTJDRItemSheet } from "./sheets/item-sheet.mjs";

// Import helper/utility classes and constants.
// import { preloadHandlebarsTemplates } from "./helpers/templates.mjs";
import { KAAMELOTTJDR } from "./helpers/config.mjs";


/* -------------------------------------------- */
/*  Init Hook                                   */
/* -------------------------------------------- */

Hooks.once("init", function () {
    console.log("kaamelottjdr | Initialising Kaamelott JdR system");
    
    // Add custom constants for configuration.
    CONFIG.KAAMELOTTJDR = KAAMELOTTJDR;

    // Define custom Document classes
    CONFIG.Actor.documentClass = KAAMELOTTJDRActor;
    // CONFIG.Item.documentClass = KAAMELOTTJDRItem;

    Actors.unregisterSheet("core", ActorSheet);
    Actors.registerSheet("kaamelottjdr", KAAMELOTTJDRActorSheet, {makeDefault: true});
    // Items.unregisterSheet("core", ItemSheet);
    // Items.registerSheet("kaamelottjdr", KAAMELOTTJDRItemSheet, {makeDefault: true});

    // Preload Handlebars templates.
    // return preloadHandlebarsTemplates();

});