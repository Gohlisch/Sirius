<script lang="ts">
    import { page } from "$app/stores";
    import AppointmentSurvey from "./_AppointmentSurvey.svelte";
    import { surveyApiStore } from "./_SurveyApiStore";

    const surveyRequest = surveyApiStore.get($page.params.id);
</script>

{#await surveyRequest then survey}
    <AppointmentSurvey survey={survey}></AppointmentSurvey>
{:catch error}
    <p>{error}</p>
{/await}