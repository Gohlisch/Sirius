<script lang="ts">
    import type { AppointmentSurvey } from "src/model/appointment_survey";
    import type { TimeSlot } from "src/model/time_slot";
    import {groupBy, getValuesAsArray, getKeysAsArray, toDateTimeFormat} from "../util/util"

    export let survey: AppointmentSurvey;

    const timeOptions: Intl.DateTimeFormatOptions = {hour: "2-digit", minute: "2-digit"};
    const dateOptions: Intl.DateTimeFormatOptions = {weekday: "long", day: "2-digit", month: "2-digit", year: "2-digit"};
    const slotsGroupedByStart: Record<string, Array<TimeSlot>> = groupBy(survey.slots, (slot)=>slot.start.toLocaleDateString("de-DE", dateOptions));
</script>

<thead>
<tr>
    <th>Termin</th>
    <th>Uhrzeit</th>
    <th>Teilnehmer</th>
    <th>Namen</th>
</tr>
</thead>
<tbody>
{#each getKeysAsArray(slotsGroupedByStart) as date}
    {#each slotsGroupedByStart[date] as slot, i}
    <tr>
        {#if i === 0}
            <td rowspan="{slotsGroupedByStart[date] .length}">
                { date.slice(0, date.indexOf(",") + 1) }
                <time datetime="{toDateTimeFormat(slotsGroupedByStart[date][0].start)}">
                    { date.slice(date.indexOf(",") + 1) }
                </time>
            </td>
        {/if}
        <td>
            <time>{ slot.start.toLocaleTimeString("de-DE", timeOptions) }</time>
            bis
            <time>{ slot.end.toLocaleTimeString("de-DE", timeOptions) }</time>
        </td>
        <td>{ slot.participants.length }</td>
        <td>
            {#if slot.participants.length > 0}
                {slot.participants.reduce((p1, p2) => p1.concat(`, ${p2}`))}
            {/if}
        </td>
    </tr>
    {/each}
{/each}
{#if survey.indisposedParticipants.length > 0}
    <tr>
        <td colspan="2">verhindert</td>
        <td>{ survey.indisposedParticipants.length }</td>
        {#if survey.indisposedParticipants.length>0}
            <td>{survey.indisposedParticipants.reduce((p1, p2) => p1.concat(`, ${p2}`))}</td>
        {/if}
    </tr>
{/if}
</tbody>
