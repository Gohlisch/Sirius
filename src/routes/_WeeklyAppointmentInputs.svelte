<script lang="ts">
    import type { AppointmentSurvey } from "src/model/appointment_survey";
    import SlotCheckbox from "./_SlotCheckbox.svelte"

    export let survey: AppointmentSurvey;

    const options: Intl.DateTimeFormatOptions = {hour: "2-digit", minute: "2-digit"};
</script>

{#if survey.slots.some((slot) => slot.start.getDay() === 1)}
    <fieldset>
        <legend>Montag</legend>
        {#each survey.slots as slot, i}
            {#if slot.start.getDay() === 1}
                <SlotCheckbox numberedSlot="{{slot: slot, number: i}}"/>
            {/if}
        {/each}
    </fieldset>
{/if}
{#if survey.slots.some((slot) => slot.start.getDay() === 2)}
    <fieldset>
        <legend>Dienstag</legend>
        {#each survey.slots as slot, i}
            {#if slot.start.getDay() === 2}
                <SlotCheckbox numberedSlot="{{slot: slot, number: i}}"/>
            {/if}
        {/each}
    </fieldset>
{/if}
{#if survey.slots.some((slot) => slot.start.getDay() === 3)}
<fieldset>
    <legend>Mittwoch</legend>
    {#each survey.slots as slot, i}
        {#if slot.start.getDay() === 3}
            <SlotCheckbox numberedSlot="{{slot: slot, number: i}}"/>
        {/if}
    {/each}
</fieldset>
{/if}
{#if survey.slots.some((slot) => slot.start.getDay() === 4)}
<fieldset>
    <legend>Donnerstag</legend>
    {#each survey.slots as slot, i}
        {#if slot.start.getDay() === 4}
            <SlotCheckbox numberedSlot="{{slot: slot, number: i}}"/>
        {/if}
    {/each}
</fieldset>
{/if}
{#if survey.slots.some((slot) => slot.start.getDay() === 5)}
<fieldset>
    <legend>Freitag</legend>
    {#each survey.slots as slot, i}
        {#if slot.start.getDay() === 5}
            <SlotCheckbox numberedSlot="{{slot: slot, number: i}}"/>
        {/if}
    {/each}
</fieldset>
{/if}
{#if survey.slots.some((slot) => slot.start.getDay() === 6)}
<fieldset>
    <legend>Samstag</legend>
    {#each survey.slots as slot, i}
        {#if slot.start.getDay() === 6}
            <SlotCheckbox numberedSlot="{{slot: slot, number: i}}"/>
        {/if}
    {/each}
</fieldset>
{/if}
{#if survey.slots.some((slot) => slot.start.getDay() === 7)}
<fieldset>
    <legend>Sonntag</legend>
    {#each survey.slots as slot, i}
        {#if slot.start.getDay() === 7}
            <SlotCheckbox numberedSlot="{{slot: slot, number: i}}"/>
        {/if}
    {/each}
</fieldset>
{/if}