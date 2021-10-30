<script lang="ts">
    import type { PickedSlot } from "src/model/picked_slot";
    import SlotCheckbox from "./SlotCheckbox.svelte"

    export let pickedSlots: Array<PickedSlot>;
</script>

<fieldset>
    <legend>Täglich</legend>
    {#each pickedSlots as ps, i}
        <SlotCheckbox bind:pickedSlot={ps}></SlotCheckbox>
    {/each}
</fieldset>
