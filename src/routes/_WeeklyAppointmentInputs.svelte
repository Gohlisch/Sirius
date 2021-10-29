<script lang="ts">
    const options: Intl.DateTimeFormatOptions = {hour: "2-digit", minute: "2-digit"};
</script>

{#if survey.slots.some((slot) => slot.start.getDay() === 1)}
    <fieldset>
        <Legend>Montag</Legend>
        {#each survey.slots as slot, i}
            {#if slot.start.getDay() === 1}
                <SlotCheckbox slot="{slot}" i="{i}">
            {/if}
        {/each}
    </fieldset>
{/if}
{#if survey.slots.some((slot) => slot.start.getDay() === 1)}
    <fieldset>
        <Legend>Dienstag</Legend>
        {#each survey.slots as slot, i}
            {#if slot.start.getDay() === 2}
                <SlotCheckbox slot="{slot}" i="{i}">
            {/if}
        {/each}
    </fieldset>
{/if}
{#if survey.slots.some((slot) => slot.start.getDay() === 1)}
<fieldset>
    <Legend>Mittwoch</Legend>
    {#each survey.slots as slot, i}
        {#if slot.start.getDay() === 3}
            <SlotCheckbox slot="{slot}" i="{i}">
        {/if}
    {/each}
</fieldset>
{/if}
{#if survey.slots.some((slot) => slot.start.getDay() === 1)}
<fieldset>
    <Legend>Donnerstag</Legend>
    {#each survey.slots as slot, i}
        {#if slot.start.getDay() === 4}
            <SlotCheckbox slot="{slot}" i="{i}">
        {/if}
    {/each}
</fieldset>
{/if}
{#if survey.slots.some((slot) => slot.start.getDay() === 1)}
<fieldset>
    <Legend>Freitag</Legend>
    {#each survey.slots as slot, i}
        {#if slot.start.getDay() === 5}
            <SlotCheckbox slot="{slot}" i="{i}">
        {/if}
    {/each}
</fieldset>
{/if}
{#if survey.slots.some((slot) => slot.start.getDay() === 1)}
<fieldset>
    <Legend>Samstag</Legend>
    {#each survey.slots as slot, i}
        {#if slot.start.getDay() === 6}
            <SlotCheckbox slot="{slot}" i="{i}">
        {/if}
    {/each}
</fieldset>
{/if}
{#if survey.slots.some((slot) => slot.start.getDay() === 1)}
<fieldset>
    <Legend>Sonntag</Legend>
    {#each survey.slots as slot, i}
        {#if slot.start.getDay() === 7}
            <SlotCheckbox slot="{slot}" i="{i}">
        {/if}
    {/each}
</fieldset>
{/if}