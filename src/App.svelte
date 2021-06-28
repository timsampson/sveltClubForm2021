<script>
  import routes from "./routes";
  import Navigation from "./components/Navigation.svelte";
  import Router from "svelte-spa-router";
</script>

<Navigation />
<main>
  <Router {routes} />
</main>

<style global lang="postcss">
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
