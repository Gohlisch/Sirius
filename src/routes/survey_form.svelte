<script lang="ts">
	let neverSlots = [];
	let dailySlots = [];
	let weeklySlots = [];
	let slotsDiv: HTMLDivElement;

	/**
	 * @callback htmlGeneratorFunc
	 * @returns {string} generated html
	 */

	/** @type {htmlGeneratorFunc} */
	const generateNeverRepetitionInput = () => {
		return `
                    <div class="inputgroup">
                    <label class="required">Datum:
                    <input  data-input="day"
                            type="date"
                            name="day"
                            required>
                    </label>
                    <label class="required">Startzeit:
                    <input  data-input="start"
                            type="time"
                            name="start"
                            min="00:00"
                            max="23:59"
                            required>
                    </label>
                    <label class="required">Endzeit:
                    <input  data-input="end"
                            type="time"
                            name="end"
                            min="00:00"
                            max="23:59"
                            required>
                    </label>
                    </div>`;
	};

	/** @type {htmlGeneratorFunc} */
	const generateDailyRepetitionInput = () => {
		return `
                    <div class="inputgroup">
                    <label class="required">Startzeit:
                    <input  data-input="start"
                            type="time"
                            name="start"
                            min="00:00"
                            max="23:59"
                            required>
                    </label>
                    <label class="required">Endzeit:
                    <input  data-input="end"
                            type="time"
                            name="end"
                            min="00:00"
                            max="23:59"
                            required>
                    </label>
                    </div>`;
	};

	/** @type {htmlGeneratorFunc} */
	const generateWeeklyRepetitionInput = () => {
		return `
                    <div class="inputgroup">
                    <label class="required">Wochentag:
                      <select data-input="weekday" name="weekday">
                        <option value="" selected>Tag wählen</option>
                        <option value="monday">Montag</option>
                        <option value="tuesday">Dienstag</option>
                        <option value="wednesday">Mittwoch</option>
                        <option value="thursday">Donnerstag</option>
                        <option value="friday">Freitag</option>
                        <option value="saturday">Samstag</option>
                        <option value="sunday">Sonntag</option>
                      </select>
                      </label>
                    <label class="required">Startzeit:
                    <input data-input="start"
                            type="time"
                            name="start"
                            min="00:00"
                            max="23:59"
                            required>
                    </label>
                    <label class="required">Endzeit:
                    <input data-input="end"
                            type="time"
                            name="end"
                            min="00:00"
                            max="23:59"
                            required>
                    </label>
                    </div>`;
	};

	/**
	 * @typedef Slot
	 * @property {HTMLDivElement} groupDiv
	 */
	function slotIsEmpty(slot) {
		for (const value in slot) {
			if (value !== "groupDiv" && slot[value] !== "") return false;
		}
		return true;
	}

	/**
	 * @param {Slot} slot
	 * @return {boolean}
	 */
	function slotIsValid(slot) {
		return (Array.from(slot.groupDiv.querySelectorAll("input, select")) as Array<HTMLInputElement>).every(s => s.checkValidity());
	}


	/**
	 * @param {HTMLDivElement} containerDiv
	 * @param {Array<Slot>} slots
	 * @param {function(number): string} formGroupHtmlGeneratorFunc
	 * @param {Array<string>} inputIds
	 * @constructor
	 */
	class FormGroupContainer {
		private containerDiv: HTMLDivElement;
		private slots: Array<object>;
		private formGroupHtmlGeneratorFunc: ()=>string;
		private inputIds: Array<string>;

		constructor(containerDiv, slots, formGroupHtmlGeneratorFunc, inputIds) {
			this.containerDiv = containerDiv;
			this.slots = slots;
			this.formGroupHtmlGeneratorFunc = formGroupHtmlGeneratorFunc;
			this.inputIds = inputIds;
		}

		generateSlots() {
			while (this.containerDiv.lastElementChild) {
				this.containerDiv.removeChild(this.containerDiv.lastElementChild);
			}
			if (this.slots.length === 0) {
				this.addSlot();
			} else {
				this.slots.forEach(s => this.generateFormGroupFromSlot(s));
			}
		}

		addSlot() {
			const newSlot = {};
			this.inputIds.forEach((name) => newSlot[name] = "");
			this.slots.push(newSlot);
			this.generateFormGroupFromSlot(newSlot);
		}

		generateFormGroupFromSlot(slot) {
			this.containerDiv.insertAdjacentHTML("beforeend", this.formGroupHtmlGeneratorFunc());
			slot["groupDiv"] = this.containerDiv.lastElementChild;
			const generatedInputs = slot["groupDiv"].querySelectorAll("input, select");
			this.setRequired(slot);

			generatedInputs.forEach((input) => input.value = slot[input.dataset.input]);
			generatedInputs.forEach((input) => {
				input.oninput = () => {
					slot[input.dataset.input] = input.value;
					this.setRequired(slot);
					if (slotIsEmpty(slot) && this.slots.length > 0) {
						this.removeSlot(slot);
					}
					if (this.slots.every(s => !slotIsEmpty(s) && slotIsValid(s))) {
						this.addSlot();
					}
				};
			});
		}

		removeSlot(slot) {
			this.containerDiv.removeChild(slot.groupDiv);
			this.slots.splice(this.slots.findIndex(s => s === slot), 1);
		}

		/**
		 * @param {Slot} slot
		 */
		setRequired(slot) {
			const lastFormGroupDiv = slot.groupDiv;

			if (slotIsEmpty(slot) && this.slots.findIndex(s => s === slot) > 0) {
				lastFormGroupDiv.querySelectorAll("input, select")
					.forEach((inpElement) => {
						inpElement.required = false;
					});
				lastFormGroupDiv.className = "newly_generated";
			} else {
				lastFormGroupDiv.querySelectorAll("input, select")
					.forEach((inpElement) => {
						inpElement.required = true;
					});
				lastFormGroupDiv.className = "";
			}
		}
	}

	window.onload = () => {
		const repetitionNever = document.getElementById("never");
		const repetitionDaily = document.getElementById("daily");
		const repetitionWeekly = document.getElementById("weekly");
		slotsDiv = document.getElementById("slots") as HTMLDivElement;

		const neverFormContainer = new FormGroupContainer(slotsDiv, neverSlots, generateNeverRepetitionInput, ["date", "start", "end"]);
		const dailyFormContainer = new FormGroupContainer(slotsDiv, dailySlots, generateDailyRepetitionInput, ["start", "end"]);
		const weeklyFormContainer = new FormGroupContainer(slotsDiv, weeklySlots, generateWeeklyRepetitionInput, ["weekday", "start", "end"]);

		repetitionNever.onchange = () => {
			neverFormContainer.generateSlots();
		};
		repetitionDaily.onchange = () => {
			dailyFormContainer.generateSlots();
		};
		repetitionWeekly.onchange = () => {
			weeklyFormContainer.generateSlots();
		};
	};
