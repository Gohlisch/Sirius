<script context="module">
	export function load({ error, status }) {
		return {
			props: {
				errorInfo:{
                    title: `${status}: ${error.message}`,
                    statusCode: status,
                    message: error.message
                }
			}
		};
	}
</script>

<script>
    export let errorInfo;

    const errorMedia = {
        "404": {src: "", alt:""}
    }
</script>
<main>
    <h1>{errorInfo.title}</h1>
    <p>Ups! Etwas ist schiefgelaufen! 🙁</p>
    <p>Fehlercode {errorInfo.statusCode}</p>
    <p>{errorInfo.message}</p>
    {#if errorInfo.statusCode[""+errorInfo.statusCode] }
        <img src="{errorMedia[""+errorInfo.statusCode].src}"
        alt="{errorMedia[""+errorInfo.statusCode].alt}">
    {/if}
</main>
