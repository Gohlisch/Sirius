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

    let sliderContainer: HTMLElement = null;
    let thumbBody1: HTMLElement = null;
    let thumbBody2: HTMLElement = null;
    let dragRangeIndicator: HTMLElement = null;
    let thumbStart: HTMLElement = null;
    let thumbEnd: HTMLElement = null;

    export let options: RangeSliderProps = {
        start: 0,
        end: 100,
        min: 0,
        max: 100,
        steps: 1,
        endBeforeStartAllowed: false
    };
    
    let fontWidth = 0;
    let rangeWidthPixel = 0;
    onMount(()=>{
        fontWidth = parseInt(window.getComputedStyle(window.document.querySelector(".slider_container").parentElement).fontSize);
        rangeWidthPixel = fontWidth * 16;
    });
    let actionOnMouseUp = null;
    let actionOnMouseMove = null;

    function dragThumbStart(e: MouseEvent&{ currentTarget: EventTarget&HTMLDivElement; }): void {
        cacheSliderElements(e.currentTarget);
        const containerOriginalXOffset = sliderContainer.getBoundingClientRect().left;
        const thumbStartOriginalXOffset = thumbStart.getBoundingClientRect().left - containerOriginalXOffset;
        const dragStartX = e.x;

        actionOnMouseMove = (mouseMoveEvent: MouseEvent) => {
            const draggedPixels = mouseMoveEvent.x - dragStartX;
            setXOffeset(draggedPixels, thumbStartOriginalXOffset, thumbStart);
            keepThumbBodysAttachedToResizers();
        };

        actionOnMouseUp = (mouseUpEvent: MouseEvent) => {
            actionOnMouseUp = null;
            actionOnMouseMove = null;
        };
    }

    function dragThumbEnd(e: MouseEvent&{ currentTarget: EventTarget&HTMLDivElement; }): void {
        cacheSliderElements(e.currentTarget);
        const containerOriginalXOffset = sliderContainer.getBoundingClientRect().left;
        const thumbEndOriginalXOffset = thumbEnd.getBoundingClientRect().left - containerOriginalXOffset;
        const dragStartX = e.x;

        actionOnMouseMove = (mouseMoveEvent: MouseEvent) => {
            const draggedPixels = mouseMoveEvent.x - dragStartX;
            setXOffeset(draggedPixels, thumbEndOriginalXOffset, thumbEnd);
            keepThumbBodysAttachedToResizers();
        };

        actionOnMouseUp = (mouseUpEvent: MouseEvent) => {
            actionOnMouseUp = null;
            actionOnMouseMove = null;
        };
    }

    function dragThumbBody(e: MouseEvent&{ currentTarget: EventTarget&HTMLDivElement; }): void {
        cacheSliderElements(e.currentTarget);

        const containerOriginalXOffset = sliderContainer.getBoundingClientRect().left;
        const dragStartX = e.x;
        const thumbStartOriginalXOffset = thumbStart.getBoundingClientRect().left - containerOriginalXOffset;
        const thumbEndOriginalXOffset = thumbEnd.getBoundingClientRect().left - containerOriginalXOffset;

        actionOnMouseMove = (mouseMoveEvent: MouseEvent) => {
            const draggedPixels = mouseMoveEvent.x - dragStartX;
            setXOffeset(draggedPixels, thumbStartOriginalXOffset, thumbStart);
            setXOffeset(draggedPixels, thumbEndOriginalXOffset, thumbEnd);
            keepThumbBodysAttachedToResizers();
        };

        actionOnMouseUp = (mouseUpEvent: MouseEvent) => {
            actionOnMouseUp = null;
            actionOnMouseMove = null;
        };
    }

    function keepThumbBodysAttachedToResizers() {
        const containerOffset = sliderContainer.getBoundingClientRect().left;
        const thumbStartRight = thumbStart.getBoundingClientRect().right;
        const thumbEndLeft =  thumbEnd.getBoundingClientRect().left;
        if(options.start < options.end) {
            thumbBody2.style.setProperty("display", "none");
            thumbBody1.style.setProperty("left", thumbStartRight - containerOffset + "px");
            thumbBody1.style.setProperty("width", thumbEndLeft - thumbStartRight + "px");
        } else {
            const dragRangeBoundingClientRect = dragRangeIndicator.getBoundingClientRect();
            const dragRangeRight = dragRangeBoundingClientRect.right;
            const dragRangeLeft = dragRangeBoundingClientRect.left;

            thumbBody2.style.setProperty("display", "block");
            thumbBody2.style.setProperty("left", dragRangeLeft - containerOffset + "px");
            thumbBody2.style.setProperty("width", thumbEndLeft - dragRangeLeft + "px");
            thumbBody1.style.setProperty("left", thumbStartRight - containerOffset + "px");
            thumbBody1.style.setProperty("width", dragRangeRight - thumbStartRight + "px");
        }
    }

    function setXOffeset(draggedPixels: number, originalPixelOffset: number, element: HTMLElement) {
        const elementWidth = element.getBoundingClientRect().width;
        const drageRangeWidth = dragRangeIndicator.getBoundingClientRect().width;
        const elementValueProbeOffset = element.dataset.direction === "left" ? 0 : elementWidth;
        let elementXPosition = (draggedPixels + originalPixelOffset) % (rangeWidthPixel - elementWidth);

        elementXPosition = elementXPosition >= elementValueProbeOffset ? elementXPosition : rangeWidthPixel + elementXPosition - elementWidth;

        if(element.dataset.direction === "left") {
            options.start = calculateValueFromOffeset(elementXPosition, elementValueProbeOffset, drageRangeWidth);
        } else {
            options.end = calculateValueFromOffeset(elementXPosition, elementValueProbeOffset, drageRangeWidth);
        }
  
        element.style.setProperty("left", `${elementXPosition}px`);
    }

    function calculateValueFromOffeset(elementXPosition, elementValueProbeOffset, drageRangeWidth) {
        const UNACCESSIBLE_DRAG_RANGE_PIXELS = 2;
        const trueXValue = Math.trunc(elementXPosition - elementValueProbeOffset + UNACCESSIBLE_DRAG_RANGE_PIXELS);
        const xToContainerWidthRelation = trueXValue / drageRangeWidth;
        const valueRange = options.max - options.min;
        return Math.trunc(xToContainerWidthRelation * valueRange / options.steps) * options.steps + options.min;
    }

    function cacheSliderElements(element: HTMLElement) {
        if(!(sliderContainer && dragRangeIndicator && thumbBody1 && thumbBody2 && thumbStart && thumbEnd)) {
            sliderContainer = element.parentElement;
            const sliderElements = Array.from(sliderContainer.children);
            dragRangeIndicator = sliderElements.find(e => e.classList.contains("drag_range_indicator")) as HTMLDivElement;
            thumbBody1 = sliderElements.find(e => e.classList.contains("middle_thumb1")) as HTMLDivElement;
            thumbBody2 = sliderElements.find(e => e.classList.contains("middle_thumb2")) as HTMLDivElement;
            thumbStart = sliderElements.find(e => e.classList.contains("left_thumb")) as HTMLDivElement;
            thumbEnd = sliderElements.find(e => e.classList.contains("right_thumb")) as HTMLDivElement;
        }
    }
