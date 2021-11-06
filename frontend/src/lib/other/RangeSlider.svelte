<script lang="ts">
    type RangeSliderProps = {
        start: number,
        end: number,
        min: number,
        max: number,
        steps: number
    };

    export let options: RangeSliderProps = {
        start: 0,
        end: 100,
        min: 0,
        max: 100,
        steps: 1
    };
</script>

<style>
    .left_thumb, .middle_thumb, .right_thumb {
        position: absolute;
        background-color: var(--secondary_color);
        color: var(--brightest_color);
        height: calc(1em + 14px);
        line-height:  2em;
        text-align: center;
        cursor: grab;
        top: 0;
    }

    .left_thumb, .right_thumb {
        width: 1em;
    }

    .slider_container {
        position: relative;
        width: 200px;
        height: 2em;
    }

    .left_thumb {
        border-top-left-radius: 0.75em;
        border-bottom-left-radius: 0.75em;
        border-right: 1px solid var(--brighter_color);
        left: 0;
    }

    .middle_thumb {
        width: 50px;
        left: calc(1em + 1px);
    }

    .right_thumb {
        border-top-right-radius: 0.75em;
        border-bottom-right-radius: 0.75em;
        border-left: 1px solid var(--brighter_color);
        left: calc(1em + 1px + 50px);
    }
</style>

<div aria-hidden="true" class="slider_container">
    <div class="left_thumb not_selectable">◀</div>
    <div class="middle_thumb not_selectable">:::</div>
    <div class="right_thumb not_selectable">▶</div>
</div>

