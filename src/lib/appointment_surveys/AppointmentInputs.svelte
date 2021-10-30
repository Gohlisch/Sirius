<script lang="ts">
    import type { PickedSlot } from "src/model/picked_slot";
    import { getKeysAsArray, groupBy, toDateTimeFormat } from "../../util/util";
    import SlotCheckbox from "./SlotCheckbox.svelte"

    export let pickedSlots: Array<PickedSlot>;

    const dateOptions: Intl.DateTimeFormatOptions = { weekday: "long", day: "2-digit", month: "2-digit", year: "2-digit" };
    const slotsGroupedByStart = groupBy(pickedSlots, (ps)=>ps.slot.start.toLocaleDateString("de-DE", dateOptions));
 </script>

{#each getKeysAsArray(slotsGroupedByStart) as date}
    <fieldset>
        <legend>
            { date.slice(0, date.indexOf(",")+1) }
            <time datetime="{toDateTimeFormat(slotsGroupedByStart[date][0].slot.start)}">
            { date.slice(date.indexOf(",")+1) }
            </time>
        </legend>
        {#each pickedSlots.filter((ps) => ps.slot.start.toLocaleDateString("de-DE", dateOptions) === date) as ps}
            <SlotCheckbox bind:pickedSlot={ps}></SlotCheckbox>
        {/each}
    </fieldset>
{/each}
