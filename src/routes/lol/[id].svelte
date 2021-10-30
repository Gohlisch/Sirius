<script lang="ts">
    import { page } from "$app/stores";
    import AppointmentSurvey from "./_AppointmentSurvey.svelte";
    import { appointmentRepository } from "../../model/appointment_repository";
</script>
<AppointmentSurvey survey={appointmentRepository.getSurvey($page.params.id)}></AppointmentSurvey>