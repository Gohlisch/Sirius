<script lang="ts">
    import Nav from "$lib/Nav.svelte";
    import Header from "$lib/Header.svelte";
    import Footer from "$lib/Footer.svelte";
	import '../app.css';
</script>

<div class="grid_container">
    <Header/>
    <Nav/>
    <slot></slot>
    <Footer/>
</div>
