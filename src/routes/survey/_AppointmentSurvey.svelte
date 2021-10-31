<script lang="ts">
    import type {AppointmentSurvey} from "../../model/appointment_survey";
    import WeeklyAppointmentResultTable from "$lib/appointment_surveys/WeeklyAppointmentResultTable.svelte"
    import DailyAppointmentResultTable from "$lib/appointment_surveys/DailyAppointmentResultTable.svelte"
    import AppointmentResultTable from "$lib/appointment_surveys/AppointmentResultTable.svelte"
    import WeeklyAppointmentInputs from "$lib/appointment_surveys/WeeklyAppointmentInputs.svelte"
    import DailyAppointmentInputs from "$lib/appointment_surveys/DailyAppointmentInputs.svelte"
    import AppointmentInputs from "$lib/appointment_surveys/AppointmentInputs.svelte"
    import type { PickedSlot } from "../../model/picked_slot";
    import { page } from "$app/stores";
    import { MessageType, notificationStore } from "$lib/notifications/notification_store";

    export let survey: AppointmentSurvey;
    let name: string = "";
    let pickedSlots: Array<PickedSlot> = survey.slots.map(s => {return {slot: s, picked: false}});
</script>
<style>

</style>
<svelte:head>
    <title>Sirius – {survey.title}</title>
</svelte:head>
<main>
    <h2 class="no_bottom_padding">{survey.title}</h2>
    <nav>
        <a href="#description">Beschreibung</a>
        <a href="#survey">Umfrageformular</a>
        <a href="#results">Ergebnisse</a>
    </nav>
    <button on:click={(e) => {
        navigator.clipboard.writeText($page.host + $page.path);
        notificationStore.show({title: "Adresse kopiert", type: MessageType.INFO, iconPath: "/icons/clipboard_copy.svg"}, {msVisible: 3000});
    }}>Umfrage teilen</button>
    <section id="description">
        <h3>Beschreibung</h3>
        <p>{survey.description}</p>
    </section>
    <section class="appointment_survey" id="survey">
        <h3>Dann habe ich Zeit</h3>
        <form action="<%= survey.id %>" method="post">
            <label>Name
                <input
                    required
                    type="text"
                    name="participant"
                    placeholder="max. 64 Zeichen"
                    maxlength="64"
                    bind:value="{name}">
            </label>
            {#if survey.repetition === "weekly"}
                <WeeklyAppointmentInputs bind:pickedSlots={pickedSlots}/>
            {:else if survey.repetition === "daily"}
                <DailyAppointmentInputs bind:pickedSlots={pickedSlots}/>
            {:else}
                <AppointmentInputs bind:pickedSlots={pickedSlots}/>
            {/if}
            <p class="warning" class:hidden={!name || pickedSlots.some((ps) => ps.picked)}>
                <strong>
                    WARNUNG: Sie haben zur Zeit keine Slots ausgewählt.
                    Wenn Sie nun senden, werden Sie als verhindert aufgeführt.
                </strong>
            </p>
            <input type="submit">
        </form>
    </section>
    <section id="results">
        <h3>Ergebnisse</h3>
        <div class="table_container">
            <table>
                {#if survey.repetition === "weekly"}
                    <WeeklyAppointmentResultTable survey="{survey}"/>
                {:else if survey.repetition === "daily"}
                    <DailyAppointmentResultTable survey="{survey}"/>
                {:else}
                    <AppointmentResultTable survey="{survey}"/>
                {/if}
            </table>
        </div>
    </section>
</main>
