<script>
  import Router from "./Router.svelte";
  import routes from "./routes";
  import Navigation from "./components/Navigation.svelte";
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