</script>

<style>
    .left_thumb, .middle_thumb1, .middle_thumb2, .right_thumb {
        position: absolute;
        background-color: var(--secondary_color);
        color: var(--brightest_color);
        height: calc(1em + 14px);
        line-height: calc(1em + 14px);
        text-align: center;
        top: 2px;
    }

    .middle_thumb2 {
        display: none;
    }

    .left_thumb, .right_thumb {
        width: 1em;
    }

    .slider_container {
        position: relative;
        width: calc(16em); /* WARNING: On resize the rangeWidthPixel variable has to be resized as well! */
        height: 2em;
        margin: 0 2px;
    }

    .drag_range_indicator{
        position: absolute;
        background-color: var(--brighter_color);
        height: calc(1em + 14px + 2px);
        line-height: calc(1em + 14px);
        text-align: center;
        top: 1px;
        left: 1em;
        width: calc(15em);
    }

    .left_thumb {
        border-top-left-radius: 0.75em;
        border-bottom-left-radius: 0.75em;
        border-right: 1px solid var(--brighter_color);
        left: 0;
    }

    .middle_thumb1, .middle_thumb2 {
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
    <div class="middle_thumb1 not_selectable" on:mousedown|preventDefault={(e) => dragThumbBody(e)}></div>
    <div class="middle_thumb2 not_selectable" on:mousedown|preventDefault={(e) => dragThumbBody(e)}></div>
    <div class="left_thumb not_selectable" data-direction="left" on:mousedown|preventDefault={(e) => dragThumbStart(e)}>◀</div>
    <div class="right_thumb not_selectable" data-direction="right" on:mousedown|preventDefault={(e) => dragThumbEnd(e)}>▶</div>
</div>

