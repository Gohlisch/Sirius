<script>
    const colors = ["red", "orange", "yellow", "green", "mint", "teal", "cyan", "blue", "indigo", "purple", "pink", "brown"];
</script>

<style>
    .colors {
        display: flex;
    }

    .color_block {
        height: 100px;
        width: 100px;
        color: var(--brightest_colors);
    }
</style>

<div class="colors">
    {#each colors as color}
    <div class="color_block" style="background-color: {color}">{color}</div>
    {/each}
</div>