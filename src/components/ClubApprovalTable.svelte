<script>
  let records = [];
  google.script.run.withSuccessHandler(showUserClubRecord).getClubsForApproval();
  function showUserClubRecord(allUserApplicationRecords) {
    records = allUserApplicationRecords;
    console.table(records);
  }
  function handleSubmit() {
    console.log("button clicked");
  }
</script>

<div class="mt-2 mx-auto p-4">
  <h2 id="list-heading">Records for approval</h2>
  <form on:submit|preventDefault={handleSubmit}>
    <fieldset>
      <ul>
        {#each records as record (record.id)}
          <li class="todo">
            <div class="stack-small">
              <div class="c-cb">
                <input type="checkbox" id="todo-{record.id}" checked={record.approved} />
                <label for="todo-{record.id}" class="todo-label">
                  `{record.name} in {record.homeroom}
                  {record.grade} would like to join the {record.clubname} club.`
                </label>
              </div>
            </div>
          </li>
        {:else}
          <li>Nothing to do here!</li>
        {/each}
      </ul>
      <br />
      <input type="submit" value="Submit now" />
    </fieldset>
  </form>
</div>
