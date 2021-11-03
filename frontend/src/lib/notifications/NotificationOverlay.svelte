<script lang="ts">
    import Notification from "./Notification.svelte";
    import { notificationStore } from "./notification_store";
</script>

<style>
    aside {
        position: fixed;
        bottom: 0;
        right: 0;
    }
</style>

<aside>
    {#each $notificationStore as notification }
        <Notification message={notification}></Notification>
    {/each}
</aside>