<script lang="ts">
    import Nav from "./_Nav.svelte";
    import Header from "./_Header.svelte";
    import Footer from "./_Footer.svelte";
</script>

<div class="grid_container">
    <Header/>
    <Nav/>
    <slot></slot>
    <Footer/>
</div>
