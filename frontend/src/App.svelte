<script>
    import { onMount } from "svelte";

    export let name;

    let apimessage = "Waiting for server...";

    onMount(async () => {
        let resp = await fetch("/api/greet").then((res) => res.json());
        apimessage = resp.user_count;
        console.log(resp.user_count);
    });

</script>

<main>
    <h1>Hello {name}!</h1>
    <p>
        Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn
        how to build Svelte apps.
    </p>

    <h3>Data from server</h3>
    	{apimessage} 
</main>

<style>
	h1{
		background-color: #f0f0f0;
		color: rgb(255, 106, 0);
	}
</style>