<script>
  import {
    notice,
    alertInfo,
    alertDanger,
    alertPrimary,
    alertSuccess,
  } from "../messageStores.js";
</script>

{#if $notice}
  <div>
    <p
      class="text-center text-white rounded-md p-2 my-2 mx-auto md:max-w-2xl"
      class:bg-gradient-to-r={$alertInfo}
      class:from-blue-400={$alertInfo}
      class:to-blue-600={$alertInfo}
      class:bg-indigo-500={$alertPrimary}
      class:bg-green-500={$alertSuccess}
      class:bg-red-500={$alertDanger}
    >
      {$notice}
    </p>
  </div>
{/if}
