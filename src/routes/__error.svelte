<script context="module">
	export function load({ error, status }) {
		return {
			props: {
				errorInfo:{
                    title: `${status}: ${error.message}`,
                    statusCode: status
                }
			}
		};
	}
</script>

<script>
    export let errorInfo;

    const errorMedia = {
        "404": {src: "../../static/img/john_travolta_pulp_fiction.gif", alt:"John Travolta als Vincent Vega aus Pulp Fiction schaut verwirrt umher."}
    }
</script>

<svelte:head>
    <title>Sirius – { errorInfo.statusCode }</title>
</svelte:head>

<main>
    <h1>Ups! Etwas ist schiefgelaufen! 🙁</h1>
    <p>{errorInfo.title}</p>
    {#if errorMedia[errorInfo.statusCode] }
        <img src="{errorMedia[errorInfo.statusCode].src}"
        alt="{errorMedia[errorInfo.statusCode].alt}">
    {/if}
</main>
