<script>
    const colors = ["red", "orange", "yellow", "green", "mint", "teal", "cyan", "blue", "indigo", "purple", "pink", "brown"];
    const shades_of_grey = ["darkest", "darker", "dark", "bright", "brighter", "brightest"]
    const purpose_color = ["font", "primary", "secondary", "important_signifier"];
</script>

<style>
    .colors {
        display: flex;
    }

    .color_block {
        height: 100px;
        width: 100px;
        color: var(--brightest_color);
        border: 1px solid var(--darkest_color);
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
    </article>
</div>