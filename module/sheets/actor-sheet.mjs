export class KAAMELOTTJDRActorSheet extends ActorSheet {
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            template: "systems/kaamelottjdr/templates/actor/actor-character-sheet.html",
            classes: ["kaamelottjdr", "sheet", "actor"]
        });
    }
    /** @override */
    get template() {
        return `systems/kaamelottjdr/templates/actor/actor-${this.actor.type}-sheet.html`;
      }
    
    /** @override */
    getData() {
        // Retrieve the data structure from the base sheet. You can inspect or log
        // the context variable to see the structure, but some key properties for
        // sheets are the actor object, the data object, whether or not it's
        // editable, the items array, and the effects array.
        const context = super.getData();

        // Use a safe clone of the actor data for further operations.
        const actorData = this.actor.toObject(false);

        // Add the actor's data to context.data for easier access, as well as flags.
        context.system = actorData.system;
        // context.flags = actorData.flags;

        // Prepare character data and items.
        if (actorData.type == 'character') {
            // this._prepareItems(context);
            this._prepareCharacterData(context);
            }
  
        // Prepare NPC data and items.
        // if (actorData.type == 'npc') {
        //     this._prepareItems(context);
        // }

        // // Add roll data for TinyMCE editors.
        // context.rollData = context.actor.getRollData();

        // // Prepare active effects
        // context.effects = prepareActiveEffectCategories(this.actor.effects);  
        return context;
      }

    /**
     * Organize and classify Items for Character sheets.
     *
     * @param {Object} actorData The actor to prepare.
     *
     * @return {undefined}
     */
  _prepareCharacterData(context) {
    // Handle ability scores.
    for (let [k, v] of Object.entries(context.system.primary)) {
      v.exists = k in CONFIG.KAAMELOTTJDR.primary;
      v.label = game.i18n.localize(CONFIG.KAAMELOTTJDR.primary[k]) ?? k;
    }

    for (let [k, v] of Object.entries(context.system.secondary)) {
      v.exists = k in CONFIG.KAAMELOTTJDR.secondary;
      v.label = game.i18n.localize(CONFIG.KAAMELOTTJDR.secondary[k]) ?? k;
    }
  }

  /* -------------------------------------------- */

  /** @override */
  activateListeners(html) {
    super.activateListeners(html);

    // Render the item sheet for viewing/editing prior to the editable check.
    // html.find('.item-edit').click(ev => {
    //   const li = $(ev.currentTarget).parents(".item");
    //   const item = this.actor.items.get(li.data("itemId"));
    //   item.sheet.render(true);
    // });

    // -------------------------------------------------------------
    // Everything below here is only needed if the sheet is editable
    if (!this.isEditable) return;

    // Add Inventory Item
    // html.find('.item-create').click(this._onItemCreate.bind(this));

    // Delete Inventory Item
    // html.find('.item-delete').click(ev => {
    //   const li = $(ev.currentTarget).parents(".item");
    //   const item = this.actor.items.get(li.data("itemId"));
    //   item.delete();
    //   li.slideUp(200, () => this.render(false));
    // });

    // Active Effect management
    // html.find(".effect-control").click(ev => onManageActiveEffect(ev, this.actor));

    // Rollable abilities.
    html.find('.rollable').click(this._onRoll.bind(this));
  }

  /**
   * Handle clickable rolls.
   * @param {Event} event   The originating click event
   * @private
   */
  _onRoll(event) {
    event.preventDefault();
    const element = event.currentTarget;
    const dataset = element.dataset;
    // // Handle item rolls.
    // if (dataset.rollType) {
    //   if (dataset.rollType == 'item') {
    //     const itemId = element.closest('.item').dataset.itemId;
    //     const item = this.actor.items.get(itemId);
    //     if (item) return item.roll();
    //   }
    // }

    // Handle rolls that supply the formula directly.
    if (dataset.roll) {
      let label = dataset.label ? `Test de ${dataset.label}` : ''; //todo ; Localize this
      console.log(`kaamelottjdr | ${dataset.label}`);
      let roll = new Roll(dataset.roll, this.actor.getRollData());
      roll.toMessage({
        speaker: ChatMessage.getSpeaker({ actor: this.actor }),
        flavor: label,
        rollMode: game.settings.get('core', 'rollMode'),
      });
      return roll;
    }
  }
}

