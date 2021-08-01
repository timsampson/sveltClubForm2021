<script>
  import { studentsDB } from "../studentData";
  import { slide } from "svelte/transition";
  import { quintOut } from "svelte/easing";
  let merits = ["Information", "Level 1", "Yellow Level", "Orange Level", "Red Level"];
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
    } else if (level === "Yellow Level") {
      categories = YCData;
    } else if (level === "Orange Level") {
      categories = OCData;
    } else if (level === "Red Level") {
      categories = RCData;
    }
  }
  let studentsData = studentsDB.slice();

  let filteredStudents = [];
  const searchStudents = () => {
    return (filteredStudents = studentsData.filter((student) => {
      let studentName = student.name.toLowerCase();
      return studentName.includes(name.toLowerCase());
    }));
  };
  function handleSubmit() {}
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
          on:input={searchStudents}
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
          {#each merits as merit}
            <div class="mb-2">
              <label>
                <input
                  type="radio"
                  value={merit}
                  bind:group={level}
                  on:submit={handleSubmit}
                  on:change={displayCategories}
                />
                <span class="ml-2">{merit}</span>
              </label>
            </div>
          {/each}
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
<div class="ml-8 ">
  {#if name && studentsData.length === 0}
    <h1>no results</h1>
  {:else if filteredStudents.length > 0}
    {#each filteredStudents as student}
      <p class="mt-1 text-blue-800">{student.name} in {student.homeroom}</p>
    {/each}
  {/if}
</div>
