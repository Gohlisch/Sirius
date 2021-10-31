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
</style>

<article class="{message.type || ""}">
    <div>Icon</div>
    <div>
        <p><strong>{message.title}</strong></p>
        <p>{message.content}</p>
    </div>
</article>