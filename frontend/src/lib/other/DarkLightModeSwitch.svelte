<script lang="ts">
    import { onMount } from "svelte";
    enum MODE { DARK = "DARK", LIGHT = "LIGHT" };
    const DARK_MODE_KEY = "DARK_MODE_KEY";
    
    let darkMode: boolean = false;

    onMount(() => {
        const storedDarkMode = window.sessionStorage.getItem(DARK_MODE_KEY);

        if(storedDarkMode === null && window.matchMedia("(prefers-color-scheme: dark)").matches
        || storedDarkMode === MODE.DARK && !window.document.body.classList.contains("dark_mode")) {
            changeLightDarkMode();
        }
    });

    function changeLightDarkMode(): void {
        darkMode = window.document.body.classList.toggle("dark_mode");
        window.sessionStorage.setItem(DARK_MODE_KEY, darkMode ? MODE.DARK : MODE.LIGHT);
    }
</script>

<button on:click="{changeLightDarkMode}">
    ◐
</button>