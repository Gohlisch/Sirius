<script lang="ts">
    import { appointmentRepository } from "../model/appointment_repository";
</script>

<svelte:head>
    <title>Sirius – Terminumfragen</title>
</svelte:head>
<main>
    <h2>Meine Terminumfragen</h2>
    <ul>
        {#each appointmentRepository.getSurveys() as survey} 
        <li>
        <a href="lol/{survey.id}">{survey.title}</a>
        </li>
        {/each}
    </ul>
</main>
