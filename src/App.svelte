<script>
  import Router from "svelte-spa-router";
  import { wrap } from "svelte-spa-router/wrap";
  import { push } from "svelte-spa-router";

  import { userDetails } from "./user-store";
  import Navigation from "./components/ui/Navigation.svelte";
  import Home from "./routes/Home.svelte";
  import Signup from "./routes/Signup.svelte";
  import Dashboard from "./routes/Dashboard.svelte";
  import Admin from "./routes/Admin.svelte";
  import Merit from "./routes/Merit.svelte";

  google.script.run.withSuccessHandler(updateUserDetails).getUserState();
  function updateUserDetails(updatedUserDetails) {
    $userDetails = updatedUserDetails;
  }
  const routes = {
    "/": Signup,
    "/home/": Home,
    "/dashboard/": Dashboard,
    "/signup/": Signup,
    "/admin/": wrap({
      component: Admin,
      conditions: [
        (detail) => {
          return $userDetails.isAdmin;
        },
      ],
    }),
    "/merit/": wrap({
      component: Merit,
      conditions: [
        (detail) => {
          return $userDetails.isTeacher;
        },
      ],
    }),
  };
  //$: console.table($userDetails);
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
