<script lang="ts">
    import type { PickedSlot } from "src/model/picked_slot";
    
    export let pickedSlot: PickedSlot;

    const options: Intl.DateTimeFormatOptions = {hour: "2-digit", minute:"2-digit"};
</script>

<label class:selected_slot={pickedSlot.picked}>
    <time>{ pickedSlot.slot.start.toLocaleTimeString("de", options) }</time> bis
    <time>{ pickedSlot.slot.end.toLocaleTimeString("de", options) }</time>
    <input type="checkbox" name="slot">
</label>
