<script lang="ts">
    import type { AppointmentSurvey } from "src/model/appointment_survey";
    import SlotCheckbox from "./_SlotCheckbox.svelte"

    export let survey: AppointmentSurvey;
</script>

<fieldset>
    <legend>Täglich</legend>
    {#each survey.slots as slot, i}
        <SlotCheckbox numberedSlot="{{slot: slot, number: i}}"></SlotCheckbox>
    {/each}
</fieldset>
