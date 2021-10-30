<script lang="ts">
    import type { TimeSlot } from "../../model/time_slot";

    export let numberedSlot: {
        slot: TimeSlot,
        number: number
    };    

    const options: Intl.DateTimeFormatOptions = {hour: "2-digit", minute:"2-digit"};
</script>

<label>
    <time>{ numberedSlot.slot.start.toLocaleTimeString("de", options) }</time> bis
    <time>{ numberedSlot.slot.end.toLocaleTimeString("de", options) }</time>
    <input type="checkbox" name="slot{numberedSlot.number}">
</label>
