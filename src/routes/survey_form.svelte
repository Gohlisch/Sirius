<script lang="ts">
	import type { Repetition } from "src/model/survey_dto";

	let repititon: Repetition;
	let dailySlots: Array<{start: string, end: string}> = [{start:"", end:""}];
	let weeklySlots: Array<{weekday: string, start: string, end: string}> = [{weekday:"", start:"", end:""}];
	let neverSlots: Array<{day: string, start: string, end: string}> = [{day:"", start:"", end:""}];

	function handleDailySlotInput(slotNumber: number) {
		if(slotIsEmpty(dailySlots[slotNumber]) && dailySlots.length > 0) {
			dailySlots.splice(slotNumber, 1);
		}
		if (dailySlots.every(s => !slotIsEmpty(s) && slotIsValid(slotNumber))) {
			dailySlots.push({start:"", end:""});
		}
		dailySlots = dailySlots; // Inform Svelte that changes occured
	}

	function handleWeeklySlotInput(slotNumber: number) {
		if(slotIsEmpty(weeklySlots[slotNumber]) && weeklySlots.length > 0) {
			weeklySlots.splice(slotNumber, 1);
		}
		if (weeklySlots.every(s => !slotIsEmpty(s) && slotIsValid(slotNumber))) {
			weeklySlots.push({weekday:"", start:"", end:""});
		}
		weeklySlots = weeklySlots; // Inform Svelte that changes occured
	}

	function handleNeverSlotInput(slotNumber: number) {
		if(slotIsEmpty(neverSlots[slotNumber]) && neverSlots.length > 0) {
			neverSlots.splice(slotNumber, 1);
		}
		if (neverSlots.every(s => !slotIsEmpty(s) && slotIsValid(slotNumber))) {
			neverSlots.push({day:"", start:"", end:""});
		}
		neverSlots = neverSlots; // Inform Svelte that changes occured
	}

	/**
	 * @typedef Slot
	 * @property {HTMLDivElement} groupDiv
	 */
	 function slotIsEmpty(slot) {
		for(const value in slot) {
			if(slot[value] !== "") return false;
		}
		return true;
	}

	/**
	 * @param {Slot} slot
	 * @return {boolean}
	 */
	function slotIsValid(inputGroupNumber: number) {
		return (Array.from(document.getElementById(`inputgroup${inputGroupNumber}`).querySelectorAll("input, select")) as Array<HTMLInputElement>)
			.every(s => s.checkValidity());
	}
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
                <label for="never"><input id="never" name="repetition" value="never" type="radio" bind:group={repititon}>niemals</label>
                <label for="daily"><input id="daily" name="repetition" value="daily" type="radio" bind:group={repititon}>täglich</label>
                <label for="weekly"><input id="weekly" name="repetition" value="weekly" type="radio" bind:group={repititon}>wöchentlich</label>
            </fieldset>
            <fieldset>
                <legend>Auswählbare Slots</legend>
                <div id="slots">
					{#if repititon === "daily"}
					{#each dailySlots as slot, i}
                    <div id="inputgroup{i}" class:newly_generated={i !== 0 && !slot.start && !slot.end}>
						<label class="required">Startzeit:
						<input  type="time"
								name="start"
								min="00:00"
								max="23:59"
								required={!!(i === 0 || slot.start || slot.end)}
								bind:value={slot["start"]}
								on:input={(e) => handleDailySlotInput(i)}>
						</label>
						<label class="required">Endzeit:
						<input  type="time"
								name="end"
								min="00:00"
								max="23:59"
								required={!!(i === 0 || slot.start || slot.end)}
								bind:value={slot["end"]}
								on:input={(e) => handleDailySlotInput(i)}>
						</label>
						</div>
					{/each}
					{:else if repititon === "weekly"}
					{#each weeklySlots as slot, i}
                    <div id="inputgroup{i}" class:newly_generated={i !== 0 && !slot.weekday && !slot.start && !slot.end}>
						<label class="required">Wochentag:
							<select name="weekday"
									required={!!(i === 0 || slot.weekday || slot.start || slot.end)}
									bind:value={slot["weekday"]}
									on:select={(e) => handleWeeklySlotInput(i)}>
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
						<input  type="time"
								name="start"
								min="00:00"
								max="23:59"
								required={!!(i === 0 || slot.weekday || slot.start || slot.end)}
								bind:value={slot["start"]}
								on:input={(e) => handleWeeklySlotInput(i)}>
						</label>
						<label class="required">Endzeit:
						<input  type="time"
								name="end"
								min="00:00"
								max="23:59"
								required={!!(i === 0 || slot.weekday || slot.start || slot.end)}
								bind:value={slot["end"]}
								on:input={(e) => handleWeeklySlotInput(i)}>
						</label>
						</div>
						{/each}
						{:else if repititon === "never"}
						{#each neverSlots as slot, i}
						<div id="inputgroup{i}" class:newly_generated={i !== 0 && !slot.day && !slot.start && !slot.end}>
							<label class="required">Datum:
							<input  type="date"
									name="day"
									required={!!(i === 0 || slot.day || slot.start || slot.end)}
									bind:value={slot["day"]}
									on:input={(e) => handleNeverSlotInput(i)}>
							</label>
							<label class="required">Startzeit:
							<input  type="time"
									name="start"
									min="00:00"
									max="23:59"
									required={!!(i === 0 || slot.day || slot.start || slot.end)}
									bind:value={slot["start"]}
									on:input={(e) => handleNeverSlotInput(i)}>
							</label>
							<label class="required">Endzeit:
							<input  type="time"
									name="end"
									min="00:00"
									max="23:59"
									required={!!(i === 0 || slot.day || slot.start || slot.end)}
									bind:value={slot["end"]}
									on:input={(e) => handleNeverSlotInput(i)}>
							</label>
							</div>
						{/each}
						{:else}
                    	<p>Wählen Sie zunächst eine Wiederholungsrate aus</p>
						{/if}
                </div>
            </fieldset>
            <button type="submit">Erstellen</button>
        </form>
    </section>
</main>

