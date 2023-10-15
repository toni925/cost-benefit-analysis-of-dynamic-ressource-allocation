<script>
    import Linearpicture from "/src/lib/images/linearpicture.png";
    import Exponentialpicture from "/src/lib/images/exponentialpicture.png";
    import Skurvepicture from "/src/lib/images/skurvepicture.png";
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import * as d3 from "d3";
    import { saveInputValuesTP } from "/Users/tonis/OneDrive/Desktop/Bachelorarbeit/bachelorproject/src/stores/model";

    let selectedButton4 = null;
    let isDisabledproductionready = true;
    let percentageStartPercent1 = 0;
    let percentageEndPercent1 = 100;
    let yearsEnd1 = 20;
    let x01 = 10;
    let eps = 0.01;
    let k1 = 0;
    let percentageStartPercent2 = 0;
    let percentageEndPercent2 = 100;
    let yearsEnd2 = 20;
    let x02 = 10;
    let k2 = 0;
    let percentageStartPercent3 = 1;
    let percentageEndPercent3 = 100;
    let yearsEnd3 = 20;
    let x03 = 10;
    let k3 = 0;
    let values = {};

    const margin = { top: 80, right: 40, bottom: 40, left: 100 };
    const width = 940 - margin.left - margin.right;
    const height = 520 - margin.top - margin.bottom;

    function FunctionScurve(
        x,
        percentageStartPercent,
        percentageEndPercent,
        yearsEnd,
        k,
        x0
    ) {
        percentageStartPercent = percentageStartPercent / 100; //  t = x0 - (1/k) * ln(a+e-y/y)
        percentageEndPercent = percentageEndPercent / 100;
        k =
            -Math.log((percentageEndPercent + eps) / percentageEndPercent - 1) /
            (yearsEnd - x0);
        return (x =
            (percentageEndPercent + eps) / (1 + Math.exp(-k * (x - x0))));
    }
    function FunctionScurvemffactor(
        x,
        percentageStartPercent,
        percentageEndPercent,
        yearsEnd,
        k,
        x0
    ) {
        percentageStartPercent = percentageStartPercent / 100;
        percentageEndPercent = percentageEndPercent / 100;
        k =
            -Math.log((percentageEndPercent + eps) / percentageEndPercent - 1) /
            (yearsEnd - x0);
        console.log(k);
        let xaddon =
            x0 -
            (1 / k) *
                Math.log(
                    (percentageEndPercent + eps - percentageStartPercent) /
                        percentageStartPercent
                );

        console.log(xaddon);
        return (x =
            (percentageEndPercent + eps) /
            (1 + Math.exp(-k * (x + xaddon - x0))));
    }
    const handleButtonClick = () => {
        values.startingpointAA = percentageStartPercent1;
        values.endingpointAA = percentageEndPercent1;
        values.timerAA = yearsEnd1;
        values.x0AA = x01;
        values.startingpointAS = percentageStartPercent2;
        values.endingpointAS = percentageEndPercent2;
        values.timerAS = yearsEnd2;
        values.x0AS = x02;
        values.startingpointMF = percentageStartPercent3;
        values.endingpointMF = percentageEndPercent3;
        values.timerMF = yearsEnd3;
        values.x0MF = x03;
        if (selectedButton4 === productionready[0]) {
            values.readytodeploy = "Yes";
        } else {
            values.readytodeploy = "No";
        }
        saveInputValuesTP(values);
        goto("/deploymentphase");
    };

    const productionready = ["Yes", "No"];

    onMount(() => {
        selectedButton4 = productionready[0];
        updateChart1();
        const percentageStartInput = document.getElementById("percentageStart");
        const percentageEndInput = document.getElementById("percentageEnd");
        const yearsEndInput = document.getElementById("yearsEnd");
        const x0Input = document.getElementById("x0");

        percentageStartInput.addEventListener("input", updateChart1);
        percentageEndInput.addEventListener("input", updateChart1);
        yearsEndInput.addEventListener("input", updateChart1);
        x0Input.addEventListener("input", () => {
            x01 = parseInt(x0Input.value);
            updateChart1();
        });
        updateChart2();
        const percentageStartInput2 =
            document.getElementById("percentageStart2");
        const percentageEndInput2 = document.getElementById("percentageEnd2");
        const yearsEndInput2 = document.getElementById("yearsEnd2");
        const x0Input2 = document.getElementById("x02");

        percentageStartInput2.addEventListener("input", updateChart2);
        percentageEndInput2.addEventListener("input", updateChart2);
        yearsEndInput2.addEventListener("input", updateChart2);
        x0Input2.addEventListener("input", () => {
            x02 = parseInt(x0Input2.value);
            updateChart2();
        });

        updateChart3();
        const percentageStartInput3 =
            document.getElementById("percentageStart3");
        const percentageEndInput3 = document.getElementById("percentageEnd3");
        const yearsEndInput3 = document.getElementById("yearsEnd3");
        const x0Input3 = document.getElementById("x03");

        percentageStartInput3.addEventListener("input", updateChart3);
        percentageEndInput3.addEventListener("input", updateChart3);
        yearsEndInput3.addEventListener("input", updateChart3);
        x0Input3.addEventListener("input", () => {
            x03 = parseInt(x0Input3.value);
            updateChart3();
        });
    });

    function updateChart1() {
        const svg = d3.select("#chart1");
        svg.selectAll("*").remove(); // Clear previous chart

        svg.append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        const integerRange = Math.floor(yearsEnd1);
        const numberOfPoints = integerRange * 4;

        const data = d3.range(numberOfPoints + 1).map((i) => ({
            year: (yearsEnd1 / numberOfPoints) * i,
            percentage: FunctionScurve(
                (yearsEnd1 / numberOfPoints) * i,
                percentageStartPercent1,
                percentageEndPercent1,
                yearsEnd1,
                k1,
                x01
            ),
        }));

        const xScale = d3
            .scaleLinear()
            .domain([0, yearsEnd1])
            .range([0, width]);

        const yScale = d3
            .scaleLinear()
            .domain([
                percentageStartPercent1 / 100,
                percentageEndPercent1 / 100,
            ])
            .range([height, 0]);

        const line = d3
            .line()
            .x((d) => xScale(d.year))
            .y((d) => yScale(d.percentage));

        svg.select("g")
            .append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 2)
            .attr("d", line);

        // x-Achse hinzufügen und beschriften
        svg.select("g")
            .append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(xScale).ticks(10).tickFormat(d3.format("d")))
            .append("text")
            .attr("x", width)
            .attr("y", 30)
            .attr("text-anchor", "end")
            .attr("fill", "black")
            .text("years");

        // Mark the selected year with a circle

        svg.select("g")
            .append("line")
            .attr("x1", xScale(x01))
            .attr("y1", yScale(0))
            .attr("x2", xScale(x01))
            .attr(
                "y2",
                yScale(
                    FunctionScurve(
                        x01,
                        percentageStartPercent1,
                        percentageEndPercent1,
                        yearsEnd1,
                        k1,
                        x01
                    )
                )
            )
            .attr("stroke", "blue")
            .attr("stroke-width", 2)
            .attr("stroke-dasharray", "4");

        // y-Achse hinzufügen und beschriften
        svg.select("g")
            .append("g")
            .call(d3.axisLeft(yScale).ticks(10))
            .append("text")
            .attr("x", 0)
            .attr("y", -30)
            .attr("text-anchor", "end")
            .attr("fill", "black")
            .text("adaption in percent");
    }

    function updateChart2() {
        const svg = d3.select("#chart2");
        svg.selectAll("*").remove(); // Clear previous chart

        svg.append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        const integerRange = Math.floor(yearsEnd2);
        const numberOfPoints = integerRange * 4;

        const data = d3.range(numberOfPoints + 1).map((i) => ({
            year: (yearsEnd2 / numberOfPoints) * i,
            percentage: FunctionScurve(
                (yearsEnd2 / numberOfPoints) * i,
                percentageStartPercent2,
                percentageEndPercent2,
                yearsEnd2,
                k2,
                x02
            ),
        }));

        const xScale = d3
            .scaleLinear()
            .domain([0, yearsEnd2])
            .range([0, width]);

        const yScale = d3
            .scaleLinear()
            .domain([
                percentageStartPercent2 / 100,
                percentageEndPercent2 / 100,
            ])
            .range([height, 0]);

        const line = d3
            .line()
            .x((d) => xScale(d.year))
            .y((d) => yScale(d.percentage));

        svg.select("g")
            .append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 2)
            .attr("d", line);

        // x-Achse hinzufügen und beschriften
        svg.select("g")
            .append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(xScale).ticks(10).tickFormat(d3.format("d")))
            .append("text")
            .attr("x", width)
            .attr("y", 30)
            .attr("text-anchor", "end")
            .attr("fill", "black")
            .text("years");

        // Mark the selected year with a circle

        svg.select("g")
            .append("line")
            .attr("x1", xScale(x02))
            .attr("y1", yScale(0))
            .attr("x2", xScale(x02))
            .attr(
                "y2",
                yScale(
                    FunctionScurve(
                        x02,
                        percentageStartPercent2,
                        percentageEndPercent2,
                        yearsEnd2,
                        k2,
                        x02
                    )
                )
            )
            .attr("stroke", "blue")
            .attr("stroke-width", 2)
            .attr("stroke-dasharray", "4");

        // y-Achse hinzufügen und beschriften
        svg.select("g")
            .append("g")
            .call(d3.axisLeft(yScale).ticks(10))
            .append("text")
            .attr("x", 0)
            .attr("y", -30)
            .attr("text-anchor", "end")
            .attr("fill", "black")
            .text("adaption in percent");
    }
    function updateChart3() {
        const svg = d3.select("#chart3");
        svg.selectAll("*").remove(); // Clear previous chart

        svg.append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        const integerRange = Math.floor(yearsEnd3);
        const numberOfPoints = integerRange * 4;

        const data = d3.range(numberOfPoints + 1).map((i) => ({
            year: (yearsEnd3 / numberOfPoints) * i,
            percentage: FunctionScurvemffactor(
                (yearsEnd3 / numberOfPoints) * i,
                percentageStartPercent3,
                percentageEndPercent3,
                yearsEnd3,
                k3,
                x03
            ),
        }));

        const xScale = d3
            .scaleLinear()
            .domain([0, yearsEnd3])
            .range([0, width]);

        const yScale = d3.scaleLinear().domain([0, 1]).range([height, 0]);

        const line = d3
            .line()
            .x((d) => xScale(d.year))
            .y((d) => yScale(d.percentage));

        svg.select("g")
            .append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 2)
            .attr("d", line);

        // x-Achse hinzufügen und beschriften
        svg.select("g")
            .append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(xScale).ticks(10).tickFormat(d3.format("d")))
            .append("text")
            .attr("x", width)
            .attr("y", 30)
            .attr("text-anchor", "end")
            .attr("fill", "black")
            .text("years");

        // Mark the selected year with a circle

        // y-Achse hinzufügen und beschriften
        svg.select("g")
            .append("g")
            .call(d3.axisLeft(yScale).ticks(10))
            .append("text")
            .attr("x", 0)
            .attr("y", -30)
            .attr("text-anchor", "end")
            .attr("fill", "black")
            .text("adaption in percent");
    }
