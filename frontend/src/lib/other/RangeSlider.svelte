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

    let actionOnMouseUp = null;

    function dragThumbStart(e: MouseEvent&{ currentTarget: EventTarget&HTMLDivElement; }): any {
        const thumbStart = e.currentTarget;
        const thumbStartLeft = thumbStart.style.getPropertyValue("left");
        const thumbStartPixelsLeft = thumbStartLeft.slice(0, thumbStartLeft.length-2) as unknown as number;
        const xOnDragStart = e.x;
        console.log("resize start");

        actionOnMouseUp = (mouseUpEvent: MouseEvent) => {
            console.log(`${mouseUpEvent.x} - ${xOnDragStart}`)
            thumbStart.style.setProperty("left", `${ thumbStartPixelsLeft + mouseUpEvent.x - xOnDragStart}px`)
            actionOnMouseUp = null;
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

<svelte:body on:mouseup={(e) => {if(actionOnMouseUp) actionOnMouseUp(e);}} />

<div aria-hidden="true" class="slider_container">
    <div class="left_thumb not_selectable" on:mousedown|preventDefault={(e) => dragThumbStart(e)}>◀</div>
    <div class="middle_thumb not_selectable">:::</div>
    <div class="right_thumb not_selectable">▶</div>
</div>

