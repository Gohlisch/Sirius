<script lang="ts">
    import type {AppointmentSurvey} from "../../model/appointment_survey";
    import WeeklyAppointmentResultTable from "$lib/appointment_surveys/WeeklyAppointmentResultTable.svelte"
    import DailyAppointmentResultTable from "$lib/appointment_surveys/DailyAppointmentResultTable.svelte"
    import AppointmentResultTable from "$lib/appointment_surveys/AppointmentResultTable.svelte"
    import WeeklyAppointmentInputs from "$lib/appointment_surveys/WeeklyAppointmentInputs.svelte"
    import DailyAppointmentInputs from "$lib/appointment_surveys/DailyAppointmentInputs.svelte"
    import AppointmentInputs from "$lib/appointment_surveys/AppointmentInputs.svelte"

    export let survey: AppointmentSurvey;
    let name: string = "";
</script>
<style>
    .no_bottom_padding {
        margin-bottom: 0;
    }

    main nav {
        font-size: 0.8em;
    }

    main nav > a {
        margin-left: 1em;
        margin-right: 1em;
        color: var(--inactive_color);
        text-decoration: none;
    }

    .appointment_survey fieldset label {
        display: flex;
        flex-wrap: wrap;
        flex-direction: column;
        font-weight: bolder;
        justify-content: center;
        align-items: center;
        word-spacing: 2px;
        height: 5em;
        width: 5em;
        border: solid black 1px;
        flex-grow: 0;
        flex-shrink: 0;
        /** @TODO Make not selectable */
    }

    .appointment_survey fieldset label:hover, .appointment_survey fieldset label:focus {
        border-color: var(--bright_main_color);
    }

    .selected_slot {
        background-color: var(--bright_main_color);
    }

    .appointment_survey [type="checkbox"] {
        position: absolute;
        left: -100vh
    }

    .appointment_survey fieldset {
        display: flex;
        align-items: stretch;
        align-content: stretch;
        overflow-x: auto;
        min-width: 0;
        flex-grow: 0;
        flex-shrink: 1;
    }

    .table_container {
        overflow-x: scroll;
    }

    .hidden {
        visibility: hidden;
        font-size: 0;
    }

    @media screen and (max-width: 415px) {
        main nav {
            display: flex;
            flex-direction: column;
            font-size: 1em;
        }

        main nav > a {
            margin-top: 5px;
            margin-bottom: 5px;
        }

        .appointment_survey fieldset {
            flex-direction: column;
            height: auto;
            max-height: 200px;
        }

        .appointment_survey fieldset label {
            height: 44px;
            width: auto;
            flex-direction: row;
        }

        .appointment_survey fieldset label time {
            margin-left: 5px;
            margin-right: 5px;
        }
    }
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
    <!-- @TODO add copy button -->
    <p>Teile diese Umfrage: <a class="share_survey"></a></p>
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
                <WeeklyAppointmentInputs survey="{survey}"/>
            {:else if survey.repetition === "daily"}
                <DailyAppointmentInputs survey="{survey}"/>
            {:else}
                <AppointmentInputs survey="{survey}"/>
            {/if}
            <p class="warning" class:hidden={name}>
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
