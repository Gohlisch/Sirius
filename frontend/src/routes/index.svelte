<script lang="ts">
    import { surveyApiStore } from "./survey/_SurveyApiStore";
</script>

<svelte:head>
    <title>Sirius – Terminumfragen</title>
</svelte:head>
<main>
    <h2>Meine Terminumfragen</h2>
    <ul>
        {#each $surveyApiStore as survey} 
        <li>
        <a href="survey/{survey.id}">{survey.title}</a>
        </li>
        {/each}
    </ul>
</main>
