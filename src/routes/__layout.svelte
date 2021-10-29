<script lang="ts">
    import Nav from "../components/Nav.svelte";
    import Header from "../components/Header.svelte";
    import Footer from "../components/Footer.svelte";
	import '../app.css';
</script>

<div class="grid_container">
    <Header/>
    <Nav/>
    <slot></slot>
    <Footer/>
</div>
