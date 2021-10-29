<script lang="ts">
import type { AppointmentSurvey } from "src/model/appointment_survey";
    import { getKeysAsArray, groupBy, toDateTimeFormat } from "src/util/util";
    import SlotCheckbox from "./_SlotCheckbox.svelte"

    export let survey: AppointmentSurvey;

    const dateOptions = { weekday: "long", day: "2-digit", month: "2-digit", year: "2-digit" };
    const slotsGroupedByStart = groupBy(survey.slots, (slot)=>slot.start.toLocaleDateString("de-DE", dateOptions));
 </script>

{#each getKeysAsArray(slotsGroupedByStart) as date}
    <fieldset>
        <legend>
            { date.slice(0, date.indexOf(",")+1) }
            <time datetime="{toDateTimeFormat(slotsGroupedByStart[date][0].start)}">
                { date.slice(date.indexOf(",")+1) }
            </time>
        </legend>
        {#each slotsGroupedByStart[date] as slot, i}
            <SlotCheckbox numberedSlot="{{slot: slot, number: i}}"></SlotCheckbox>
        {/each}
    </fieldset>
{/each}
