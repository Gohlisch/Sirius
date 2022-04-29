<script lang="ts">
    import type {RangeSliderProps} from "$lib/other/RangeSliderProps"
    import RangeSlider from "$lib/other/RangeSlider.svelte"
    import { createEventDispatcher, onMount } from "svelte";

    const dispatch: ((name: string, detail?: any) => void) = createEventDispatcher();
    let dispatchInputEvent = ()=>{};

    export let startTime: string = "12:00";
    export let endTime: string = "13:00";
    export let required: boolean = true;

    onMount(()=>dispatchInputEvent= ()=>
        dispatch("input", {
            start: startTime,
            end: endTime,
            required: required
        })
    );

    let sliderOptions: RangeSliderProps = {
        start: 720,
        end: 780,
        min: 0,
        max: 1439,
        steps: 15,
        endBeforeStartAllowed: true
    }

    function updateSlider() {
        const start = timeStringToMinutes(startTime);
        const end = timeStringToMinutes(endTime);
        let validInput = false;

        if(start && start <= sliderOptions.max && start >= sliderOptions.min) {
            validInput = true;
            sliderOptions.start = start;
        }
        if(end && end <= sliderOptions.max && end >= sliderOptions.min) {
            validInput = true;
            sliderOptions.end = end;
        }
        if(validInput) {
            dispatchInputEvent();
        }
    }

    function minutesToTimeString(minutes: number): string {
        const hours = Math.trunc(minutes/60);
        minutes = Math.trunc(minutes%60);
        return `${hours < 10 ? "0" : ""}${hours}:${minutes < 10 ? "0" : ""}${minutes}`;
    }

    function timeStringToMinutes(timeString: string): number | null {
        const timeRegex = /(?<hours>\d\d):(?<minutes>\d\d)/;
        const result = timeRegex.exec(timeString);
        
        if(result && result[0]) {
            const hours = +result.groups["hours"];
            const minutes = +result.groups["minutes"];
            return 60*hours + minutes;
        }

        return null;
    }

    function handleSliderInput(state: RangeSliderProps) {
        if(!state) return;
        startTime = minutesToTimeString(state.start);
        endTime = minutesToTimeString(state.end);
        dispatchInputEvent();
    }
</script>

<div class="input_wrapper">
    <label class="required">Startzeit:
        <input  type="time"
                name="start"
                required={required}
                bind:value={startTime}
                on:input={updateSlider}>
    </label>
    <label class="required">Endzeit:
        <input  type="time"
                name="end"
                required={required}
                bind:value={endTime}
                on:input={updateSlider}>
    </label>
</div>
<RangeSlider options={sliderOptions} on:input={e => handleSliderInput(e.detail.state)}></RangeSlider>