<script lang="ts">
import type { PickedSlot } from "src/model/picked_slot";

    import type { TimeSlot } from "../../model/time_slot";

    export let numberedSlot: {
        pickedSlot: PickedSlot,
        number: number
    };    

    const options: Intl.DateTimeFormatOptions = {hour: "2-digit", minute:"2-digit"};
</script>

<label>
    <time>{ numberedSlot.pickedSlot.slot.start.toLocaleTimeString("de", options) }</time> bis
    <time>{ numberedSlot.pickedSlot.slot.end.toLocaleTimeString("de", options) }</time>
    <input type="checkbox" name="slot{numberedSlot.number}" bind:checked={numberedSlot.pickedSlot.picked}>
</label>
