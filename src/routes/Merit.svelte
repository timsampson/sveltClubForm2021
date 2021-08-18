<script>
  import Button from "../components/ui/Button.svelte";
  import {
    studentData,
    behaviorCategories,
    positiveList,
    informationList,
    level1List,
    YCList,
    OCList,
    RCList,
  } from "../db";
  import { onMount } from "svelte";
  import { slide } from "svelte/transition";
  import { quintOut } from "svelte/easing";
  let submitted = false;
  let level = "";
  let searchTerm = "";
  let selectedHomeroom;
  let homerooms = [];
  let categories = [];
  let behaviorList = [];
  function displayCategories() {
    if (level === "Information") {
      categories = informationList;
    } else if (level === "Level 1") {
      categories = level1List;
    } else if (level === "Yellow Level") {
      categories = YCList;
    } else if (level === "Orange Level") {
      categories = OCList;
    } else if (level === "Red Level") {
      categories = RCList;
    } else categories = positiveList;
  }
  let filteredStudents = [];

  const getHomerooms = () => {
    for (let studentObj of studentData) {
      if (!homerooms.includes(studentObj.homeroom)) {
        homerooms = [...homerooms, studentObj.homeroom];
      }
    }
    homerooms = homerooms.sort();
  };
  onMount(() => getHomerooms());

  $: if (selectedHomeroom) getStudentsByHr();

  const getStudentsByHr = () => {
    searchTerm = "";
    if (selectedHomeroom === "all") {
      return (filteredStudents = []);
    }
    return (filteredStudents = studentData.filter(
      (student) => student.homeroom === selectedHomeroom
    ));
  };

  $: if (searchTerm) selectedHomeroom = "";
  const searchStudents = () => {
    return (filteredStudents = studentData.filter((student) => {
      let studentName = student.name.toLowerCase();
      return studentName.includes(searchTerm.toLowerCase());
    }));
  };
  function handleSubmit() {
    submitted = true;
    console.log(`level:  ${level}.... behaviorList: ${behaviorList}`);
  }
</script>

<div class="m-4">
  <form class="w-full max-w-lg">
    <div class="finline-flex space-x-4 mb-6">
      <input
        class="flex-1 mt-1 mr-6 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        type="text"
        id="search-field"
        placeholder="Enter Student Name"
        autocomplete="off"
        bind:value={searchTerm}
        on:input={searchStudents}
      />
      <select
        class="flex-1 w-1/2 mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        name="homeroom"
        id="homeroom"
        bind:value={selectedHomeroom}
      >
        <option disabled selected value="">Select a homeroom.</option>
        <option value="all">All homerooms</option>
        {#each homerooms as homeroom}
          <option value={homeroom}>{homeroom}</option>
        {/each}
      </select>
    </div>
    <div class="flex flex-wrap -mx-3 mb-6">
      <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
        <div>
          {#each behaviorCategories as merit}
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
                <label for={category} class="ml-2 py-1 text-sm">
                  <input
                    type="checkbox"
                    class=" text-blue-500 border-2 rounded border-blue-500 focus:ring-blue-500"
                    bind:group={behaviorList}
                    name="behaviorList"
                    value={category}
                  />
                  {category}</label
                >
              </li>
            {/each}
          </ul>
        {:else}
          <h1 class="text-2xl text-blue-800">Please select a category</h1>
        {/if}
      </div>
    </div>
  </form>

  <div class="inline-flex">
    <Button {submitted} on:click={handleSubmit}>Submit</Button>
  </div>
</div>
<div class="ml-8 ">
  {#if searchTerm && studentData.length === 0}
    <h1>no results</h1>
  {:else if filteredStudents.length > 0}
    {#each filteredStudents as student}
      <p class="mt-1 text-blue-800">{student.name} in {student.homeroom}</p>
    {/each}
  {/if}
</div>
