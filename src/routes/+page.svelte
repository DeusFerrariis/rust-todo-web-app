<script context="module">
  hydrate = true;
</script>

<script>
  import { Card, TextFieldOutlined, Dialog, Button, CardClickable, Checkbox, FAB } from "m3-svelte";
  import { getIcon, loadIcons, loadIcon, iconExists, listIcons } from '@iconify/svelte';

  export let data;

  $: console.log(data.tasks)

  const addIconName = "mdi:add-bold"
  let addIcon;

  loadIcon(addIconName).then(res => {
    addIcon = getIcon(addIconName)
    console.log(listIcons());
  })

  async function createTask() {
    if (newDialogValue == "") {
      newDialogValueEmpty = true;
      return;
    }
    let task = await data.newTask(newDialogValue, () => {
      newDialogOpen = false;
      newDialogValue = "";
      alert("An error occured :<");
      return;
    });

    location.reload();
  }

  async function completeTask() {
    console.log("wow")
    console.log(completeDialogTask)
    if (completeDialogTask) {
      const res = await data.closeTask(completeDialogTask.id)
      if (!res) {
        alert("An error occured :<");
      } else {
        location.reload();
      }
    }
  }

  $: completeDialogOpen = false;
  $: completeDialogTask = null;
  $: newDialogOpen = false;
  $: newDialogValue = "";
  $: newDialogValueEmpty = false;

  $: controlDown = false;
  $: bDown = false;

  $: console.log(newDialogOpen)

  function onKeyDown(event) {
    switch (event.key) {
      case "Control":
        controlDown = true;
        event.preventDefault();
        break;
      case "b":
        bDown = true;
        event.preventDefault();
        break;
      case "Escape":
        newDialogOpen = false;
        event.preventDefault();
        break;
      default:
        break;
        return;
    }

    if (controlDown && bDown && !(newDialogOpen)) {
      newDialogOpen = false;
      newDialogOpen = true;
    }
  }

  function onKeyUp(event) {
    switch (event.key) {
      case "Control":
        controlDown = false;
        event.preventDefault();
        break;
      case "b":
        bDown = false;
        event.preventDefault();
        break;
      default:
        break;
        return;
    }
  }
</script>

<svelte:window on:keydown={onKeyDown} on:keyup={onKeyUp} />
<svelte:head>
  {#if newDialogOpen}
    <title>New Task</title>
  {:else}
    <title>// Tasks //</title>
  {/if}
</svelte:head>

<div class="main">
  <h1 style="margin-bottom: 2rem;">// Tasks //</h1>
  <p style="margin-top: 0px; color: rgb(var(--m3-scheme-secondary))">Hint press CTRL + B to create a new task</p>
  {#if (data.tasks.length == 0)}
    <Card
      type="outlined" 
      extraOptions={{id: "task-container", style: `
        display: flex;
        width: 100%;
        padding-right: 2rem;
        padding-left: 2rem;
        max-width: 65ch; 
        cursor: pointer;
        align-items: center;
        flex-direction: row;
        margin-bottom: 1rem;
        justify-content: space-between;`}}>
      <h3>🐔 Nothing here but us chickens...</h3>
      <Button type="text" on:click={() => {newDialogOpen = true}}>Add Task</Button>
    </Card>
  {/if}
  {#each data.tasks as task}
    <CardClickable 
      on:click={() => {completeDialogOpen = true; completeDialogTask = task}}
      type="elevated" 
      extraOptions={{id: "task-container", style: `
        display: flex;
        width: 100%;
        max-width: 65ch; 
        cursor: pointer;
        align-items: center;
        flex-direction: row;
        margin-bottom: 1rem;
        justify-content: space-between;`}}>
      <p class="udl" style="padding: 0px; margin: 0px; width: max-content;">{task.content}</p>
    </CardClickable>
  {/each}
  <div style="width: 100%; max-width: 65ch; display: flex; align-items: center; justify-content: flex-end">
    <FAB 
      on:click={() => {newDialogOpen = true}}
      color="secondary" 
      size="small"
      icon={addIcon} />
  </div>

  <Dialog
    closeOnEsc={false}
    on:closedByEsc={() => {completeDialogOpen = false}}
    headline="Ready to complete this task?" 
    bind:open={completeDialogOpen}>
    {#if completeDialogTask}
      <p style="margin-top: 0px; margin-bottom: 2rem;">
        {completeDialogTask.content}
      </p>
      <div 
        style="width: 100%; display: flex; flex-direction: row; align-items: center; justify-content: flex-end;">
        <Button on:click={() => {completeDialogOpen = false; completeDialogTask = null}} type="text">Cancel</Button>
        <div style="width: 1rem;"></div>
        <Button on:click={completeTask} type="filled">Complete</Button>
      </div>
    {/if}
  </Dialog>

  <Dialog 
    on:closedByEsc={() => {newDialogOpen = false; console.log("close");}}
    headline="New Task" 
    extraOptions={{style: "width: calc(100% - 4rem); max-width: 65ch"}} 
    bind:open={newDialogOpen}>
    <form on:submit={createTask} style="margin-bottom: 1rem; width: 100%;">
      <svelte:component
        this={TextFieldOutlined}
        bind:value={newDialogValue}
        extraOptions={{style: "width: 100%;"}}
        error={(newDialogValue == "" && newDialogValueEmpty == true)}
        extraWrapperOptions={{style: "width: 100%;"}}
        name={(newDialogValue == "" && newDialogValueEmpty == true) ? "Task (empty)" : "Task"} 
        --m3-util-background="var(--m3-scheme-surface-container-high)"
      />
    </form>
    <div 
      style="width: 100%; display: flex; flex-direction: row; align-items: center; justify-content: flex-end;">
      <Button on:click={() => {newDialogOpen = false;}} type="text">Cancel</Button>
      <div style="width: 1rem;"></div>
      <Button on:click={createTask} type="filled">Add</Button>
    </div>
  </Dialog>

  <div id="br-corner">
    {#if (data.tasks.length > 0)}
      <FAB 
        on:click={() => {newDialogOpen = true}}
        type="extended" 
        icon={addIcon} 
        text="Add Task" />
    {/if}
  </div>
</div>


<style>
  div.main {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  div#br-corner {
    position: fixed;
    bottom: 0;
    right: 0;
    padding: 2rem;
  }
  
  button {
    background-color: rgb(var(--m3-scheme-surface-container-low));
    color: rgb(var(--m3-scheme-primary));
    box-shadow: var(--m3-util-elevation-1);
    border-radius: var(--m3-util-rounding-full);
  }

  *:hover p.udl {
    text-decoration: line-through;
    text-decoration-color: auto;
    transition: all .5s ease;
  }

  :global(#task-container):hover p.udl {
        text-decoration: line-through;
    text-decoration-color: auto;
    transition: all .5s ease;
  }

  :global(#task-container) p.udl {
    text-decoration: line-through;
    text-decoration-color: transparent;
    transition: all .5s ease;
  }
</style>
