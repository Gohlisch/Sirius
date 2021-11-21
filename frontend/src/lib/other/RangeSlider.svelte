<script lang="ts">
    import { onMount } from "svelte";

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

    let rangeWidthPixel = 0;
    onMount(()=>{
        rangeWidthPixel = parseInt(window.getComputedStyle(window.document.querySelector(".slider_container").parentElement).fontSize) * 10;
    });
    let actionOnMouseUp = null;
    let actionOnMouseMove = null;

    function dragThumbStart(e: MouseEvent&{ currentTarget: EventTarget&HTMLDivElement; }): void {
        const thumbStart = e.currentTarget;
        const containerOriginalXOffset = thumbStart.parentElement.getBoundingClientRect().left;
        const thumbStartOriginalXOffset = thumbStart.getBoundingClientRect().left - containerOriginalXOffset;
        const dragStartX = e.x;

        actionOnMouseMove = (mouseMoveEvent: MouseEvent) => {
            const draggedPixels = mouseMoveEvent.x - dragStartX;
            setXOffeset(draggedPixels, thumbStartOriginalXOffset, thumbStart);
        };

        actionOnMouseUp = (mouseUpEvent: MouseEvent) => {
            actionOnMouseUp = null;
            actionOnMouseMove = null;
        };
    }

    function dragThumbEnd(e: MouseEvent&{ currentTarget: EventTarget&HTMLDivElement; }): void {
        const thumbEnd = e.currentTarget;
        const containerOriginalXOffset = thumbEnd.parentElement.getBoundingClientRect().left;
        const thumbEndOriginalXOffset = thumbEnd.getBoundingClientRect().left - containerOriginalXOffset;
        const dragStartX = e.x;

        actionOnMouseMove = (mouseMoveEvent: MouseEvent) => {
            const draggedPixels = mouseMoveEvent.x - dragStartX;
            setXOffeset(draggedPixels, thumbEndOriginalXOffset, thumbEnd);
        };

        actionOnMouseUp = (mouseUpEvent: MouseEvent) => {
            actionOnMouseUp = null;
            actionOnMouseMove = null;
        };
    }

    function dragThumbBody(e: MouseEvent&{ currentTarget: EventTarget&HTMLDivElement; }): void {
        const thumbBody = e.currentTarget;
        const containerOriginalXOffset = thumbBody.parentElement.getBoundingClientRect().left;
        const dragStartX = e.x;
        const thumbBodyOriginalXOffset = thumbBody.getBoundingClientRect().left - containerOriginalXOffset;
        const thumbParts = Array.from(thumbBody.parentElement.children);
        const thumbStart = thumbParts.find(e => e.classList.contains("left_thumb")) as HTMLDivElement;
        const thumbStartOriginalXOffset = thumbStart.getBoundingClientRect().left - containerOriginalXOffset;
        const thumbEnd = thumbParts.find(e => e.classList.contains("right_thumb")) as HTMLDivElement;
        const thumbEndOriginalXOffset = thumbEnd.getBoundingClientRect().left - containerOriginalXOffset;

        actionOnMouseMove = (mouseMoveEvent: MouseEvent) => {
            const draggedPixels = mouseMoveEvent.x - dragStartX;
            setXOffeset(draggedPixels, thumbBodyOriginalXOffset, thumbBody);
            setXOffeset(draggedPixels, thumbStartOriginalXOffset, thumbStart);
            setXOffeset(draggedPixels, thumbEndOriginalXOffset, thumbEnd);
        };

        actionOnMouseUp = (mouseUpEvent: MouseEvent) => {
            actionOnMouseUp = null;
            actionOnMouseMove = null;
        };
    }

    function keepThumbBodysAttachedToResizers() {

    }

    function setXOffeset(draggedPixels: number, originalPixelOffset: number, element: HTMLElement) {
        const elementWidth = element.getBoundingClientRect().width;
        const minimalValue = element.dataset.direction === "left" ? 0 : elementWidth;
        let elementXPosition = (draggedPixels + originalPixelOffset) % (rangeWidthPixel - elementWidth);

        elementXPosition = elementXPosition >= minimalValue ? elementXPosition : rangeWidthPixel + elementXPosition - elementWidth;

        if(element.dataset.direction === "left") {
            options.start = elementXPosition;
        } else {
            options.end = elementXPosition;
        }
  
        element.style.setProperty("left", `${elementXPosition}px`);
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
        top: 2px;
    }

    .left_thumb, .right_thumb {
        width: 1em;
    }

    .slider_container {
        position: relative;
        width: calc(10em);
        height: 2em;
        margin: 0 2px;
    }

    .drag_range_indicator{
        position: absolute;
        background-color: var(--primary_color);
        height: calc(1em + 14px + 2px);
        line-height: calc(1em + 14px);
        text-align: center;
        top: 1px;
        left: 1em;
        width: calc(9em);
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
    <div class="drag_range_indicator"></div>
    <div class="middle_thumb not_selectable" on:mousedown|preventDefault={(e) => dragThumbBody(e)}>:::</div>
    <div class="left_thumb not_selectable" data-direction="left" on:mousedown|preventDefault={(e) => dragThumbStart(e)}>◀</div>
    <div class="right_thumb not_selectable" data-direction="right" on:mousedown|preventDefault={(e) => dragThumbEnd(e)}>▶</div>
</div>

