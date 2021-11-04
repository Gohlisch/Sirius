<script lang="ts">
    import type { Message } from "./notification_store";
	import { fly } from 'svelte/transition';

    export let message: Message;
</script>

<style>
    article {
        display: flex;
        align-items: center;
        font-size: 0.75em;
        padding: 0 0.5em 0 .05em;
        margin: 0.5em 0.75em 0.5em 0.75em;
        border: 1px solid black;
        border-radius: 0.5em;
    }

    .info {
        background-color: rgba(var(--brightest_color), 0.90);
        border-color: var(--bright_color);
    }

    .dark_mode .info {
        background-color: rgba(var(--darker_color_rgb), 0.90);
        border-color: var(--bright_color);
    }

    .success {
        background-color: rgba(var(--primary_color_rgb), 0.90);
        border-color: var(--primary_color);
    }

    .dark_mode .success {
        background-color: rgba(var(--darker_color_rgb), 0.90);
        border-color: var(--bright_color);
    }

    .warning {
        background-color: rgba(var(--secondary_color_rgb), 0.90);
        border-color: var(--secondary_color);
    }

    .dark_mode .warning {
        background-color: rgba(var(--darker_color_rgb), 0.90);
        border-color: var(--secondary_color_rgb);
    }

    .error {
        background-color: rgba(var(--important_signifier_color_rgb), 0.90);
        border-color: var(--important_signifier_color);
    }

    .dark_mode .error {
        background-color: rgba(var(--darker_color_rgb), 0.90);
        border-color: var(--important_signifier_color_rgb);
    }
</style>

<article class="{message.type || ""}" in:fly="{{ x: 200, duration: 500 }}" out:fly="{{ y: -100, duration: 750 }}">
    {#if message.iconPath}
    <div><img src="{message.iconPath}" alt="Icon" aria-hidden="true"></div>
    {/if}
    <div>
        <p><strong>{message.title}</strong></p>
        {#if message.content}
        <p>{message.content}</p>
        {/if}
    </div>
</article>