<script lang="ts">
    import type { AppointmentSurvey } from "src/model/appointment_survey";

    export let survey: AppointmentSurvey;

    const options: Intl.DateTimeFormatOptions = {hour: "2-digit", minute: "2-digit"};
</script>
<thead>
<tr>
    <th>Uhrzeit</th>
    <th>Teilnehmer</th>
    <th>Namen</th>
</tr>
</thead>
<tbody>
    {#each survey.slots as slot}
        {#if slot.participants.length > 0}
    <tr>
        <td>
            <time>{ slot.start.toLocaleTimeString("de", options) }</time>
            bis
            <time>{ slot.end.toLocaleTimeString("de", options) }</time>
        </td>
        <td>{ slot.participants.length }</td>
        <td>
            {#if slot.participants.length > 0}
                {slot.participants.reduce((p1, p2) => p1.concat(`, ${p2}`))}
            {/if}
        </td>
    </tr>
        {/if}
    {/each}
{#if survey.indisposedParticipants.length > 0}
    <tr>
        <td>verhindert</td>
        <td>{ survey.indisposedParticipants.length }</td>
        {#if survey.indisposedParticipants.length>0}
        <td>{ survey.indisposedParticipants.reduce((p1, p2) => p1.concat(`, ${p2}`)) }</td>
        {/if}
    </tr>
{/if}
</tbody>
