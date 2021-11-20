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

        actionOnMouseMove = (mouseMoveEvent: MouseEvent) => {
            thumbStart.style.setProperty("left", `${mouseMoveEvent.x % (RANGE_WIDTH_PX - thumbStart.getBoundingClientRect().width)}px`)
        };

        actionOnMouseUp = (mouseUpEvent: MouseEvent) => {
            actionOnMouseUp = null;
            actionOnMouseMove = null;
        };
    }

    function dragThumbEnd(e: MouseEvent&{ currentTarget: EventTarget&HTMLDivElement; }): void {
        const thumbEnd = e.currentTarget;

        actionOnMouseMove = (mouseMoveEvent: MouseEvent) => {
            thumbEnd.style.setProperty("left", `${mouseMoveEvent.x % (RANGE_WIDTH_PX - thumbEnd.getBoundingClientRect().width)}px`)
        };

        actionOnMouseUp = (mouseUpEvent: MouseEvent) => {
            actionOnMouseUp = null;
            actionOnMouseMove = null;
        };
    }

    function dragThumbBody(e: MouseEvent&{ currentTarget: EventTarget&HTMLDivElement; }): void {
        const thumbBody = e.currentTarget;
        const containerLeftPropertyPx = thumbBody.parentElement.getBoundingClientRect().left;
        
        const thumbBodyLeftPropertyPx = thumbBody.getBoundingClientRect().left - containerLeftPropertyPx;
        const thumbParts = Array.from(thumbBody.parentElement.children);
        const thumbStart = thumbParts.find(e => e.classList.contains("left_thumb")) as HTMLDivElement;
        const thumbStartLeftPropertyPx = thumbStart.getBoundingClientRect().left - containerLeftPropertyPx;
        const thumbEnd = thumbParts.find(e => e.classList.contains("right_thumb")) as HTMLDivElement;
        const thumbEndLeftPropertyPx = thumbEnd.getBoundingClientRect().left - containerLeftPropertyPx;
        const dragStartX = e.x;

        actionOnMouseMove = (mouseMoveEvent: MouseEvent) => {
            const draggedPixels = mouseMoveEvent.x - dragStartX;

            let thumbBodyPosX = (draggedPixels + thumbBodyLeftPropertyPx) % (RANGE_WIDTH_PX - thumbBody.getBoundingClientRect().width);
            thumbBodyPosX = thumbBodyPosX >= 0 ? thumbBodyPosX : RANGE_WIDTH_PX-thumbBodyPosX;
            thumbBody.style.setProperty("left", `${thumbBodyPosX}px`);

            let thumbStartPosX = (draggedPixels + thumbStartLeftPropertyPx) % (RANGE_WIDTH_PX - thumbStart.getBoundingClientRect().width);
            thumbStartPosX = thumbStartPosX >= 0 ? thumbStartPosX : RANGE_WIDTH_PX-thumbStartPosX;
            thumbStart.style.setProperty("left", `${thumbStartPosX}px`)

            let thumbEndPosX = (draggedPixels + thumbEndLeftPropertyPx) % (RANGE_WIDTH_PX - thumbEnd.getBoundingClientRect().width);
            thumbEndPosX = thumbEndPosX >= 0 ? thumbEndPosX : RANGE_WIDTH_PX-thumbEndPosX;
            thumbEnd.style.setProperty("left", `${thumbEndPosX}px`)
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