</script>

<main>
    <p style="margin: 80px 0px 0px 0px; font-size: 22px; font-weight: bold;">
        3.1 Which function would best describe the adaption of the applications
        to dynamic ressources?
    </p>
    <p style="margin: 30px 15px 0px 15px; font-size: 18px; font-weight: bold;">
        Adjust the following parameters as you think it will realistically take
        place:
    </p>
    <div class="join" style="margin: 10px 15px 0px 15px;">
        <p style="margin: 10px 5px 0px 0px; white-space: nowrap;">
            estimated starting point at:
        </p>
        <input
            type="number"
            placeholder="Type here"
            style="margin: 8px 0px 0px 0px;"
            class="input input-bordered input-sm w-full max-w-xs"
            id="percentageStart"
            bind:value={percentageStartPercent1}
            min="0"
            max="100"
            step="1"
        />
        <p style="margin: 10px 10px 0px 5px;">%</p>
    </div>
    <div>
        <div class="join" style="margin: 10px 15px 0px 15px;">
            <p style="margin: 10px 11px 0px 0px; white-space: nowrap;">
                estimated ending point at:
            </p>
            <input
                type="number"
                placeholder="Type here"
                style="margin: 8px 0px 0px 0px;"
                class="input input-bordered input-sm w-full max-w-xs"
                id="percentageEnd"
                bind:value={percentageEndPercent1}
                min="0"
                max="100"
                step="1"
            />
            <p style="margin: 10px 10px 0px 5px;">%</p>
        </div>
    </div>
    <div>
        <div class="join" style="clear:both; margin: 10px 15px 0px 15px;">
            <p style="margin: 10px 21px 0px 0px; white-space: nowrap;">
                timer of adaption period:
            </p>
            <input
                type="number"
                placeholder="Type here"
                style="margin: 8px 0px 0px 0px;"
                class="input input-bordered input-sm w-full max-w-xs"
                id="yearsEnd"
                bind:value={yearsEnd1}
                min="0"
                step="1"
            />
            <p style="margin: 10px 10px 0px 5px;">years</p>
        </div>
    </div>
    <div>
        <div class="join" style="clear:both; margin: 10px 15px 0px 15px;">
            <p style="margin: 10px 144px 0px 0px; white-space: nowrap;">
                x0 is in:
            </p>
            <input
                type="number"
                placeholder="Type here"
                style="margin: 8px 0px 0px 0px;"
                class="input input-bordered input-sm w-full max-w-xs"
                id="x0"
                bind:value={x01}
                min="0"
                max={yearsEnd1}
                step="1"
            />
            <p style="margin: 10px 10px 0px 5px; white-space: nowrap;">years</p>
        </div>
    </div>
    <div id="chart1" />
    <p style="margin: 80px 0px 0px 0px; font-size: 22px; font-weight: bold;">
        3.2 Which function would best describe the adaption of the HPC systems
        to dynamic ressources?
    </p>
    <p style="margin: 30px 15px 0px 15px; font-size: 18px; font-weight: bold;">
        Adjust the following parameters as you think it will realistically take
        place:
    </p>
    <div class="join" style="margin: 30px 15px 0px 15px;">
        <p style="margin: 10px 5px 0px 0px; white-space: nowrap;">
            estimated starting point at:
        </p>
        <input
            type="number"
            placeholder="Type here"
            style="margin: 8px 0px 0px 0px;"
            class="input input-bordered input-sm w-full max-w-xs"
            id="percentageStart2"
            bind:value={percentageStartPercent2}
            min="0"
            max="100"
            step="1"
        />
        <p style="margin: 10px 10px 0px 5px;">%</p>
    </div>
    <div>
        <div class="join" style="margin: 10px 15px 0px 15px;">
            <p style="margin: 10px 11px 0px 0px; white-space: nowrap;">
                estimated ending point at:
            </p>
            <input
                type="number"
                placeholder="Type here"
                style="margin: 8px 0px 0px 0px;"
                class="input input-bordered input-sm w-full max-w-xs"
                id="percentageEnd2"
                bind:value={percentageEndPercent2}
                min="0"
                max="100"
                step="1"
            />
            <p style="margin: 10px 10px 0px 5px;">%</p>
        </div>
    </div>
    <div>
        <div class="join" style="clear:both; margin: 10px 15px 0px 15px;">
            <p style="margin: 10px 21px 0px 0px; white-space: nowrap;">
                timer of adaption period:
            </p>
            <input
                type="number"
                placeholder="Type here"
                style="margin: 8px 0px 0px 0px;"
                class="input input-bordered input-sm w-full max-w-xs"
                id="yearsEnd2"
                bind:value={yearsEnd2}
                min="0"
                step="1"
            />
            <p style="margin: 10px 10px 0px 5px;">years</p>
        </div>
    </div>
    <div class="join" style="clear:both; margin: 10px 15px 0px 15px;">
        <p style="margin: 10px 144px 0px 0px; white-space: nowrap;">
            x0 is in:
        </p>
        <input
            type="number"
            placeholder="Type here"
            style="margin: 8px 0px 0px 0px;"
            class="input input-bordered input-sm w-full max-w-xs"
            id="x02"
            bind:value={x02}
            min="0"
            max={yearsEnd2}
            step="1"
        />
        <p style="margin: 10px 10px 0px 5px; white-space: nowrap;">years</p>
    </div>
    <div id="chart2" />
    <p style="margin: 80px 0px 0px 0px; font-size: 22px; font-weight: bold;">
        3.3 Which function would best describe the Maturity factor (How does the
        technology improve over time)?
    </p>
    <p style="margin: 30px 15px 0px 15px; font-size: 18px; font-weight: bold;">
        Adjust the following parameters as you think it will realistically take
        place:
    </p>
    <div class="join" style="margin: 30px 15px 0px 15px;">
        <p style="margin: 10px 5px 0px 0px; white-space: nowrap;">
            estimated starting point at:
        </p>
        <input
            type="number"
            placeholder="Type here"
            style="margin: 8px 0px 0px 0px;"
            class="input input-bordered input-sm w-full max-w-xs"
            id="percentageStart3"
            bind:value={percentageStartPercent3}
            min="0"
            max="100"
            step="1"
        />
        <p style="margin: 10px 10px 0px 5px;">%</p>
    </div>
    <div>
        <div class="join" style="margin: 10px 15px 0px 15px;">
            <p style="margin: 10px 11px 0px 0px; white-space: nowrap;">
                estimated ending point at:
            </p>
            <input
                type="number"
                placeholder="Type here"
                style="margin: 8px 0px 0px 0px;"
                class="input input-bordered input-sm w-full max-w-xs"
                id="percentageEnd3"
                bind:value={percentageEndPercent3}
                min="0"
                max="100"
                step="1"
            />
            <p style="margin: 10px 10px 0px 5px;">%</p>
        </div>
    </div>
    <div>
        <div class="join" style="clear:both; margin: 10px 15px 0px 15px;">
            <p style="margin: 10px 21px 0px 0px; white-space: nowrap;">
                timer of adaption period:
            </p>
            <input
                type="number"
                placeholder="Type here"
                style="margin: 8px 0px 0px 0px;"
                class="input input-bordered input-sm w-full max-w-xs"
                id="yearsEnd3"
                bind:value={yearsEnd3}
                min="0"
                step="1"
            />
            <p style="margin: 10px 10px 0px 5px;">years</p>
        </div>
    </div>
    <div class="join" style="clear:both; margin: 10px 15px 0px 15px;">
        <p style="margin: 10px 144px 0px 0px; white-space: nowrap;">
            x0 is in:
        </p>
        <input
            type="number"
            placeholder="Type here"
            style="margin: 8px 0px 0px 0px;"
            class="input input-bordered input-sm w-full max-w-xs"
            id="x03"
            bind:value={x03}
            min="0"
            max={yearsEnd3}
            step="1"
        />
        <p style="margin: 10px 10px 0px 5px; white-space: nowrap;">years</p>
    </div>
    <div id="chart3" />
    <p style="margin: 80px 0px 0px 0px; font-size: 22px; font-weight: bold;">
        3.4 On how many systems will the project estimated be deployed?
    </p>
    <div class="join" style="clear:both; margin: 10px 15px 0px 15px;">
        <input
            type="number"
            id="my-input"
            placeholder="Type here"
            style="margin: 8px 0px 0px 0px;"
            class="input input-bordered input-sm w-full max-w-xs"
            bind:value={values.deploymentcount}
        />
        <p style="margin: 10px 10px 0px 5px;">Systems</p>
    </div>
    <p style="margin: 80px 0px 0px 0px; font-size: 22px; font-weight: bold;">
        3.5 How would you estimate the maturity costs of this technology?
    </p>
    <div class="join" style="clear:both; margin: 10px 15px 0px 15px;">
        <input
            type="number"
            id="my-input"
            placeholder="Type here"
            style="margin: 8px 0px 0px 0px;"
            class="input input-bordered input-sm w-full max-w-xs"
            bind:value={values.moneyleft}
        />
        <p style="margin: 10px 10px 0px 5px;">€</p>
    </div>
    <p style="margin: 80px 0px 0px 0px; font-size: 22px; font-weight: bold;">
        3.6 What are the costs to deploy your project on one system?
    </p>
    <div class="join" style="clear:both; margin: 10px 15px 0px 15px;">
        <input
            type="number"
            id="my-input"
            placeholder="Type here"
            style="margin: 8px 0px 0px 0px;"
            class="input input-bordered input-sm w-full max-w-xs"
            bind:value={values.deploymentcost}
        />
        <p style="margin: 10px 10px 0px 5px;">€</p>
    </div>
    <p style="margin: 80px 0px 0px 0px; font-size: 22px; font-weight: bold;">
        3.7 What are the costs to change one application on these systems?
    </p>
    <div class="join" style="clear:both; margin: 10px 15px 0px 15px;">
        <input
            type="number"
            id="my-input"
            placeholder="Type here"
            style="margin: 8px 0px 0px 0px;"
            class="input input-bordered input-sm w-full max-w-xs"
            bind:value={values.applicationcost}
        />
        <p style="margin: 10px 10px 0px 5px;">€</p>
    </div>
    <p style="margin: 80px 0px 0px 0px; font-size: 22px; font-weight: bold;">
        3.8 How many applications are on these systems on average?
    </p>
    <div class="join" style="clear:both; margin: 10px 15px 0px 15px;">
        <input
            type="number"
            id="my-input"
            placeholder="Type here"
            style="margin: 8px 0px 0px 0px;"
            class="input input-bordered input-sm w-full max-w-xs"
            bind:value={values.applicationsonsystem}
        />
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
        /* Flexbox-Layout verwenden */
    }
    button {
        min-width: 120px;
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