</script>
<style>
    #slots :invalid {
        color: var(--warning);
    }

    .newly_generated {
        color: var(--inactive_color);
    }

    [for="description"] {
        display: block;
        width: 100%;
    }

    textarea {
        width: 100%;
        resize: vertical;
    }
</style>
<svelte:head>
    <title>Sirius – Neue Umfrage</title>
</svelte:head>
<main>
    <section>
        <h2>Neue Umfrage erstellen</h2>
        <form action="/survey" method="post">
            <fieldset>
                <legend>Informationen</legend>
                <label for="title" class="required">Titel:
                    <input
                            type="text"
                            name="title"
                            id="title"
                            placeholder="max. 256 Zeichen"
                            maxlength="256"
                            autofocus required>
                </label>
                <label for="description">Beschreibung:
                    <textarea
                            name="description"
                            id="description"
                            placeholder="optional, max. 1024 Zeichen"
                            maxlength="1024"
                    ></textarea>
                </label>
            </fieldset>
            <fieldset>
                <legend>Wiederholung des Termins</legend>
                <label for="never"><input id="never" name="repetition" value="never" type="radio">niemals</label>
                <label for="daily"><input id="daily" name="repetition" value="daily" type="radio">täglich</label>
                <label for="weekly"><input id="weekly" name="repetition" value="weekly" type="radio">wöchentlich</label>
            </fieldset>
            <fieldset>
                <legend>Auswählbare Slots</legend>
                <div id="slots">
                    <p>Wählen Sie zunächst eine Wiederholungsrate aus</p>
                </div>
            </fieldset>
            <button type="submit">Erstellen</button>
        </form>
    </section>
</main>

