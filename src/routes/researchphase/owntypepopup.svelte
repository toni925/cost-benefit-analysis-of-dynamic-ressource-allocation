<script>
  export let showPopup; // boolean

  let dialog; // HTMLDialogElement
  let newValues = {};

  import {
    owntype,
    saveInputValues,
    saved,
    rented,
  } from "/Users/tonis/OneDrive/Desktop/Bachelorarbeit/bachelorproject/src/stores/owntypestore";

  $: if (dialog && showPopup) dialog.showModal();

  function handleSave() {
    // Rufe die Funktion zum Speichern der Werte im Store auf
    saveInputValues(newValues);
    saved.update((value) => true);
    dialog.close();
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
  bind:this={dialog}
  on:close={() => (showPopup = false)}
  on:click|self={() => dialog.close()}
>
  <div on:click|stopPropagation>
    <div class="containertop">
      <button
        autofocus
        on:click={() => dialog.close()}
        class="btn btn-circle btn-primary closebutton"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="white"
          ><path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          /></svg
        >
      </button>
    </div>
    <p
      style="margin: 0px 0px 0px 20px; font-size: 20px; font-weight: bold; color: #0065BD;"
    >
      Configure your own type of HPC system
    </p>

    <div class="join containermid" style="margin: 10px 15px 0px 15px;">
      {#if !$rented}
        <div>
          <p style="margin: 10px 10px 0px 5px;">
            Initial costs for building the system
          </p>
        </div>
        <div class="left-content">
          <input
            type="number"
            placeholder="Type here"
            style="margin: 8px 0px 0px 0px;"
            class="input input-bordered input-sm w-full max-w-xs"
            bind:value={newValues.initialcost}
          />
          <p style="margin: 10px 10px 0px 5px; white-space: nowrap;">€</p>
        </div>
      {/if}
    </div>

    <div class="join containermid" style="margin: 10px 15px 0px 15px;">
      {#if !$rented}
        <div>
          <p style="margin: 10px 10px 0px 5px;">
            Running costs for the system without energy costs
          </p>
        </div>
        <div class="left-content">
          <input
            type="number"
            placeholder="Type here"
            style="margin: 8px 0px 0px 0px;"
            class="input input-bordered input-sm w-full max-w-xs"
            bind:value={newValues.runningcosts}
          />
          <p style="margin: 10px 10px 0px 5px; white-space: nowrap;">€/months</p>
        </div>
      {/if}
    </div>

    <div class="join containermid" style="margin: 10px 15px 0px 15px;">
      {#if !$rented}
        <div>
          <p style="margin: 10px 10px 0px 5px;">Energy Costs of the system</p>
        </div>
        <div class="left-content">
          <input
            type="number"
            placeholder="Type here"
            style="margin: 8px 0px 0px 0px;"
            class="input input-bordered input-sm w-full max-w-xs"
            step="0.01"
            bind:value={newValues.energycost}
          />
          <p style="margin: 10px 10px 0px 5px; white-space: nowrap;">€/kWh</p>
        </div>
      {/if}
    </div>

    <div>
      <div class="join containermid" style="margin: 10px 15px 0px 15px;">
        <div>
          <p style="margin: 10px 10px 0px 5px;">System Power Consumption</p>
        </div>
        <div class="left-content">
          <input
            type="number"
            placeholder="Type here"
            style="margin: 8px 0px 0px 0px;"
            class="input input-bordered input-sm w-full max-w-xs"
            bind:value={newValues.powerconsumption}
          />
          <p style="margin: 10px 10px 0px 5px; white-space: nowrap;">Watt</p>
        </div>
      </div>
    </div>

    <div>
      <div class="join containermid" style="margin: 10px 15px 0px 15px;">
        <div>
          <p style="margin: 10px 10px 0px 5px;">Runtime of the System</p>
        </div>
        <div class="left-content">
          <input
            type="number"
            placeholder="Type here"
            style="margin: 8px 0px 0px 0px;"
            class="input input-bordered input-sm w-full max-w-xs"
            bind:value={newValues.runtimesys}
          />
          <p style="margin: 10px 10px 0px 5px; white-space: nowrap;">years</p>
        </div>
      </div>
    </div>

    <div>
      <div class="join containermid" style="margin: 10px 15px 0px 15px;">
        {#if !$rented}
        <div>
          <p style="margin: 10px 10px 0px 5px;">Possible Cores of the System</p>
        </div>
        <div class="left-content">
          <input
            type="number"
            placeholder="Type here"
            style="margin: 8px 0px 0px 0px;"
            class="input input-bordered input-sm w-full max-w-xs"
            bind:value={newValues.corehourssys}
          />
        </div>
        {/if}
      </div>
    </div>

    <hr style="margin: 20px 0px 0px 0px;" />

    <div>
      <div class="join containermid" style="margin: 10px 15px 0px 15px;">
        <p style="margin: 10px 10px 0px 5px; white-space: nowrap;">
          number of HPC Systems, that are used like this type
        </p>
        <input
          type="number"
          placeholder="Type here"
          style="margin: 8px 0px 0px 0px;"
          class="input input-bordered input-sm w-full max-w-xs"
          bind:value={newValues.numberofsystems}
        />
      </div>
    </div>
    <!--
    <div>
      <div class="join containermid" style="margin: 10px 15px 0px 15px;">
        <p style="margin: 10px 10px 0px 5px; white-space: nowrap;">
          number of months this type of system is used
        </p>
        <input
          type="number"
          placeholder="Type here"
          style="margin: 8px 0px 0px 0px;"
          class="input input-bordered input-sm w-full max-w-xs"
          bind:value={newValues.numberofmonths}
        />
      </div>
    </div>
    -->
    <div class="container py-5 px-5 mx-0 min-w-full flex flex-col items-center">
      <button
        class="text-white btn btn-primary bottom-mid-button"
        style="margin: 20px 0px 0px 0px; font-size: 18px;"
        on:click={handleSave}
      >
        Save
      </button>
    </div>
    <!-- svelte-ignore a11y-autofocus -->
  </div>
</dialog>

<style>
  dialog {
    border-radius: 20px;
    border: 2px solid #0065bd;
    padding: 10px;
  }
  dialog::backdrop {
    background: rgba(0, 0, 0, 0.3);
  }
  dialog > div {
    padding: 1em;
  }
  dialog[open] {
    animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  input {
    text-align: center;
    max-width: 120px;
  }
  .bottom-mid-button {
    min-width: 400px;
  }
  .containertop {
    display: flex;
    justify-content: flex-end;
    align-items: right;
  }
  .containermid {
    display: flex;
    justify-content: space-between;
  }
  .left-content {
    display: flex;
    align-items: top;
  }
  @keyframes zoom {
    from {
      transform: scale(0.95);
    }
    to {
      transform: scale(1);
    }
  }
  dialog[open]::backdrop {
    animation: fade 0.2s ease-out;
  }
  @keyframes fade {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  button {
    display: block;
  }
  .closebutton {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
