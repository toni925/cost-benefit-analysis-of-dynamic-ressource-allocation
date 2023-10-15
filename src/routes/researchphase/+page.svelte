<script>
  /** @type {import('./$types').PageData} */
  import { onMount } from "svelte";
  import { writable } from "svelte/store";
  import EmployeeCat from "./newemployeecategorie.svelte";
  import FutureEmployeeCat from "./futureemployees.svelte";
  import Futureemployees from "./futureemployees.svelte";
  import Image from "/src/lib/images/add.png";
  import PopUp from "./owntypepopup.svelte";
  import { goto } from "$app/navigation";
  import {
    owntype,
    saved,
    rented,
  } from "/Users/tonis/OneDrive/Desktop/Bachelorarbeit/bachelorproject/src/stores/owntypestore";
  import { saveInputValuesRP } from "/Users/tonis/OneDrive/Desktop/Bachelorarbeit/bachelorproject/src/stores/model";

  let employeecat = [{ value1: "", value2: "" }];
  let futureemployeecat = [{ value1: "", value2: "", value3: "", value4: "" }];
  let values = {};
  function addemployeecat() {
    employeecat = [...employeecat, { id: employeecat.length + 1 }];
  }

  export function toggleValue() {
    // Ändere den Wert im Store
    owntypecreated = !owntypecreated;
    saved.update((value) => !value);
  }

  function addfutureemployeecat() {
    futureemployeecat = [
      ...futureemployeecat,
      { id: futureemployeecat.length + 1 },
    ];
  }
  let selectedButton = null;
  let selectedButtonRented = null;
  let isDisabledinitalcostbuttons = true;
  let isDisabledrentedbuttons = true;
  let showPopup = false;

  const selectButton = (button) => {
    selectedButton = button;
    isDisabledinitalcostbuttons = !isDisabledinitalcostbuttons;
  };

  const handleButtonClick = () => {
    if (selectedButtonRented === hpcselfrentedbuttons[0]) {
      values.rented = true;
    } else {
      values.rented = false;
    }
    values.salarygrades = employeecat;
    values.newemployees = futureemployeecat;
    saveInputValuesRP(values);
    goto("/transitionphase");
  };

  const selectButtonRented = (button) => {
    if (selectedButtonRented === hpcselfrentedbuttons[0]) {
      rented.update((value) => false);
      isDisabledrentedbuttons = true;
    } else {
      rented.update((value) => true);
      isDisabledrentedbuttons = false;
    }
    selectedButtonRented = button;
  };
  const initalcostbuttons = ["Yes", "No"];
  const hpcselfrentedbuttons = ["Rented", "Self operated"];
  onMount(() => {
    if (selectedButton === null) {
      selectedButton = initalcostbuttons[1];
      selectedButtonRented = hpcselfrentedbuttons[1];
      const inputFieldfixcosts = document.getElementById("inputfieldfixcosts");
      inputFieldfixcosts.disabled = isDisabledinitalcostbuttons;
      const inputFieldhpcrented = document.getElementById(
        "inputfieldhpcrented"
      );
      inputFieldhpcrented.disabled = isDisabledinitalcostbuttons;
    }
  });

  $: {
    console.log("emplyees are, ", employeecat);
  }
</script>

