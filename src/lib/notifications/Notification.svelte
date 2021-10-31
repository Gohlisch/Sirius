<script lang="ts">
    import type { Message } from "./notification_store";

    export let message: Message;
</script>

<style>
    article {
        display: flex;
        align-items: center;
        padding: 0.5em 1em 0.5em 1em;
        margin: 0.5em 1em 0.5em 1em;
        border: 1px solid black;
        border-radius: 1em;
    }

    .info {
        background-color: var(--info_bg_color);
    }

    .success {
        background-color: var(--success_bg_color);
    }

    .warning {
        background-color: var(--warning_bg_color);
    }

    .error {
        background-color: var(--error_bg_color);
    }
</style>

<article class="{message.type || ""}">
    <div>Icon</div>
    <div>
        <p><strong>{message.title}</strong></p>
        <p>{message.content}</p>
    </div>
</article>