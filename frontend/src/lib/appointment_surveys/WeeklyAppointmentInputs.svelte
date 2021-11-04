<script lang="ts">
import type { PickedSlot } from "src/model/picked_slot";

    import SlotCheckbox from "./SlotCheckbox.svelte"

    export let pickedSlots: Array<PickedSlot>;

    const options: Intl.DateTimeFormatOptions = {hour: "2-digit", minute: "2-digit"};
    const weekdays = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"];
</script>

{#each weekdays as weekday, i}
    {#if pickedSlots.some((ps) => ps.slot.start.getDay() === i+1)}
        <fieldset>
            <legend>{ weekday }</legend>
            {#each pickedSlots.filter(ps => ps.slot.start.getDay() === i+1) as ps}
                <SlotCheckbox bind:pickedSlot={ps}/>
            {/each}
        </fieldset>
    {/if}
{/each}
