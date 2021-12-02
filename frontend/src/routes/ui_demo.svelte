<script>
    import RangeSlider from "$lib/other/RangeSlider.svelte"

    const colors = ["red", "orange", "yellow", "green", "mint", "teal", "cyan", "blue", "indigo", "purple", "pink", "brown"];
    const shades_of_grey = ["darkest", "darker", "dark", "bright", "brighter", "brightest"]
    const purpose_color = ["font", "primary", "secondary", "important_signifier"];

    let sliderOptions = {
        start: 0,
        end: 100,
        min: 0,
        max: 100,
        steps: 1,
        endBeforeStartAllowed: false
    };
</script>

<style>
    article {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .colors {
        display: flex;
    }

    .color_block {
        height: 100px;
        width: 100px;
        color: var(--brightest_color);
        border: 1px solid var(--darkest_color);
    }

    .centered {
        margin-left: auto;
        margin-right: auto;
    }
</style>

<div>
    <article>
        <h1>Colors</h1>
        <div class="colors">
            {#each colors as color}
            <div class="color_block" style="background-color: var(--{color}_color);">{color}</div>
            {/each}
        </div>
    </article>
    <article>
        <h1>6 Shades of Grey™️</h1>
        <div class="colors">
            {#each shades_of_grey as color}
            <div class="color_block" style="background-color: var(--{color}_color);">{color}</div>
            {/each}
        <div/>
    </article>
    <article>
        <h1>Purpose Colors</h1>
        <div class="colors">
            {#each purpose_color as color}
            <div class="color_block" style="background-color: var(--{color}_color);">{color}</div>
            {/each}
        <div/>
    </article>
    <article>
        <h1>Inputs</h1>
        <button>button</button>
        <p>start: {sliderOptions.start} end: {sliderOptions.end}</p>
        <RangeSlider bind:options={sliderOptions}></RangeSlider>
    </article>
</div>