<script>
  /** @type {import('./$types').PageData} */
  export let data;
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { saveInputValuesGP } from "/Users/tonis/OneDrive/Desktop/Bachelorarbeit/bachelorproject/src/stores/model";

  let selectedButton = null;
  let selectedButton2 = null;
  let isDisabled = true;
  let isCheckboxChecked = false;
  let isButtonDisabled = false;
  let values = {};

  function toggleCheckbox() {
    isCheckboxChecked = !isCheckboxChecked;
    isButtonDisabled = isCheckboxChecked;
  }

  const selectButton = (button) => {
    selectedButton = button;
  };

  const selectButton2 = (button) => {
    selectedButton2 = button;
    if (selectedButton2 === timebuttons[0]) {
      isDisabled = true;
    } else {
      isDisabled = false;
    }
  };

  const handleButtonClick = () => {
    if (selectedButton2 === timebuttons[0]) {
      values.archgoal = "Yes";
    } else {
      values.archgoal = "F";
    }
    if (!isButtonDisabled) {
      if (selectedButton === buttons[0]) {
        values.duration = "12";
      }
      if (selectedButton === buttons[1]) {
        values.duration = "24";
      }
      if (selectedButton === buttons[2]) {
        values.duration = "36";
      }
    }
    console.log(values.archgoal);
    console.log(values.duration);
    console.log(values.projectname);
    console.log(values.addtime);
    console.log(values.budget);
    saveInputValuesGP(values);
    goto("/researchphase");
  };

  const buttons = ["12 months", "24 months", "36 months"];
  const timebuttons = ["Yes", "No"];

  onMount(() => {
    // Wähle den ersten Button standardmäßig aus
    if (selectedButton === null) {
      selectedButton = buttons[1];
    }
    if (selectedButton2 === null) {
      selectedButton2 = timebuttons[0];
    }
    const inputField = document.getElementById("my-input");
    inputField.disabled = isDisabled;
  });
</script>

<main>
  <p style="margin: 80px 0px 0px 0px; font-size: 22px; font-weight: bold;">
    1.1 Name of the Project:
  </p>
  <input
    type="text"
    placeholder="Type here"
    style="margin: 10px 15px 0px 15px;"
    class="input input-bordered w-full max-w-xs"
    bind:value={values.projectname}
  />
  <p style="margin: 80px 0px 0px 0px; font-size: 22px; font-weight: bold;">
    1.2 Duration of the Project:
  </p>
  <div class="join" style="margin: 10px 15px 0px 15px;">
    {#each buttons as button}
      <button
        class="{selectedButton === button
          ? 'btn btn-primary text-white'
          : 'btn btn-accent'} shadow"
        style="border-radius: 28px; margin: 0px 10px 0px 0px;"
        disabled={isButtonDisabled}
        on:click={() => selectButton(button)}>{button}</button
      >
    {/each}
  </div>
  <div>
    <div class="join" style="margin: 10px 15px 0px 15px;">
      <input
        type="checkbox"
        style="margin: 10px 0px 0px 0px;"
        class="toggle"
        checked={isCheckboxChecked}
        on:change={toggleCheckbox}
      />
      <p style="margin: 10px 15px 0px 15px;">Custom</p>
      <input
        type="number"
        placeholder="Type here"
        style="margin: 8px 0px 0px 0px;"
        class="input input-bordered input-sm w-full max-w-xs"
        disabled={!isCheckboxChecked}
        bind:value={values.duration}
      />
    </div>
  </div>
  <p style="margin: 80px 0px 0px 0px; font-size: 22px; font-weight: bold;">
    1.3 Will you be able to achieve your project goal with the current time
    frame?
  </p>
  <div class="join" style="margin: 10px 15px 0px 15px;">
    {#each timebuttons as button2}
      <button
        class="{selectedButton2 === button2
          ? 'btn btn-primary text-white'
          : 'btn btn-accent'} shadow"
        style="border-radius: 28px; margin: 0px 10px 0px 0px;"
        on:click={() => selectButton2(button2)}>{button2}</button
      >
    {/each}
  </div>
  <div>
    <div class="join" style="margin: 10px 15px 0px 15px;">
      <p style="margin: 10px 5px 0px 0px; white-space: nowrap;">
        If no, how much additional time do you estimate you need?
      </p>
      <input
        type="number"
        id="my-input"
        placeholder="Type here"
        style="margin: 8px 0px 0px 0px;"
        class="input input-bordered input-sm w-full max-w-xs"
        disabled={isDisabled}
        bind:value={values.addtime}
      />
      <p style="margin: 10px 10px 0px 5px;">months</p>
    </div>
  </div>
  <p style="margin: 80px 0px 0px 0px; font-size: 22px; font-weight: bold;">
    1.4 Budget for the dynamic ressources share of the project
  </p>
  <p style="margin: 10px 15px 0px 15px; white-space: nowrap;">
    The part of funding that is used for dynamic ressources
  </p>
  <div>
    <div class="join" style="margin: 10px 15px 0px 15px;">
      <input
        type="number"
        placeholder="Type here"
        style="margin: 8px 0px 0px 0px;"
        class="input input-bordered input-sm w-full max-w-xs"
        bind:value={values.budget}
      />
      <p style="margin: 10px 10px 0px 5px; white-space: nowrap;">in €</p>
    </div>
  </div>
  <button
    class="text-white px-20 btn btn-primary bottom-right-button"
    style="font-size: 18px;"
    on:click={handleButtonClick}>Save & Next</button
  >
</main>

<style>
  main {
    margin-top: 2%;
    margin-left: 2%;
    margin-right: 2%;
    padding-bottom: 10%;
  }
  button {
    min-width: 120px;
    max-height: 54px;
  }

  .bottom-right-button {
    position: absolute;
    margin-top: 100px;
    right: 10%;
    min-width: 350px;
    font-weight: bold;
    margin-bottom: 20px;
  }
</style>
