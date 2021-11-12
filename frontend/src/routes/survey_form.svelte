<script lang="ts">
	import type { Repetition } from "../model/survey_dto";
	import {BACKEND_URL} from "$lib/sirius_config";
	import type { TimeSlot } from "../model/time_slot";
	import { weekdayToNumber } from "../util/util";

	let title: string;
	let description: string;
	let repetition: Repetition;
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

	function submitAppointmentSurvey(e: Event&{ currentTarget: EventTarget&HTMLFormElement; }): void {
		fetch("http://" + BACKEND_URL + "/api/survey", {
			method: "POST",
			mode: "cors",
			redirect: "follow",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				title: title,
				repetition: repetitionStringToRepetitionNumber(repetition),
				description: description,
				slots: getSlotsAsTimeSlotDto(),
				participants: []
			})
		});
	}

	function getSlotsAsTimeSlotDto(): Array<{start: Date, end: Date}> {
		console.log(neverSlots.slice(0, -1));

		if(repetition === "never") {
			return neverSlots.slice(0, -1).map(slot => {
				const startDate = new Date(slot.day);
				setTime(startDate, slot.start);
				const endDate = new Date(slot.day);
				setTime(endDate, slot.end);

				return {start: startDate, end: endDate }
			});
		} else if(repetition === "daily") {
			return dailySlots.slice(0, -1).map(slot => {
				const startDate = new Date(0,0,0);
				setTime(startDate, slot.start);
				const endDate = new Date(0,0,0);
				setTime(endDate, slot.end);

				return {start: startDate, end: endDate }
			});
		} else if(repetition === "weekly") {
			return weeklySlots.slice(0, -1).map(slot => {
				const startDate = new Date(0,0,weekdayToNumber(slot.weekday));
				setTime(startDate, slot.start);
				const endDate = new Date(0,0,weekdayToNumber(slot.weekday));
				setTime(endDate, slot.end);
				
				return {start: startDate, end: endDate }
			});
		} else {
			return [];
		}
	}

	/**
	 * @param date - Date object, of which the time will be set
	 * @param time - Time to be set in hh:mm format
	 */
	function setTime(date: Date, time: string): void {
		const timeFormatRegex = /(\d\d):(\d\d)/;
		const timeFormatGroups = timeFormatRegex.exec(time) ;

		date.setHours(timeFormatGroups[1] as unknown as number);
		date.setMinutes(timeFormatGroups[2] as unknown as number);
	}

	function repetitionStringToRepetitionNumber(r: Repetition) {
		switch(r) {
			case("never"): return 0;
			case("daily"): return 1;
			case("weekly"): return 2;
			default: return -1;
		}
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
        <form action="/survey" method="post" on:submit|preventDefault={(e => submitAppointmentSurvey(e))}>
            <fieldset>
                <legend>Informationen</legend>
                <label for="title" class="required">Titel:
                    <input
                            type="text"
                            name="title"
                            id="title"
                            placeholder="max. 256 Zeichen"
                            maxlength="256"
							bind:value={title}
                            required>
                </label>
                <label for="description">Beschreibung:
                    <textarea
                            name="description"
                            id="description"
                            placeholder="optional, max. 1024 Zeichen"
                            maxlength="1024"
							bind:value={description}
                    ></textarea>
                </label>
            </fieldset>
            <fieldset>
                <legend>Wiederholung des Termins</legend>
                <label for="never"><input id="never" name="repetition" value="never" type="radio" required bind:group={repetition}>niemals</label>
                <label for="daily"><input id="daily" name="repetition" value="daily" type="radio" required bind:group={repetition}>täglich</label>
                <label for="weekly"><input id="weekly" name="repetition" value="weekly" type="radio" required bind:group={repetition}>wöchentlich</label>
            </fieldset>
            <fieldset>
                <legend>Auswählbare Slots</legend>
                <div id="slots">
					{#if repetition === "daily"}
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
					{:else if repetition === "weekly"}
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
						{:else if repetition === "never"}
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

