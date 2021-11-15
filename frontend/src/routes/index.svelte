<script lang="ts">
import { onMount } from "svelte";

    import { surveyApiStore } from "./survey/_SurveyApiStore";

    onMount(() => surveyApiStore.subscribe((instances) => console.log(instances) ));
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
