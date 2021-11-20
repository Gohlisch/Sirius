<script lang="ts">
    type RangeSliderProps = {
        start: number,
        end: number,
        min: number,
        max: number,
        steps: number,
        endBeforeStartAllowed?: boolean
    };

    export let options: RangeSliderProps = {
        start: 0,
        end: 100,
        min: 0,
        max: 100,
        steps: 1,
        endBeforeStartAllowed: false
    };

    const RANGE_WIDTH_PX = 200;

    let actionOnMouseUp = null;
    let actionOnMouseMove = null;

    function dragThumbStart(e: MouseEvent&{ currentTarget: EventTarget&HTMLDivElement; }): void {
        const thumbStart = e.currentTarget;

        actionOnMouseMove = (mouseUpEvent: MouseEvent) => {
            thumbStart.style.setProperty("left", `${mouseUpEvent.x % (RANGE_WIDTH_PX - thumbStart.getBoundingClientRect().width)}px`)
        };

        actionOnMouseUp = (mouseUpEvent: MouseEvent) => {
            actionOnMouseUp = null;
            actionOnMouseMove = null;
        };
    }

    function dragThumbEnd(e: MouseEvent&{ currentTarget: EventTarget&HTMLDivElement; }): void {
        const thumbEnd = e.currentTarget;

        actionOnMouseMove = (mouseUpEvent: MouseEvent) => {
            thumbEnd.style.setProperty("left", `${mouseUpEvent.x % (RANGE_WIDTH_PX - thumbEnd.getBoundingClientRect().width)}px`)
        };

        actionOnMouseUp = (mouseUpEvent: MouseEvent) => {
            actionOnMouseUp = null;
            actionOnMouseMove = null;
        };
    }

    function dragThumbBody(e: MouseEvent&{ currentTarget: EventTarget&HTMLDivElement; }): void {
        const thumbBody = e.currentTarget;

        actionOnMouseMove = (mouseUpEvent: MouseEvent) => {
            thumbBody.style.setProperty("left", `${mouseUpEvent.x % (RANGE_WIDTH_PX - thumbBody.getBoundingClientRect().width)}px`)
        };

        actionOnMouseUp = (mouseUpEvent: MouseEvent) => {
            actionOnMouseUp = null;
            actionOnMouseMove = null;
        };
    }


</script>

<style>
    .left_thumb, .middle_thumb, .right_thumb {
        position: absolute;
        background-color: var(--secondary_color);
        color: var(--brightest_color);
        height: calc(1em + 14px);
        line-height: calc(1em + 14px);
        text-align: center;
        top: 1px;
    }

    .left_thumb, .right_thumb {
        width: 1em;
    }

    .slider_container {
        background-color: var(--brighter_color);
        position: relative;
        width: calc(200px);
        height: 2em;
        margin: 0 2px;
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

<svelte:body
    on:mouseup={(e) => {if(actionOnMouseUp) actionOnMouseUp(e);}}
    on:mousemove={(e) => {if(actionOnMouseMove) actionOnMouseMove(e);}}
/>

<div aria-hidden="true" class="slider_container">
    <div class="middle_thumb not_selectable" on:mousedown|preventDefault={(e) => dragThumbBody(e)}>:::</div>
    <div class="left_thumb not_selectable" on:mousedown|preventDefault={(e) => dragThumbStart(e)}>◀</div>
    <div class="right_thumb not_selectable" on:mousedown|preventDefault={(e) => dragThumbEnd(e)}>▶</div>
</div>

