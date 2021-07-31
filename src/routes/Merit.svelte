<script>
  let level = "";
  let name = [];
  let homeroom = [];
  let categories = [];
  let informationData = ["sleepy", "eating in class", "late", "emotional"];
  let level1Data = ["off task", "constantly chatting", "tardy"];
  let YCData = ["shouting", "running", "sleeping"];
  let OCData = ["fighting", "screaming", "thowing objects"];
  let RCData = ["smoking", "fireworks", "swearing"];
  function displayCategories() {
    if (level === "Information") {
      categories = informationData;
    } else if (level === "Level 1") {
      categories = level1Data;
    } else if (level === "Yellow Card") {
      categories = YCData;
    } else if (level === "Orange Card") {
      categories = OCData;
    } else if (level === "Red Card") {
      categories = RCData;
    }
    categories = categories;
  }

  function handleSubmit() {}
  import { slide } from "svelte/transition";
  import { quintOut } from "svelte/easing";
</script>

<div class="m-4">
  <form class="w-full max-w-lg">
    <div class="flex flex-wrap -mx-3 mb-6">
      <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
        <label
          class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          for="name"
        >
          Student Name
        </label>
        <input
          class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
          id="name"
          type="text"
          placeholder="Jane Dough"
          bind:value={name}
        />
        <p class="text-red-500 text-xs italic">Please fill out this field.</p>
      </div>
      <div class="w-full md:w-1/2 px-3">
        <label
          class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          for="homeroom"
        >
          homeroom
        </label>
        <input
          class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          id="homeroom"
          type="text"
          placeholder="Homeroom"
          bind:value={homeroom}
        />
      </div>
    </div>
    <div class="flex flex-wrap -mx-3 mb-6">
      <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
        <div>
          <div>
            <label>
              <input
                type="radio"
                value="Information"
                bind:group={level}
                on:submit={handleSubmit}
                on:change={displayCategories}
              />
              Information
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                value="Level 1"
                bind:group={level}
                on:submit={handleSubmit}
                on:change={displayCategories}
              />
              Level 1
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                value="Yellow Card"
                bind:group={level}
                on:submit={handleSubmit}
                on:change={displayCategories}
              />
              Yellow Card
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                value="Orange Card"
                bind:group={level}
                on:submit={handleSubmit}
                on:change={displayCategories}
              />
              Orange Card
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                value="Red Card"
                bind:group={level}
                on:submit={handleSubmit}
                on:change={displayCategories}
              />
              Red Card
            </label>
          </div>
        </div>
        <p class="text-red-500 text-xs italic">Select a level from the list.</p>
      </div>
      <div>
        {#if categories.length > 0}
          <ul class="p-2 mx-auto">
            {#each categories as category}
              <li
                class="border-b-2 border-blue-200 pt-2 pb-1"
                transition:slide|local={{ delay: 250, duration: 300, easing: quintOut }}
              >
                <input
                  id={category}
                  type="checkbox"
                  class=" text-red-500 border-2 rounded border-red-500 focus:ring-red-500"
                  name="rejects"
                />
                <label for={category} class="ml-2 py-1 text-sm">{category}</label>
              </li>
            {/each}
          </ul>
        {:else}
          <h1 class="text-2xl text-blue-800">Please select a category</h1>
        {/if}
      </div>
    </div>
  </form>

  <div class="md:flex md:items-center">
    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4  rounded">
      Button
    </button>
  </div>
</div>
