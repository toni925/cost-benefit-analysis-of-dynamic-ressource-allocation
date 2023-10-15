<script>
  export let futureemployee = {
    value1: "",
    value2: "",
    value3: "",
    value4: "",
  };
</script>

<div>
  <div class="join" style="margin: 10px 15px 0px 15px;">
    <input
      type="number"
      style="margin: 8px 0px 0px 0px; width: 80px; text-align: center;"
      class="input input-bordered input-sm w-full max-w-xs"
      bind:value={futureemployee.value1}
    />
    <p style="margin: 10px 10px 0px 5px; white-space: nowrap;">
      people with a salary of
    </p>
    <input
      type="number"
      placeholder="Type here"
      style="margin: 8px 0px 0px 0px;"
      class="input input-bordered input-sm w-full max-w-xs"
      bind:value={futureemployee.value2}
    />
    <p style="margin: 10px 10px 0px 5px; white-space: nowrap;">
      €/months starting
    </p>
    <input
      type="number"
      style="margin: 8px 0px 0px 0px; width: 80px; text-align: center;"
      class="input input-bordered input-sm w-full max-w-xs"
      bind:value={futureemployee.value3}
    />
    <p style="margin: 10px 10px 0px 5px; white-space: nowrap;">
      months after the start of the project and ending in month
    </p>
    <input
      type="number"
      min={futureemployee.value3}
      style="margin: 8px 0px 0px 0px; width: 80px; text-align: center;"
      class="input input-bordered input-sm w-full max-w-xs"
      bind:value={futureemployee.value4}
    />
  </div>
</div>
