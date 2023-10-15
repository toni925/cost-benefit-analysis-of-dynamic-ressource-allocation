<script>
  export let category = {
    value1: "",
    value2: "",
  };

</script>

<div>
  <div class="join" style="margin: 10px 15px 0px 15px;">
    <input
      type="number"
      placeholder="Type here"
      style="margin: 8px 0px 0px 0px;"
      class="input input-bordered input-sm w-full max-w-xs"
      bind:value={category.value1}
    />
    <p style="margin: 10px 10px 0px 5px; white-space: nowrap;">€/months with</p>
    <input
      type="number"
      placeholder="Type here"
      style="margin: 8px 0px 0px 0px;"
      class="input input-bordered input-sm w-full max-w-xs"
      bind:value={category.value2}
    />
    <p style="margin: 10px 10px 0px 5px; white-space: nowrap;">Employees</p>
  </div>
</div>
