<script>
    /** @type {import('./$types').PageData} */
    import { goto } from "$app/navigation";
    import { saveInputValuesDP } from "/Users/tonis/OneDrive/Desktop/Bachelorarbeit/bachelorproject/src/stores/model";

    const handleButtonClick = () => {
        values.costsaving = costsaving;
        saveInputValuesDP(values);
        goto("/costbenefitanalyse");
    };

    let values = {};
    let costsaving;
</script>

<main>
    <p style="margin: 30px 0px 0px 0px; font-size: 24px; font-weight: bold;">
        Benefit Factors
    </p>
    <p style="margin: 20px 0px 0px 0px; font-size: 22px; font-weight: bold;">
        4.1 How high would you estimate the cost savings?
    </p>
    <div>
        <div class="join" style="margin: 10px 15px 0px 15px;">
            <input
                type="number"
                placeholder="Type here"
                style="margin: 8px 0px 0px 0px;"
                class="input input-bordered input-sm w-full max-w-xs"
                bind:value={costsaving}
            />
            <p style="margin: 10px 10px 0px 5px;">%</p>
        </div>
    </div>
    <button
        class="text-white px-20 btn btn-primary bottom-right-button"
        style="font-size: 18px;"
        on:click={handleButtonClick}>Generate Model</button
    >
</main>

<style>
    .bottom-right-button {
        margin-top: 100px;
        position: absolute;
        right: 10%;
        min-width: 350px;
        font-weight: bold;
        margin-bottom: 20px;
    }
    main {
        margin-top: 2%;
        margin-left: 2%;
        margin-right: 2%;
        padding-bottom: 10%;
    }
</style>