<main>
  <p style="margin: 80px 0px 0px 0px; font-size: 22px; font-weight: bold;">
    2.1 Full-time employee:
  </p>
  {#each employeecat as cat}
    <EmployeeCat bind:category={cat} />
  {/each}
  <button
    class="btn btn-accent shadow"
    style="border-radius: 28px; margin: 10px 10px 0px 15px;"
    on:click={addemployeecat}>Add salary grade</button
  >

  <p style="margin: 80px 0px 0px 0px; font-size: 22px; font-weight: bold;">
    2.2 Part-time employee:
  </p>
  {#each futureemployeecat as futurecat}
    <FutureEmployeeCat bind:futureemployee={futurecat} />
  {/each}
  <button
    class="btn btn-accent shadow"
    style="border-radius: 28px; margin: 10px 10px 0px 15px;"
    on:click={addfutureemployeecat}>Add part-time salary grade</button
  >

  <p style="margin: 80px 0px 0px 0px; font-size: 22px; font-weight: bold;">
    2.3 How would you estimate the travel cost and the regarding CO2 emissions
    for the Project?
  </p>
  <div>
    <div class="join" style="margin: 10px 15px 0px 15px;">
      <input
        type="number"
        placeholder="Type here"
        style="margin: 8px 0px 0px 0px;"
        class="input input-bordered input-sm w-full max-w-xs"
        bind:value={values.travelcost}
      />
      <p style="margin: 10px 10px 0px 5px;">€</p>
    </div>
  </div>
  <div>
    <div class="join" style="margin: 10px 15px 0px 15px;">
      <input
        type="number"
        placeholder="Type here"
        style="margin: 8px 0px 0px 0px;"
        class="input input-bordered input-sm w-full max-w-xs"
        bind:value={values.travelcostC02}
      />
      <p style="margin: 10px 10px 0px 5px; white-space: nowrap;">CO2 tons</p>
    </div>
  </div>
  <p style="margin: 80px 0px 0px 0px; font-size: 22px; font-weight: bold;">
    2.4 How would you estimate the costs for events?
  </p>
  <div>
    <div class="join" style="margin: 10px 15px 0px 15px;">
      <input
        type="number"
        placeholder="Type here"
        style="margin: 8px 0px 0px 0px;"
        class="input input-bordered input-sm w-full max-w-xs"
        bind:value={values.eventcosts}
      />
      <p style="margin: 10px 10px 0px 5px;">€</p>
    </div>
  </div>

  <p style="margin: 80px 0px 0px 0px; font-size: 22px; font-weight: bold;">
    2.5 How many core hours does each employee spend with dynamic resources?
  </p>
  <div>
    <div class="join" style="margin: 10px 15px 0px 15px;">
      <input
        type="number"
        placeholder="Type here"
        style="margin: 8px 0px 0px 0px;"
        class="input input-bordered input-sm w-full max-w-xs"
        bind:value={values.corehours}
      />
      <p style="margin: 10px 10px 0px 5px;">hours/month</p>
    </div>
  </div>

  <p style="margin: 80px 0px 0px 0px; font-size: 22px; font-weight: bold;">
    2.6 Is the HPC system(s) rented or operated by the project itself?
  </p>
  <div class="join" style="margin: 10px 15px 0px 15px;">
    {#each hpcselfrentedbuttons as button}
      <button
        class="{selectedButtonRented === button
          ? 'btn btn-primary text-white'
          : 'btn btn-accent'} shadow"
        style="border-radius: 28px; margin: 0px 10px 0px 0px;"
        on:click={() => selectButtonRented(button)}>{button}</button
      >
    {/each}
  </div>
  <div>
    <div class="join" style="margin: 10px 15px 0px 15px;">
      <p style="margin: 10px 5px 0px 0px; white-space: nowrap;">
        if rented, what are the rental costs each month?
      </p>
      <input
        type="number"
        id="inputfieldhpcrented"
        placeholder="Type here"
        style="margin: 8px 0px 0px 0px;"
        class="input input-bordered input-sm w-full max-w-xs"
        disabled={isDisabledrentedbuttons}
        bind:value={values.rentalcost}
      />
      <p style="margin: 10px 10px 0px 5px;">€/month</p>
    </div>
  </div>
  <p style="margin: 80px 0px 0px 0px; font-size: 22px; font-weight: bold;">
    2.7 Were there any other costs you wanna add?
  </p>
  <div class="join" style="margin: 10px 15px 0px 15px;">
    {#each initalcostbuttons as button}
      <button
        class="{selectedButton === button
          ? 'btn btn-primary text-white'
          : 'btn btn-accent'} shadow"
        style="border-radius: 28px; margin: 0px 10px 0px 0px;"
        on:click={() => selectButton(button)}>{button}</button
      >
    {/each}
  </div>
  <div>
    <div class="join" style="margin: 10px 15px 0px 15px;">
      <p style="margin: 10px 5px 0px 0px; white-space: nowrap;">
        If so, how much were they estimated to be?
      </p>
      <input
        type="number"
        id="inputfieldfixcosts"
        placeholder="Type here"
        style="margin: 8px 0px 0px 0px;"
        class="input input-bordered input-sm w-full max-w-xs"
        disabled={isDisabledinitalcostbuttons}
        bind:value={values.initialfixcost}
      />
      <p style="margin: 10px 10px 0px 5px;">€</p>
    </div>
  </div>
  <p style="margin: 80px 0px 0px 0px; font-size: 22px; font-weight: bold;">
    2.8 Choose your HPC System you did use for your research:
  </p>
  <div>
    {#if !$saved}
      <button on:click={() => (showPopup = true)}>
        <div class="own-type-block">
          <img
            src={Image}
            style="height: 50px; width: 50px; margin: 0px 0px 20px 0px; "
            alt="Circle"
          />
          <p style="color: #0065BD;">create your own type of HPC System</p>
        </div>
      </button>
    {:else}
      <div class="text-block">
        <div>
          <ul style="font-weight: bold;">
            {#if !$rented}
              <li>Initialcosts of the System: {$owntype.initialcost}€</li>
              <li>Runnungcosts of the System: {$owntype.runningcosts}€</li>
            {/if}
            <li>Energy Costs in Watthours: {$owntype.energycost}Watt/hours</li>
            <li>Runtime of the System: {$owntype.runtimesys} years</li>
            <li>
              System Power Consumption in Watt: {$owntype.powerconsumption} Watt
            </li>
            <li>
              Possible Corehours of the System: {$owntype.corehourssys} hours
            </li>
            <li>{$owntype.numberofsystems} Systems are used</li>
          </ul>
        </div>
      </div>
    {/if}
  </div>
  <PopUp bind:showPopup />
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
  }
  .grid-container {
    display: flex;
    display: grid;
    grid-template-columns: repeat(4, 18%);
    align-items: top;
    justify-content: center;
    text-align: center;
    gap: 4%; /* Optional, fügt etwas Abstand zwischen den Textblöcken hinzu */
  }
  ul {
    list-style-type: disc;
    margin-left: 20px;
  }
  li {
    margin-bottom: 20px;
  }

  .text-block {
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    margin-left: 20px;
    justify-content: center;
    align-items: left;
    width: 500px;
    border: 2px solid #0065bd; /* Farblicher Rahmen */
    padding: 10px; /* Optional, fügt etwas Abstand zum Inhalt hinzu */
    text-align: left; /* Zentriert den Text horizontal */
    border-radius: 20px;
    flex: 1;
    flex-direction: column;
  }
  .own-type-block {
    display: flex;
    width: 350px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 250px;
    margin-top: 20px;
    margin-left: 20px;
    border: 2px dashed #0065bd; /* Farblicher Rahmen */
    padding: 10px; /* Optional, fügt etwas Abstand zum Inhalt hinzu */
    text-align: center; /* Zentriert den Text horizontal */
    border-radius: 20px;
    flex: 1;
  }

  .own-type-block:hover {
    background-color: #dce4ee;
    border: 2px dashed #043b87;
  }

  .bottom-right-button {
    margin-top: 100px;
    position: absolute;
    right: 10%;
    min-width: 350px;
    font-weight: bold;
    margin-bottom: 20px;
  }
</style>
