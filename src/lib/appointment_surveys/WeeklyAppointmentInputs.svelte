<script lang="ts">
import type { PickedSlot } from "src/model/picked_slot";

    import SlotCheckbox from "./SlotCheckbox.svelte"

    export let pickedSlots: Array<PickedSlot>;

    const options: Intl.DateTimeFormatOptions = {hour: "2-digit", minute: "2-digit"};
</script>

{#if pickedSlots.some((ps) => ps.slot.start.getDay() === 1)}
    <fieldset>
        <legend>Montag</legend>
        {#each pickedSlots as ps, i}
            {#if ps.slot.start.getDay() === 1}
            <SlotCheckbox bind:pickedSlot={ps}/>
            {/if}
        {/each}
    </fieldset>
{/if}
{#if pickedSlots.some((ps) => ps.slot.start.getDay() === 2)}
    <fieldset>
        <legend>Dienstag</legend>
        {#each pickedSlots as ps, i}
            {#if ps.slot.start.getDay() === 2}
            <SlotCheckbox bind:pickedSlot={ps}/>
            {/if}
        {/each}
    </fieldset>
{/if}
{#if pickedSlots.some((ps) => ps.slot.start.getDay() === 3)}
<fieldset>
    <legend>Mittwoch</legend>
    {#each pickedSlots as ps, i}
        {#if ps.slot.start.getDay() === 3}
        <SlotCheckbox bind:pickedSlot={ps}/>
        {/if}
    {/each}
</fieldset>
{/if}
{#if pickedSlots.some((ps) => ps.slot.start.getDay() === 4)}
<fieldset>
    <legend>Donnerstag</legend>
    {#each pickedSlots as ps, i}
        {#if ps.slot.start.getDay() === 4}
        <SlotCheckbox bind:pickedSlot={ps}/>
        {/if}
    {/each}
</fieldset>
{/if}
{#if pickedSlots.some((ps) => ps.slot.start.getDay() === 5)}
<fieldset>
    <legend>Freitag</legend>
    {#each pickedSlots as ps, i}
        {#if ps.slot.start.getDay() === 5}
        <SlotCheckbox bind:pickedSlot={ps}/>
        {/if}
    {/each}
</fieldset>
{/if}
{#if pickedSlots.some((ps) => ps.slot.start.getDay() === 6)}
<fieldset>
    <legend>Samstag</legend>
    {#each pickedSlots as ps, i}
        {#if ps.slot.start.getDay() === 6}
        <SlotCheckbox bind:pickedSlot={ps}/>
        {/if}
    {/each}
</fieldset>
{/if}
{#if pickedSlots.some((ps) => ps.slot.start.getDay() === 7)}
<fieldset>
    <legend>Sonntag</legend>
    {#each pickedSlots as ps, i}
        {#if ps.slot.start.getDay() === 7}
        <SlotCheckbox bind:pickedSlot={ps}/>
        {/if}
    {/each}
</fieldset>
{/if}