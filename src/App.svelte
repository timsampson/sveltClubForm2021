<script>
  import Navigation from "./components/ui/Navigation.svelte";
  import Home from "./routes/Home.svelte";
  import Signup from "./routes/Signup.svelte";
  import Dashboard from "./routes/Dashboard.svelte";
  import Admin from "./routes/admin.svelte";

  import Router from "svelte-spa-router";

  const routes = {
    "/": Signup,
    "/home/": Home,
    "/dashboard/": Dashboard,
    "/signup/": Signup,
    "/admin/": Admin,
  };
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
