<script>
    import { generalprojectinformationset } from "/Users/tonis/OneDrive/Desktop/Bachelorarbeit/bachelorproject/src/stores/model";
    import { researchphaseset } from "/Users/tonis/OneDrive/Desktop/Bachelorarbeit/bachelorproject/src/stores/model";
    import { transitionphaseset } from "/Users/tonis/OneDrive/Desktop/Bachelorarbeit/bachelorproject/src/stores/model";
    import { deploymentphaseset } from "/Users/tonis/OneDrive/Desktop/Bachelorarbeit/bachelorproject/src/stores/model";
    import { owntype } from "/Users/tonis/OneDrive/Desktop/Bachelorarbeit/bachelorproject/src/stores/owntypestore";
    import katex from "katex";
    import * as d3 from "d3";
    import { onMount } from "svelte";
    import { construct_svelte_component } from "svelte/internal";

    let duration;
    let durationhours;
    let durationmax;
    let budget;
    let employees;
    let initialfixcost;
    let initialfixcostmax;
    let travelcost;
    let travelcostmax;
    let travelcostC02;
    let travelcostC02max;
    let rented;
    let rentalcost;
    let rentalcostmax;
    let corehours;
    let corehoursduration;
    let corehoursmax;
    let startprozentAA;
    let endprozentAA;
    let x0AA;
    let x0AAh;
    let x0AAmax;
    let timerAA;
    let timerAAmax;
    let startprozentAS;
    let endprozentAS;
    let x0AS;
    let x0ASh;
    let x0ASmax;
    let timerAS;
    let timerASmax;
    let startprozentMF;
    let endprozentMF;
    let x0MF;
    let x0MFh;
    let x0MFmax;
    let timerMF;
    let timerMFmax;
    let deploymentcount;
    let deploymentcountmax;
    let readytodeploy;
    let moneyleft;
    let moneyleftmax;
    let deploymentcost;
    let deploymentcostmax;
    let applicationcost;
    let applicationcostmax;
    let applicationsonsystem;
    let applicationsonsystemmax;
    let categories;
    let newemployees;
    let eventcosts;
    let eventcostmax;
    let initialcost;
    let initialcostmax;
    let runningcosts;
    let runningcostsmax;
    let energycost;
    let energycostmax;
    let powerconsumption;
    let powerconsumptionmax;
    let runtimesys;
    let runtimesyshours;
    let runtimesysmax;
    let corehourssys;
    let corehourssysmax;
    let numberofsystems;
    let numberofsystemsmax;
    let numberofmonths;
    let numberofmonthsmax;
    let sumcat = 0;
    let sumemployee = 0;
    let sumptemployee = 0;
    let sumnewcat = 0;
    let costsaving;
    let costsavingdeci;
    let tbenefit = 30;
    let tbenefithours = tbenefit * 8760;
    let eps = 0.01;
    let rentalfee;
    let costresearch = 0;
    let costresearchco2 = 0;
    let costbenefit = 0;
    let costtotal = 0;
    let timetotal = 0;
    let timer = 0;
    let timerco2 = 0;
    let timercostbenefitefficent = 0;
    let co2benefitvalue = 0;
    let yValuescost = [];
    let yValuescostco2 = [];
    let yValuesbencost = [];
    let xValuescost = [];
    let yValuesben = [];
    let xValuesben = [];
    let BInt = [];
    let BIntco2 = [];
    const formatierungsoptionen = {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    };

    generalprojectinformationset.subscribe((value) => {
        if (value.addtime !== undefined) {
            duration = parseInt(value.duration) + parseInt(value.addtime);
        } else {
            duration = value.duration;
        }
        budget = value.budget;
        durationhours = duration * 730;
        durationmax = duration * 2;
    });

    researchphaseset.subscribe((value) => {
        employees = value.employees;
        if (value.initialfixcost !== undefined) {
            initialfixcost = value.initialfixcost;
            initialfixcostmax = initialfixcost * 2;
        }
        categories = value.salarygrades;
        calculateallemployeesalary();
        newemployees = value.newemployees;
        calculatenewemployeesalary();
        travelcost = value.travelcost;
        travelcostmax = travelcost * 2;
        travelcostC02 = value.travelcostC02;
        travelcostC02max = travelcostC02 * 2;
        rented = value.rented;
        console.log(rented);
        if (rented === true) {
            rentalcost = value.rentalcost;
            rentalfee = rentalcost * duration;
            rentalcostmax = value.rentalcost * 2;
        }
        corehours = value.corehours;
        corehoursduration = corehours * duration;
        corehoursmax = corehours * 2;
        eventcosts = value.eventcosts;
        eventcostmax = eventcosts * 2;
    });

    owntype.subscribe((value) => {
        if (rented === false) {
            initialcost = value.initialcost;
            rentalfee = initialcost;
        }
        initialcostmax = initialcost * 2;
        energycost = value.energycost;
        console.log(energycost);
        energycostmax = energycost * 2;
        powerconsumption = value.powerconsumption;
        powerconsumptionmax = powerconsumption * 2;
        runtimesys = value.runtimesys;
        runtimesyshours = runtimesys * 8760;
        runtimesysmax = runtimesys * 2;
        corehourssys = value.corehourssys;
        corehourssysmax = corehourssys * 2;
        numberofsystems = value.numberofsystems;
        numberofsystemsmax = numberofsystems * 2;
        numberofmonths = value.numberofmonths;
        numberofmonthsmax = numberofmonths * 2;
        runningcosts = value.runningcosts;
        runningcostsmax = runningcosts * 2;
    });

    transitionphaseset.subscribe((value) => {
        startprozentAA = value.startingpointAA;
        endprozentAA = value.endingpointAA;
        x0AA = value.x0AA;
        x0AAh = x0AA * 8760;
        x0AAmax = x0AA * 2;
        timerAA = value.timerAA;
        timerAAmax = timerAA * 2;
        startprozentAS = value.startingpointAS;
        endprozentAS = value.endingpointAS;
        x0AS = value.x0AS;
        x0ASh = x0AS * 8760;
        x0ASmax = x0AS * 2;
        timerAS = value.timerAS;
        timerASmax = timerAS * 2;
        startprozentMF = value.startingpointMF;
        endprozentMF = value.endingpointMF;
        x0MF = value.x0MF;
        x0MFmax = x0MF * 2;
        x0MFh = x0MF * 8760;
        timerMF = value.timerMF;
        timerMFmax = timerMF * 2;
        deploymentcount = value.deploymentcount;
        deploymentcountmax = deploymentcount * 2;
        deploymentcost = value.deploymentcost;
        deploymentcostmax = deploymentcost * 2;
        applicationcost = value.applicationcost;
        applicationcostmax = applicationcost * 2;
        applicationsonsystem = value.applicationsonsystem;
        applicationsonsystemmax = applicationsonsystem * 2;
        readytodeploy = value.readytodeploy;
        moneyleft = value.moneyleft;
        moneyleftmax = moneyleft * 2;
    });

    deploymentphaseset.subscribe((value) => {
        costsaving = value.costsaving;
        costsavingdeci = costsaving / 100;
    });

    const latexFormulak = `k = -\\frac{\\ln\\left(\\frac{{a_{end}} + \\varepsilon}{{a_{end}}} -1\\right)}{{D - x_0}}`;

    const latexFormulaabc = `a,b,d(t) = \\frac{{a_{end}} + \\varepsilon}{{1 + e^{-k \\cdot (t - x_0)}}}`;

    const latexFormulac = `c = 1`;

    $: latexFormulaa = `a(t) = \\frac{{1.0} + \\varepsilon}{{1 + e^{-k \\cdot (t - ${x0MFh})}}}`;

    $: latexFormulab = `b(t) = \\frac{{1.0} + \\varepsilon}{{1 + e^{-k \\cdot (t - ${x0ASh})}}}`;

    $: latexFormulad = `d(t) = \\frac{{1.0} + \\varepsilon}{{1 + e^{-k \\cdot (t - ${x0AAh})}}}`;

    $: latexFormula = `Cost(t) = 
    \\int_0^{${durationhours}h}\\frac{1}{${durationhours}h} \\cdot (\\left(\\frac{${sumemployee} \\cdot ${corehoursduration}h + \\frac{${sumptemployee}h}{${durationhours}h} \\cdot ${corehoursduration}h}{${corehourssys} \\cdot ${runtimesyshours}h}\\right) \\cdot (${initialcost}€ + ${runningcosts}€ \\cdot (${runtimesys} \\cdot 12) + ${energycost}€/kWh \\cdot ${powerconsumption}kW \\cdot ${runtimesyshours}h) +
    ${sumcat}€ + ${sumnewcat}€ + ${travelcost}€ + ${eventcosts}€ + X) dt
  `;
    const latexFormulawithoutvalues = `Cost(t) = 
    \\int_0^{T_{Project}} \\frac{1}{T_{Project}} \\cdot (\\left(\\frac{N_{emp} \\cdot CH_{emp} + \\frac{\\sum_0^{N_{emppt}}T_{emppt}}{T_{Project}} \\cdot CH_{emp}}{Cores \\cdot T_{sys}}\\right) \\cdot (C_{init} + C_{running} \\cdot T_{Sys} + C_{energy} \\cdot P_{sys} \\cdot T_{sys}) +
    \\sum_0^{N_{emp}} S \\cdot T_{Project} + \\sum_0^{N_{emppt}} S \\cdot T_{emppt} + C_{Travel} + C_{Event} + X) dt
  `;
    const latexFormulaco2withoutvalues = `Cost(t) = 
    \\int_0^{T_{Project}} \\frac{1}{T_{Project}} \\cdot (\\left(\\frac{N_{emp} \\cdot CH_{emp} + \\frac{\\sum_0^{N_{emppt}}T_{emppt}}{T_{Project}} \\cdot CH_{emp}}{Cores \\cdot T_{sys}}\\right) \\cdot (C_{Carbon dioxide - emission factor per kilowatt hour} \\cdot P_{sys} \\cdot T_{sys}) + N_{CO2 Tons for Travel}) dt
  `;
    const latexFormulaco2 = `Cost(t) = 
    \\int_0^{${durationhours}h}\\frac{1}{${durationhours}h} \\cdot (\\left(\\frac{${sumemployee} \\cdot ${corehoursduration}h + \\frac{${sumptemployee}h}{${durationhours}h} \\cdot ${corehoursduration}h}{${corehourssys} \\cdot ${runtimesyshours}h}\\right) \\cdot (0.000434t/kWh \\cdot ${powerconsumption}kW \\cdot ${runtimesyshours}h) + ${travelcostC02}t) dt
  `;
    const latexFormulabenefitcostwithoutvalues =
        "CostBenefit(t) = C_{Maturity} \\cdot \\frac{(a(t) - a(t_{start}))}{(a(t_{end}) - a(t_{start}))} + C_{Sysadapt} \\cdot N_{Systems} \\cdot (b(t)) + C_{Appadapt} \\cdot N_{Applicationen} \\cdot N_{Systems} \\cdot (d(t))";

    $: latexFormulabenefitcost = `CostBenefit(t) = ${moneyleft}€ \\cdot \\frac{(a(t) - a(0))}{(a(${tbenefithours}) - a(0))} + ${deploymentcost}€ \\cdot ${deploymentcount} \\cdot (b(t)) + ${applicationcost}€ \\cdot ${applicationsonsystem} \\cdot ${deploymentcount} \\cdot (d(t))`;

    const latexFormulabenefitwithoutvalues =
        "B(t) = \\int_0^{T} C_{energy} \\cdot P_{sys} \\cdot R_{max} \\cdot a(t) \\cdot (N_{Systems} \\cdot b(t)) \\cdot d(t)) dt";

    $: latexFormulabenefit = `B(t) = \\int_0^{${tbenefithours}} ${energycost}€/kWh \\cdot ${powerconsumption}kW \\cdot ${costsavingdeci} \\cdot a(t) \\cdot (${deploymentcount} \\cdot b(t)) \\cdot c(d(t)) dt`;

    const latexFormulaTotal = `total(t) = \begin{cases} 
    \text{cost}(t) & \text{if } 0 \leq t \leq t_{\text{research}} \\
    \text{benefit}(t) & \text{if } t > t_{\text{research}}
    \end{cases}`;

    // Definiere die Grenzen des Integrals
    const a = 0;
    const b = tbenefithours;
    const width = 700;
    const height = 350;
    const widthtotal = 1000;
    const heighttotal = 500;
    timetotal = tbenefithours + durationhours;

    let integralValue = costinresearch(durationhours);
    const schritte = 100;

    // Berechne das Integral und speichere die Werte
    /*
    const integralWerte = [];
    for (let i = a; i <= b; i += (b - a) / schritte) {
        const integral = berechneIntegral(benfit, a, i, schritte);
        integralWerte.push(integral);
    }
    */
    const grid_spacing = 1000;
    const steps_per_interval = 50;
    const integration_method = "test";
    function simpsonsRule(a, b, f) {
        return ((b - a) / 6) * (f(a) + 4 * f((a + b) / 2) + f(b));
    }

    function trapezoidRule(a, b, f) {
        return (b - a) * 0.5 * (f(a) + f(b));
    }

    function rectangleRule(a, b, f) {
        return (b - a) * f((a + b) / 2);
    }

    console.log(timerAA);
    console.log(timerAS);
    console.log(timerMF);
    const methodDict = {
        simpsons: simpsonsRule,
        trapezoid: trapezoidRule,
        rectangle: rectangleRule,
    };

    function integral(numSteps, start, end, integrator, f) {
        const deltaT = (end - start) / numSteps;
        let res = 0;
        for (let i = 0; i < numSteps + 1; i++) {
            res += integrator(start + i * deltaT, start + (i + 1) * deltaT, f);
        }
        return res;
    }

    // Calculates the integral of f for each xVal, using numSteps of 'integrator' per subinterval
    function integralOverTime(xVals, numSteps, integrator, f) {
        const fInt = methodDict[integrator];
        const y = [0];
        for (let i = 0; i < xVals.length - 1; i++) {
            if (integrator === "quad") {
                y.push(
                    y[y.length - 1] +
                        trapezoidRule(xVals[i], xVals[i + 1], f)[0]
                );
            } else {
                y.push(
                    y[y.length - 1] +
                        integral(
                            numSteps,
                            xVals[i],
                            xVals[i + 1],
                            trapezoidRule,
                            f
                        )
                );
            }
        }
        return y;
    }
    // const yValuesIntegral = integralValues;

    // Anzahl der Schritte für die diskrete Annäherung
    const margin = { top: 100, right: 40, bottom: 40, left: 100 };

    // Berechne das Integral und speichere die Werte
    /* const integralWerte = [];
    for (let i = a; i <= b; i += (b - a) / schritte) {
        const integral = berechneIntegral(costinresearch, a, i, schritte);
        integralWerte.push(integral);
    }
    */

    onMount(() => {
        const formulaElement = document.getElementById("math-formula");
        katex.render(latexFormula, formulaElement, {
            throwOnError: false, // Fehlertoleranz, wenn LaTeX-Code ungültig ist "math-formula-benefit-wv
            displayMode: true, // Zeige die Formel im Display-Modus (zentriert und abgesetzt)
        });
        const formulaElement2 = document.getElementById("math-formula-wv");
        katex.render(latexFormulawithoutvalues, formulaElement2, {
            throwOnError: false, // Fehlertoleranz, wenn LaTeX-Code ungültig ist  math-formula-benefit
            displayMode: true, // Zeige die Formel im Display-Modus (zentriert und abgesetzt)
        });

        const formulaElement3 = document.getElementById(
            "math-formula-benefit-wv"
        );
        katex.render(latexFormulabenefitwithoutvalues, formulaElement3, {
            throwOnError: false, // Fehlertoleranz, wenn LaTeX-Code ungültig ist
            displayMode: true, // Zeige die Formel im Display-Modus (zentriert und abgesetzt)
        });

        const formulaElement4 = document.getElementById("math-formula-benefit");
        katex.render(latexFormulabenefit, formulaElement4, {
            throwOnError: false, // Fehlertoleranz, wenn LaTeX-Code ungültig ist
            displayMode: true, // Zeige die Formel im Display-Modus (zentriert und abgesetzt)
        });

        const formulaElement5 = document.getElementById("math-formula-k");
        katex.render(latexFormulak, formulaElement5, {
            throwOnError: false, // Fehlertoleranz, wenn LaTeX-Code ungültig ist
            displayMode: true, // Zeige die Formel im Display-Modus (zentriert und abgesetzt)
        });
        const formulaElement6 = document.getElementById("math-formula-abc");
        katex.render(latexFormulaabc, formulaElement6, {
            throwOnError: false, // Fehlertoleranz, wenn LaTeX-Code ungültig ist
            displayMode: true, // Zeige die Formel im Display-Modus (zentriert und abgesetzt)
        });
        const formulaElement7 = document.getElementById("math-formula-a");
        katex.render(latexFormulaa, formulaElement7, {
            throwOnError: false, // Fehlertoleranz, wenn LaTeX-Code ungültig ist
            displayMode: true, // Zeige die Formel im Display-Modus (zentriert und abgesetzt)
        });
        const formulaElement8 = document.getElementById("math-formula-b");
        katex.render(latexFormulab, formulaElement8, {
            throwOnError: false, // Fehlertoleranz, wenn LaTeX-Code ungültig ist
            displayMode: true, // Zeige die Formel im Display-Modus (zentriert und abgesetzt)
        });
        const formulaElement9 = document.getElementById("math-formula-d");
        katex.render(latexFormulad, formulaElement9, {
            throwOnError: false, // Fehlertoleranz, wenn LaTeX-Code ungültig ist
            displayMode: true, // Zeige die Formel im Display-Modus (zentriert und abgesetzt)
        });
        const formulaElement10 = document.getElementById("math-formula-c");
        katex.render(latexFormulac, formulaElement10, {
            throwOnError: false, // Fehlertoleranz, wenn LaTeX-Code ungültig ist
            displayMode: true, // Zeige die Formel im Display-Modus (zentriert und abgesetzt)
        });
        const formulaElement11 = document.getElementById(
            "math-formula-cost-benefit"
        );
        katex.render(latexFormulabenefitcostwithoutvalues, formulaElement11, {
            throwOnError: false, // Fehlertoleranz, wenn LaTeX-Code ungültig ist
            displayMode: true, // Zeige die Formel im Display-Modus (zentriert und abgesetzt)
        });
        const formulaElement12 = document.getElementById("math-cost-benefit");
        katex.render(latexFormulabenefitcost, formulaElement12, {
            throwOnError: false, // Fehlertoleranz, wenn LaTeX-Code ungültig ist
            displayMode: true, // Zeige die Formel im Display-Modus (zentriert und abgesetzt)
        });
        const formulaElement13 = document.getElementById("math-total");
        // katex.render(latexFormulaTotal, formulaElement13, {
        //     throwOnError: false, // Fehlertoleranz, wenn LaTeX-Code ungültig ist
        //     displayMode: true, // Zeige die Formel im Display-Modus (zentriert und abgesetzt)
        // });
        const formulaElement14 = document.getElementById("math-formula-wvco2");
        katex.render(latexFormulaco2withoutvalues, formulaElement14, {
            throwOnError: false, // Fehlertoleranz, wenn LaTeX-Code ungültig ist  math-formula-benefit
            displayMode: true, // Zeige die Formel im Display-Modus (zentriert und abgesetzt)
        });
        const formulaElement15 = document.getElementById("math-formula-co2");
        katex.render(latexFormulaco2, formulaElement15, {
            throwOnError: false, // Fehlertoleranz, wenn LaTeX-Code ungültig ist  math-formula-benefit
            displayMode: true, // Zeige die Formel im Display-Modus (zentriert und abgesetzt)
        });

        updatecostchart();
        updatecostchartco2();
        updatebenefitcostchart();
        updatebenefitchart();
        updateintegralchart();
        updateintegralchartco2();
        costtotal = costresearch + costbenefit;
        timercostbenefitefficent = BInt[BInt.length - 1];
        co2benefitvalue = BIntco2[BIntco2.length - 1];
        updatetotalchart();
        updatetotalchartco2();
         console.log((endprozentAA/100));
    });

    function updatecostchart() {
        xValuescost = d3.range(0, durationhours, 10);
        yValuescost = xValuescost.map(costinresearch);
        costresearch = Math.max(...yValuescost);
        const svg = d3.select("#plot-container");
        svg.selectAll("*").remove(); // Clear previous chart
        svg.append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        const xScale = d3
            .scaleLinear()
            .domain([0, durationhours])
            .range([0, width]);

        const yScale = d3
            .scaleLinear()
            .domain([0, d3.max(yValuescost)])
            .range([height, 0]);

        // Linienfunktion erstellen
        const line = d3
            .line()
            .x((d, i) => xScale(xValuescost[i]))
            .y((d) => yScale(d));

        /* const integralLine = d3
            .line()
            .x((d, i) => xScale(xValuesIntegral[i]))
            .y((d, i) => yScale(yValuesIntegral[i]));

        // Pfad für das Integral erstellen und Daten binden
        svg.append("path")
            .datum(yValuesIntegral)
            .attr("fill", "none")
            .attr("stroke", "red") // Farbe der Integral-Linie
            .attr("stroke-width", 2) // Breite der Integral-Linie
            .attr("d", integralLine);

            */
        svg.select("g")
            .append("path")
            .datum(yValuescost)
            .attr("fill", "none")
            .attr("stroke", "red")
            .attr("stroke-width", 2)
            .attr("d", line);

        // x-Achse hinzufügen und beschriften
        svg.select("g")
            .append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(xScale).ticks(10).tickFormat(d3.format("d")))
            .append("text")
            .attr("x", width + 40)
            .attr("y", 30)
            .attr("text-anchor", "end")
            .attr("fill", "black")
            .style("font-size", "16px")
            .text("time in h");

        // y-Achse hinzufügen und beschriften
        svg.select("g")
            .append("g")
            .call(d3.axisLeft(yScale).ticks(10))
            .append("text")
            .attr("x", 0)
            .attr("y", -30)
            .attr("text-anchor", "end")
            .attr("fill", "black")
            .style("font-size", "16px")
            .text("costs in €");
    }

    function updatecostchartco2() {
        yValuescostco2 = xValuescost.map(costco2);
        costresearchco2 = Math.max(...yValuescostco2);
        const svg = d3.select("#plot-container7");
        svg.selectAll("*").remove(); // Clear previous chart
        svg.append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        const xScale = d3
            .scaleLinear()
            .domain([0, durationhours])
            .range([0, width]);

        const yScale = d3
            .scaleLinear()
            .domain([0, d3.max(yValuescostco2)])
            .range([height, 0]);

        // Linienfunktion erstellen
        const line = d3
            .line()
            .x((d, i) => xScale(xValuescost[i]))
            .y((d) => yScale(d));

        /* const integralLine = d3
            .line()
            .x((d, i) => xScale(xValuesIntegral[i]))
            .y((d, i) => yScale(yValuesIntegral[i]));

        // Pfad für das Integral erstellen und Daten binden
        svg.append("path")
            .datum(yValuesIntegral)
            .attr("fill", "none")
            .attr("stroke", "red") // Farbe der Integral-Linie
            .attr("stroke-width", 2) // Breite der Integral-Linie
            .attr("d", integralLine);

            */
        svg.select("g")
            .append("path")
            .datum(yValuescostco2)
            .attr("fill", "none")
            .attr("stroke", "red")
            .attr("stroke-width", 2)
            .attr("d", line);

        // x-Achse hinzufügen und beschriften
        svg.select("g")
            .append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(xScale).ticks(10).tickFormat(d3.format("d")))
            .append("text")
            .attr("x", width + 40)
            .attr("y", 30)
            .attr("text-anchor", "end")
            .attr("fill", "black")
            .style("font-size", "16px")
            .text("time in h");

        // y-Achse hinzufügen und beschriften
        svg.select("g")
            .append("g")
            .call(d3.axisLeft(yScale).ticks(10))
            .append("text")
            .attr("x", 40)
            .attr("y", -30)
            .attr("text-anchor", "end")
            .attr("fill", "black")
            .style("font-size", "16px")
            .text("CO2 emissions in t");
    }

    function updatebenefitfunction() {
        tbenefithours = tbenefit * 8760;
        x0AAh = x0AA * 8760;
        x0ASh = x0AS * 8760;
        x0MFh = x0MF * 8760;
        costsavingdeci = costsaving / 100;
        console.log(costsavingdeci);
        const formulaElement7 = document.getElementById("math-formula-a");
        katex.render(latexFormulaa, formulaElement7, {
            throwOnError: false, // Fehlertoleranz, wenn LaTeX-Code ungültig ist
            displayMode: true, // Zeige die Formel im Display-Modus (zentriert und abgesetzt)
        });
        const formulaElement8 = document.getElementById("math-formula-b");
        katex.render(latexFormulab, formulaElement8, {
            throwOnError: false, // Fehlertoleranz, wenn LaTeX-Code ungültig ist
            displayMode: true, // Zeige die Formel im Display-Modus (zentriert und abgesetzt)
        });
        const formulaElement9 = document.getElementById("math-formula-d");
        katex.render(latexFormulad, formulaElement9, {
            throwOnError: false, // Fehlertoleranz, wenn LaTeX-Code ungültig ist
            displayMode: true, // Zeige die Formel im Display-Modus (zentriert und abgesetzt)
        });
        const formulaElement12 = document.getElementById("math-cost-benefit");
        katex.render(latexFormulabenefitcost, formulaElement12, {
            throwOnError: false, // Fehlertoleranz, wenn LaTeX-Code ungültig ist
            displayMode: true, // Zeige die Formel im Display-Modus (zentriert und abgesetzt)
        });
        const formulaElement4 = document.getElementById("math-formula-benefit");
        katex.render(
            latexFormulabenefit,
            formulaElement4,
            {
                throwOnError: false, // Fehlertoleranz, wenn LaTeX-Code ungültig ist
                displayMode: true, // Zeige die Formel im Display-Modus (zentriert und abgesetzt)
            },
            function () {
                // Dieser Code wird aufgerufen, sobald die Formel gerendert ist.
                formulaElement4.textContent =
                    formulaElement4.textContent.replace(
                        "{costsavingdeci}",
                        costsavingdeci
                    );
            }
        );

        updatebenefitcostchart();
        updatebenefitchart();
        costtotal = costresearch + costbenefit;
        updateintegralchart();
        timercostbenefitefficent = BInt[BInt.length - 1];
        updatetotalchart();
    }
    function updatebenefitcostchart() {
        console.log("test");
        const xValuesbencost = d3.range(0, tbenefithours, 10);
        yValuesbencost = xValuesbencost.map(benefitcost);
        costbenefit = Math.max(...yValuesbencost);
        const svg = d3.select("#plot-container4");
        svg.selectAll("*").remove(); // Clear previous chart
        svg.append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        const xScale = d3
            .scaleLinear()
            .domain([0, tbenefithours])
            .range([0, width]);

        const yScale = d3
            .scaleLinear()
            .domain([0, d3.max(yValuesbencost)]) // .domain([0, d3.max([...yValuesben, ...integralWerte])])
            .range([height, 0]);

        // Linienfunktion erstellen
        const line = d3
            .line()
            .x((d, i) => xScale(xValuesbencost[i]))
            .y((d) => yScale(d));

        // Pfad für das Integral erstellen und Daten binden
        svg.select("g")
            .append("path")
            .datum(yValuesbencost)
            .attr("fill", "none")
            .attr("stroke", "red") // Farbe der Integral-Linie
            .attr("stroke-width", 2) // Breite der Integral-Linie
            .attr("d", line);

        // x-Achse hinzufügen und beschriften
        svg.select("g")
            .append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(xScale).ticks(10).tickFormat(d3.format("d")))
            .append("text")
            .attr("x", width + 40)
            .attr("y", 30)
            .attr("text-anchor", "end")
            .attr("fill", "black")
            .style("font-size", "16px")
            .text("time in h");

        // y-Achse hinzufügen und beschriften
        svg.select("g")
            .append("g")
            .call(d3.axisLeft(yScale).ticks(10))
            .append("text")
            .attr("x", 0)
            .attr("y", -30)
            .attr("text-anchor", "end")
            .attr("fill", "black")
            .style("font-size", "16px")
            .text("cost in €");
    }

    function updatebenefitchart() {
        xValuesben = d3.range(0, tbenefithours, 10);
        yValuesben = xValuesben.map(benfit);
        const svg = d3.select("#plot-container2");
        svg.selectAll("*").remove(); // Clear previous chart
        svg.append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        const xScale = d3
            .scaleLinear()
            .domain([0, tbenefithours])
            .range([0, width]);

        const yScale = d3
            .scaleLinear()
            .domain([0, d3.max(yValuesben)]) // .domain([0, d3.max([...yValuesben, ...integralWerte])])
            .range([height, 0]);

        // Linienfunktion erstellen
        const line = d3
            .line()
            .x((d, i) => xScale(xValuesben[i]))
            .y((d) => yScale(d));

        // Pfad für das Integral erstellen und Daten binden
        svg.select("g")
            .append("path")
            .datum(yValuesben)
            .attr("fill", "none")
            .attr("stroke", "steelblue") // Farbe der Integral-Linie
            .attr("stroke-width", 2) // Breite der Integral-Linie
            .attr("d", line);

        // x-Achse hinzufügen und beschriften
        svg.select("g")
            .append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(xScale).ticks(10).tickFormat(d3.format("d")))
            .append("text")
            .attr("x", width + 40)
            .attr("y", 30)
            .attr("text-anchor", "end")
            .attr("fill", "black")
            .style("font-size", "16px")
            .text("time in h");

        // y-Achse hinzufügen und beschriften
        svg.select("g")
            .append("g")
            .call(d3.axisLeft(yScale).ticks(10))
            .append("text")
            .attr("x", 0)
            .attr("y", -30)
            .attr("text-anchor", "end")
            .attr("fill", "black")
            .style("font-size", "16px")
            .text("benefit in €");
    }

    function updatetotalchart() {
        timer = 0;
        const xValuestotal = d3.range(0, timetotal, 10);
        const yValuestotal = xValuestotal.map(total);
        const svg = d3.select("#plot-container5");
        svg.selectAll("*").remove(); // Clear previous chart
        svg.append("svg")
            .attr("width", widthtotal + 60 + 60)
            .attr("height", heighttotal + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        const xScale = d3
            .scaleLinear()
            .domain([0, timetotal])
            .range([0, widthtotal]);

        const yScale = d3
            .scaleLinear()
            .domain([-costtotal, d3.max(yValuestotal)]) // .domain([0, d3.max([...yValuesben, ...integralWerte])])
            .range([heighttotal, 0]);

        // Linienfunktion erstellen
        const line = d3
            .line()
            .x((d, i) => xScale(xValuestotal[i]))
            .y((d) => yScale(d));

        const x1 = 0; // Startpunkt auf der x-Achse
        const x2 = widthtotal; // Endpunkt auf der x-Achse (Breite des SVG-Elements)
        const y = yScale(0); // Hier ist die horizontale Linie in der Mitte des SVG-Elements

        // Erstellen Sie die horizontale Linie

        // Pfad für das Integral erstellen und Daten binden
        svg.select("g")
            .append("path")
            .datum(yValuestotal)
            .attr("fill", "none")
            .attr("stroke", "steelblue") // Farbe der Integral-Linie
            .attr("stroke-width", 2) // Breite der Integral-Linie
            .attr("d", line);

        // x-Achse hinzufügen und beschriften
        svg.select("g")
            .append("g")
            .attr("transform", `translate(0,${heighttotal})`)
            .call(d3.axisBottom(xScale).ticks(10).tickFormat(d3.format("d")))
            .append("text")
            .attr("x", widthtotal + 10)
            .attr("y", 30)
            .attr("text-anchor", "end")
            .attr("fill", "black")
            .style("font-size", "16px")
            .text("time in h");

        // y-Achse hinzufügen und beschriften
        svg.select("g")
            .append("g")
            .call(d3.axisLeft(yScale).ticks(10))
            .append("text")
            .attr("x", 0)
            .attr("y", -30)
            .attr("text-anchor", "end")
            .attr("fill", "black")
            .style("font-size", "16px")
            .text("benefit in €");

        svg.select("g")
            .append("line")
            .attr("x1", x1)
            .attr("x2", x2)
            .attr("y1", y)
            .attr("y2", y)
            .attr("stroke", "red")
            .attr("stroke-width", 2)
            .attr("stroke-dasharray", "4");
    }

    function updatetotalchartco2() {
        timerco2 = 0;
        const xValuestotal = d3.range(0, timetotal, 10);
        const yValuestotalco2 = xValuestotal.map(totalco2);
        const svg = d3.select("#plot-container9");
        svg.selectAll("*").remove(); // Clear previous chart
        svg.append("svg")
            .attr("width", widthtotal + 60 + 60)
            .attr("height", heighttotal + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        const xScale = d3
            .scaleLinear()
            .domain([0, timetotal])
            .range([0, widthtotal]);

        const yScale = d3
            .scaleLinear()
            .domain([-costresearchco2, d3.max(yValuestotalco2)]) // .domain([0, d3.max([...yValuesben, ...integralWerte])])
            .range([heighttotal, 0]);

        // Linienfunktion erstellen
        const line = d3
            .line()
            .x((d, i) => xScale(xValuestotal[i]))
            .y((d) => yScale(d));

        const x1 = 0; // Startpunkt auf der x-Achse
        const x2 = widthtotal; // Endpunkt auf der x-Achse (Breite des SVG-Elements)
        const y = yScale(0); // Hier ist die horizontale Linie in der Mitte des SVG-Elements

        // Erstellen Sie die horizontale Linie

        // Pfad für das Integral erstellen und Daten binden
        svg.select("g")
            .append("path")
            .datum(yValuestotalco2)
            .attr("fill", "none")
            .attr("stroke", "steelblue") // Farbe der Integral-Linie
            .attr("stroke-width", 2) // Breite der Integral-Linie
            .attr("d", line);

        // x-Achse hinzufügen und beschriften
        svg.select("g")
            .append("g")
            .attr("transform", `translate(0,${heighttotal})`)
            .call(d3.axisBottom(xScale).ticks(10).tickFormat(d3.format("d")))
            .append("text")
            .attr("x", widthtotal + 10)
            .attr("y", 30)
            .attr("text-anchor", "end")
            .attr("fill", "black")
            .style("font-size", "16px")
            .text("time in h");

        // y-Achse hinzufügen und beschriften
        svg.select("g")
            .append("g")
            .call(d3.axisLeft(yScale).ticks(10))
            .append("text")
            .attr("x", 30)
            .attr("y", -30)
            .attr("text-anchor", "end")
            .attr("fill", "black")
            .style("font-size", "16px")
            .text("benefit in CO2 t");

        svg.select("g")
            .append("line")
            .attr("x1", x1)
            .attr("x2", x2)
            .attr("y1", y)
            .attr("y2", y)
            .attr("stroke", "red")
            .attr("stroke-width", 2)
            .attr("stroke-dasharray", "4");
    }

    function updateintegralchart() {
        BInt = integralOverTime(
            xValuesben,
            steps_per_interval,
            integration_method,
            benfit
        );
        const svg = d3.select("#plot-container3");
        svg.selectAll("*").remove(); // Clear previous chart
        svg.append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        const xScale = d3
            .scaleLinear()
            .domain([0, tbenefithours])
            .range([0, width]);

        const yScale = d3
            .scaleLinear()
            .domain([0, d3.max(BInt)]) // .domain([0, d3.max([...yValuesben, ...integralWerte])])
            .range([height, 0]);

        // Linienfunktion erstellen
        const line = d3
            .line()
            .x((d, i) => xScale(xValuesben[i]))
            .y((d) => yScale(d));

        // Pfad für das Integral erstellen und Daten binden
        svg.select("g")
            .append("path")
            .datum(BInt)
            .attr("fill", "none")
            .attr("stroke", "steelblue") // Farbe der Integral-Linie
            .attr("stroke-width", 2) // Breite der Integral-Linie
            .attr("d", line);

        // x-Achse hinzufügen und beschriften
        svg.select("g")
            .append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(xScale).ticks(10).tickFormat(d3.format("d")))
            .append("text")
            .attr("x", width + 40)
            .attr("y", 30)
            .attr("text-anchor", "end")
            .attr("fill", "black")
            .style("font-size", "16px")
            .text("time in h");

        // y-Achse hinzufügen und beschriften
        svg.select("g")
            .append("g")
            .call(d3.axisLeft(yScale).ticks(10))
            .append("text")
            .attr("x", 0)
            .attr("y", -30)
            .attr("text-anchor", "end")
            .attr("fill", "black")
            .style("font-size", "16px")
            .text("benefit in €");
    }
    function updateintegralchartco2() {
        BIntco2 = integralOverTime(
            xValuesben,
            steps_per_interval,
            integration_method,
            co2benefit
        );
        const svg = d3.select("#plot-container8");
        svg.selectAll("*").remove(); // Clear previous chart
        svg.append("svg")
            .attr("width", width + 100 + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        const xScale = d3
            .scaleLinear()
            .domain([0, tbenefithours])
            .range([0, width]);

        const yScale = d3
            .scaleLinear()
            .domain([0, d3.max(BIntco2)]) // .domain([0, d3.max([...yValuesben, ...integralWerte])])
            .range([height, 0]);

        // Linienfunktion erstellen
        const line = d3
            .line()
            .x((d, i) => xScale(xValuesben[i]))
            .y((d) => yScale(d));

        // Pfad für das Integral erstellen und Daten binden
        svg.select("g")
            .append("path")
            .datum(BIntco2)
            .attr("fill", "none")
            .attr("stroke", "steelblue") // Farbe der Integral-Linie
            .attr("stroke-width", 2) // Breite der Integral-Linie
            .attr("d", line);

        // x-Achse hinzufügen und beschriften
        svg.select("g")
            .append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(xScale).ticks(10).tickFormat(d3.format("d")))
            .append("text")
            .attr("x", width + 40)
            .attr("y", 30)
            .attr("text-anchor", "end")
            .attr("fill", "black")
            .style("font-size", "16px")
            .text("time in h");

        // y-Achse hinzufügen und beschriften
        svg.select("g")
            .append("g")
            .call(d3.axisLeft(yScale).ticks(10))
            .append("text")
            .attr("x", 40)
            .attr("y", -30)
            .attr("text-anchor", "end")
            .attr("fill", "black")
            .style("font-size", "16px")
            .text("benefit in CO2 t");
    }

    function updatecostfunction() {
        corehoursduration = corehours * duration;
        durationhours = duration * 730;
        runtimesyshours = runtimesys * 8760;
        const formulaElement = document.getElementById("math-formula");
        katex.render(latexFormula, formulaElement, {
            throwOnError: false, // Fehlertoleranz, wenn LaTeX-Code ungültig ist
            displayMode: true, // Zeige die Formel im Display-Modus (zentriert und abgesetzt)
        });
        updatecostchart();
        integralValue = costinresearch(durationhours);
        costtotal = costresearch + costbenefit;
        timercostbenefitefficent = BInt[BInt.length - 1];
        updatetotalchart();
    }

    function updateall() {
        if (rented === true) {
            rentalfee = rentalcost * duration;
        } else {
            rentalfee = initialcost;
        }
        corehoursduration = corehours * duration;
        durationhours = duration * 730;
        runtimesyshours = runtimesys * 8760;
        tbenefithours = tbenefit * 8760;
        x0AAh = x0AA * 8760;
        x0ASh = x0AS * 8760;
        x0MFh = x0MF * 8760;
        costsavingdeci = costsaving / 100;
        const formulaElement = document.getElementById("math-formula");
        katex.render(latexFormula, formulaElement, {
            throwOnError: false, // Fehlertoleranz, wenn LaTeX-Code ungültig ist
            displayMode: true, // Zeige die Formel im Display-Modus (zentriert und abgesetzt)
        });
        const formulaElement4 = document.getElementById("math-formula-benefit");
        katex.render(latexFormulabenefit, formulaElement4, {
            throwOnError: false, // Fehlertoleranz, wenn LaTeX-Code ungültig ist
            displayMode: true, // Zeige die Formel im Display-Modus (zentriert und abgesetzt)
        });
        const formulaElement7 = document.getElementById("math-formula-a");
        katex.render(latexFormulaa, formulaElement7, {
            throwOnError: false, // Fehlertoleranz, wenn LaTeX-Code ungültig ist
            displayMode: true, // Zeige die Formel im Display-Modus (zentriert und abgesetzt)
        });
        const formulaElement8 = document.getElementById("math-formula-b");
        katex.render(latexFormulab, formulaElement8, {
            throwOnError: false, // Fehlertoleranz, wenn LaTeX-Code ungültig ist
            displayMode: true, // Zeige die Formel im Display-Modus (zentriert und abgesetzt)
        });
        const formulaElement9 = document.getElementById("math-formula-d");
        katex.render(latexFormulad, formulaElement9, {
            throwOnError: false, // Fehlertoleranz, wenn LaTeX-Code ungültig ist
            displayMode: true, // Zeige die Formel im Display-Modus (zentriert und abgesetzt)
        });
        const formulaElement12 = document.getElementById("math-cost-benefit");
        katex.render(latexFormulabenefitcost, formulaElement12, {
            throwOnError: false, // Fehlertoleranz, wenn LaTeX-Code ungültig ist
            displayMode: true, // Zeige die Formel im Display-Modus (zentriert und abgesetzt)
        });
        updatecostchart();
        integralValue = costinresearch(durationhours);
        costtotal = costresearch + costbenefit;
        timercostbenefitefficent = BInt[BInt.length - 1];
        updatetotalchart();
        updatebenefitcostchart();
        updatebenefitchart();
        costtotal = costresearch + costbenefit;
        updateintegralchart();
        timercostbenefitefficent = BInt[BInt.length - 1];
        updatetotalchart();
    }
    function calculateallemployeesalary() {
        for (let i = 0; i < categories.length; i++) {
            sumcat += categories[i].value1 * categories[i].value2 * duration;
            sumemployee += categories[i].value2;
        }
    }
    function calculatenewemployeesalary() {
        if (typeof newemployees[0].value2 === "undefined") {
            console.log("Die Variable ist undefined.");
            sumptemployee = 0;
            sumnewcat = 0;
        } else {
            console.log("Die Variable ist definiert.");
            for (let i = 0; i < newemployees.length; i++) {
                sumptemployee +=
                    newemployees[i].value4 - newemployees[i].value3;
                sumnewcat +=
                    newemployees[i].value1 *
                    newemployees[i].value2 *
                    (newemployees[i].value4 - newemployees[i].value3);
            }
            sumptemployee = sumptemployee * 730;
        }
    }

    function costinresearch(t) {
        // Hier deine Formel ohne Integral
        if (rented === true) {
            rentalfee = rentalcost * duration;
        } else {
            rentalfee =
                ((sumemployee * corehoursduration * duration +
                    (sumptemployee / durationhours) *
                        corehoursduration *
                        duration) /
                    (corehourssys * runtimesyshours)) *
                (initialcost +
                    runningcosts * (runtimesys * 12) +
                    energycost * powerconsumption * runtimesyshours);
        }
        return (
            t *
            ((1 / durationhours) *
                (rentalfee + sumcat + sumnewcat + travelcost + eventcosts))
        );
    }
    function benfit(t) {
        let k1 = -Math.log(((endprozentAA/100) + eps) / (endprozentAA/100) - 1) / (timerAA * 8760 - x0AAh);
        let k2 = -Math.log((1 + eps) / 1 - 1) / (timerAS * 8760 - x0ASh);
        let k3 = -Math.log((1 + eps) / 1 - 1) / (timerMF * 8760 - x0MFh);
        let taddon =
            x0MFh -
            (1 / k3) *
                Math.log(
                    (1 + eps - startprozentMF / 100) / (startprozentMF / 100)
                );
        let a = (1 + eps) / (1 + Math.exp(-k3 * (t + taddon - x0MFh)));
        let b = (1 + eps) / (1 + Math.exp(-k2 * (t - x0ASh)));
        let d = ((endprozentAA/100) + eps) / (1 + Math.exp(-k1 * (t - x0AAh)));
        
        return (
            energycost *
            powerconsumption *
            costsavingdeci *
            a *
            (deploymentcount * b) *
            d
        );
    }

    function benefitcost(t) {
        let k1 = -Math.log(((endprozentAA/100) + eps) / (endprozentAA/100) - 1) / (timerAA * 8760 - x0AAh);
        let k2 = -Math.log((1 + eps) / 1 - 1) / (timerAS * 8760 - x0ASh);
        let k3 = -Math.log((1 + eps) / 1 - 1) / (timerMF * 8760 - x0MFh);
        let taddon =
            x0MFh -
            (1 / k3) *
                Math.log(
                    (1 + eps - startprozentMF / 100) / (startprozentMF / 100)
                );
        let a = (1 + eps) / (1 + Math.exp(-k3 * (t + taddon - x0MFh)));
        let a0 = (1 + eps) / (1 + Math.exp(-k3 * (0 + taddon - x0MFh)));
        let aend =
            (1 + eps) / (1 + Math.exp(-k3 * (tbenefithours + taddon - x0MFh)));
        let b = (1 + eps) / (1 + Math.exp(-k2 * (t - x0ASh)));
        let d = ((endprozentAA/100) + eps) / (1 + Math.exp(-k1 * (t - x0AAh)));
        return (
            moneyleft * ((a - a0) / (aend - a0)) +
            deploymentcost * deploymentcount * b +
            applicationcost * applicationsonsystem * deploymentcount * d
        );
    }

    function total(t) {
        if (t < durationhours) {
            // return -costinresearch(t);
            return -yValuescost[t / 10];
        } else {
            let helper =
                BInt[t / 10 - durationhours / 10] -
                yValuesbencost[t / 10 - durationhours / 10] -
                integralValue;

            if (helper > 0) {
                if (timer == 0) {
                    timer = t / 8760;
                }
            }
            return helper;
        }
    }
    function totalco2(t) {
        if (t < durationhours) {
            // return -costinresearch(t);
            return -yValuescostco2[t / 10];
        } else {
            let helper = BIntco2[t / 10 - durationhours / 10] - costresearchco2;

            if (helper > 0) {
                if (timerco2 == 0) {
                    timerco2 = t / 8760;
                }
            }
            return helper;
        }
    }

    function costco2(t) {
        return (
            t *
            ((1 / durationhours) *
                (((sumemployee * corehoursduration * duration +
                    (sumptemployee / durationhours) *
                        corehoursduration *
                        duration) /
                    (corehourssys * runtimesyshours)) *
                    (0.000434 * powerconsumption * runtimesyshours) +
                    travelcostC02))
        );
    }
    function co2benefit(t) {
        let k1 = -Math.log(((endprozentAA/100) + eps) / (endprozentAA/100) - 1) / (timerAA * 8760 - x0AAh);
        let k2 = -Math.log((1 + eps) / 1 - 1) / (timerAS * 8760 - x0ASh);
        let k3 = -Math.log((1 + eps) / 1 - 1) / (timerMF * 8760 - x0MFh);
        let taddon =
            x0MFh -
            (1 / k3) *
                Math.log(
                    (1 + eps - startprozentMF / 100) / (startprozentMF / 100)
                );
        let a = (1 + eps) / (1 + Math.exp(-k3 * (t + taddon - x0MFh)));
        let b = (1 + eps) / (1 + Math.exp(-k2 * (t - x0ASh)));
        let d = ((endprozentAA/100) + eps) / (1 + Math.exp(-k1 * (t - x0AAh)));

        return (
            0.000434 *
            powerconsumption *
            costsavingdeci *
            a *
            (deploymentcount * b) *
            d
        );
    }

    // SVG-Element erstellen

    //\\int_0^{${durationhours}h}\\frac{1}{${durationhours}h} \\cdot \\left(\\frac{${sumemployee} \\cdot ${corehoursduration}h + \\frac{${sumptemployee}h}{${durationhours}h} \\cdot ${corehoursduration}h}{${corehourssys}h \\cdot ${runtimesyshours}h}\\right)
    // \\cdot (${initialcost}€ + ${energycost}W/h \\cdot ${powerconsumption}W \\cdot ${runtimesyshours}h) +
    //${sumcat}€ + ${sumnewcat}€ + ${travelcost}€ + (${travelcostC02}T \\cdot 30€) + ${eventcosts}€ + X dt
</script>

<div
    class="shadow"
    style="padding: 30px 0px 30px 0px; font-size: 24px; font-weight: bold; background-color:white; text-align:center;"
>
    <p>
        Cost Benefit Analysis of {$generalprojectinformationset.projectname}
    </p>
</div>
<main>
    <p style="margin: 30px 0px 0px 10px; font-size: 20px; font-weight: bold;">
        General Projekt Information
    </p>
    <div class="split-container1">
        <div class="half">
            <!-- Inhalt des ersten Untercontainers -->
            <p style="font-size: 16px; font-weight: bold;">
                Budget: {$generalprojectinformationset.budget}€
            </p>
            <p
                style="margin: 10px 0px 0px 0px; font-size: 16px; font-weight: bold;"
                id="durationstring"
            >
                Duration: {duration} months
            </p>
        </div>
        <div class="half">
            <!-- Inhalt des zweiten Untercontainers -->
            <input
                type="range"
                min="0"
                max={durationmax}
                bind:value={duration}
                on:input={updateall}
                class="range range-primary"
                style="width: 400px; margin: 28px 0px 0px 0px;"
            />
        </div>
    </div>
    <p style="margin: 30px 0px 0px 10px; font-size: 20px; font-weight: bold;">
        Configuration for Salaries, Infrastructure etc.
    </p>
    <div class="split-container2">
        <div class="half">
            <!-- Inhalt des ersten Untercontainers -->
            <p style="font-size: 18px; font-weight: bold;">
                Employee Categorys
            </p>
            <div class="horizontal-line" />
            <p style="font-size: 16px; font-weight: bold;">
                Fulltime Employee Categorys
            </p>
            {#each categories as category, index}
                <div>
                    <p>
                        Salary Category {index + 1}: Employees: {category.value2}
                        Salary: {category.value1}€
                    </p>
                </div>
            {/each}

            <div class="horizontal-line" />
            {#if typeof newemployees[0].value2 !== "undefined"}
                <p style="font-size: 16px; font-weight: bold;">
                    Parttime Employee Category
                </p>
                {#each newemployees as futureemployees, index}
                    <div>
                        <p>
                            Salary Category {index + 1}: Employees: {futureemployees.value1}
                            Salary: {futureemployees.value2}€ for {futureemployees.value4 -
                                futureemployees.value3} Months
                        </p>
                    </div>
                {/each}
                <div class="horizontal-line" />
            {/if}
            <p
                style="margin: 12px 0px 0px 0px; font-size: 16px; font-weight: bold;"
            >
                Other costs: {initialfixcost}€
            </p>
            <p
                style="margin: 12px 0px 0px 0px; font-size: 16px; font-weight: bold;"
            >
                Travelcost: {travelcost}€
            </p>
            <p
                style="margin: 12px 0px 0px 0px; font-size: 16px; font-weight: bold;"
            >
                CO2 in tons for Traveling: {travelcostC02}
            </p>
            <p
                style="margin: 12px 0px 0px 0px; font-size: 16px; font-weight: bold;"
            >
                Eventcost: {eventcosts}€
            </p>

            <p
                style="margin: 12px 0px 0px 0px; font-size: 16px; font-weight: bold;"
            >
                Corehours of each employee for dynamic Ressources: {corehours}h
            </p>

            <p
                style="margin: 12px 0px 0px 0px; font-size: 16px; font-weight: bold;"
            >
                {#if rented === true}
                    The testcluster(s) are rented and the rental fee is {rentalcost}€/month
                {:else}
                    The testcluster(s) are self operated
                {/if}
            </p>
            <div class="horizontal-line" />

            <p
                style="font-size: 18px; font-weight: bold; margin: 10px 0px 0px 0px;"
            >
                Cluster Configuration
            </p>

            {#if rented === false}
                <p
                    style="margin: 10px 0px 0px 0px; font-size: 16px; font-weight: bold;"
                >
                    Cluster Initial Costs: {initialcost}€
                </p>
            {/if}
            <p
                style="margin: 12px 0px 0px 0px; font-size: 16px; font-weight: bold;"
            >
                Cluster Energy Costs: {energycost} €/kWh
            </p>
            <p
                style="margin: 12px 0px 0px 0px; font-size: 16px; font-weight: bold;"
            >
                Cluster Power Consumption: {powerconsumption} Watt
            </p>
            <p
                style="margin: 12px 0px 0px 0px; font-size: 16px; font-weight: bold;"
            >
                Cluster Runtime: {runtimesys} years
            </p>
            <p
                style="margin: 12px 0px 0px 0px; font-size: 16px; font-weight: bold;"
            >
                Cluster Cores: {corehourssys}
            </p>
            <p
                style="margin: 12px 0px 6px 0px; font-size: 16px; font-weight: bold;"
            >
                Cluster Count: {numberofsystems}
            </p>
        </div>
        <div class="half">
            <!-- Inhalt des zweiten Untercontainers -->

            <div class="horizontal-line-extra2" />
            <div>
                <input
                    type="range"
                    min="0"
                    max={initialfixcostmax}
                    bind:value={initialfixcost}
                    on:input={updatecostfunction}
                    class="range range-primary"
                    style="width: 400px; margin: 7px 0px 0px 0px;"
                />
            </div>
            <div>
                <input
                    type="range"
                    min="0"
                    max={travelcostmax}
                    bind:value={travelcost}
                    on:input={updatecostfunction}
                    class="range range-primary"
                    style="width: 400px; margin: 7px 0px 0px 0px;"
                />
            </div>
            <div>
                <input
                    type="range"
                    min="0"
                    max={travelcostC02max}
                    bind:value={travelcostC02}
                    on:input={updatecostfunction}
                    class="range range-primary"
                    style="width: 400px; margin: 7px 0px 0px 0px;"
                />
            </div>
            <div>
                <input
                    type="range"
                    min="0"
                    max={eventcostmax}
                    bind:value={eventcosts}
                    on:input={updatecostfunction}
                    class="range range-primary"
                    style="width: 400px; margin: 7px 0px 0px 0px;"
                />
            </div>
            <div>
                <input
                    type="range"
                    min="0"
                    max={corehoursmax}
                    bind:value={corehours}
                    on:input={updatecostfunction}
                    class="range range-primary"
                    style="width: 400px; margin: 7px 0px 0px 0px;"
                />
            </div>

            {#if rented === true}
                <div>
                    <input
                        type="range"
                        min="0"
                        max={rentalcostmax}
                        bind:value={rentalcost}
                        on:input={updatecostfunction}
                        class="range range-primary"
                        style="width: 400px; margin: 7px 0px 0px 0px;"
                    />
                </div>
            {/if}

            <div class="horizontal-line-extra" />
            {#if rented === false}
                <div>
                    <input
                        type="range"
                        min="0"
                        max={initialcostmax}
                        bind:value={initialcost}
                        on:input={updatecostfunction}
                        class="range range-primary"
                        style="width: 400px; margin: 7px 0px 0px 0px;"
                    />
                </div>
            {/if}
            <div>
                <input
                    type="range"
                    min="0"
                    max="5"
                    bind:value={energycost}
                    on:input={updatecostfunction}
                    step="0.01"
                    class="range range-primary"
                    style="width: 400px; margin: 7px 0px 0px 0px;"
                />
            </div>
            <div>
                <input
                    type="range"
                    min="0"
                    max={powerconsumptionmax}
                    bind:value={powerconsumption}
                    on:input={updateall}
                    class="range range-primary"
                    style="width: 400px; margin: 7px 0px 0px 0px;"
                />
            </div>
            <div>
                <input
                    type="range"
                    min="0"
                    max={runtimesysmax}
                    bind:value={runtimesys}
                    on:input={updatecostfunction}
                    class="range range-primary"
                    style="width: 400px; margin: 7px 0px 0px 0px;"
                />
            </div>
            <div>
                <input
                    type="range"
                    min="0"
                    max={corehourssysmax}
                    bind:value={corehourssys}
                    on:input={updatecostfunction}
                    class="range range-primary"
                    style="width: 400px; margin: 7px 0px 0px 0px;"
                />
            </div>
            <div>
                <input
                    type="range"
                    min="0"
                    max={numberofsystemsmax}
                    bind:value={numberofsystems}
                    on:input={updatecostfunction}
                    class="range range-primary"
                    style="width: 400px; margin: 7px 0px 0px 0px;"
                />
            </div>
        </div>
    </div>
    <p style="margin: 30px 0px 0px 10px; font-size: 20px; font-weight: bold;">
        Function Settings for the Adaptions
    </p>
    <div class="split-container3">
        <div class="half">
            <!-- Inhalt des ersten Untercontainers -->
            <p
                style="margin: 4px 0px 0px 0px; font-size: 16px; font-weight: bold;"
            >
                Adaption of the Applications takes {timerAA} years
            </p>
            <p
                style="margin: 12px 0px 0px 0px; font-size: 16px; font-weight: bold;"
            >
                Starting at {startprozentAA} and ending at {endprozentAA} with x0
                in {x0AA} years
            </p>

            <p
                style="margin: 12px 0px 0px 0px; font-size: 16px; font-weight: bold;"
            >
                Adaption of the Systems takes {timerAS} years
            </p>
            <p
                style="margin: 12px 0px 0px 0px; font-size: 16px; font-weight: bold;"
            >
                Starting at {startprozentAS} and ending at {endprozentAS} with x0
                in {x0AS} years
            </p>

            <p
                style="margin: 12px 0px 0px 0px; font-size: 16px; font-weight: bold;"
            >
                The Maturity factor takes {timerMF} years
            </p>
            <p
                style="margin: 12px 0px 0px 0px; font-size: 16px; font-weight: bold;"
            >
                Starting at {startprozentMF} and ending at {endprozentMF} with x0
                in {x0MF} years
            </p>
            <p
                style="margin: 12px 0px 0px 0px; font-size: 16px; font-weight: bold;"
            >
                The project is gonna be deployed on {deploymentcount} systems
            </p>
            <p
                style="margin: 12px 0px 0px 0px; font-size: 16px; font-weight: bold;"
            >
                The deploymentcosts for one system are {deploymentcost}€
            </p>
            <p
                style="margin: 12px 0px 0px 0px; font-size: 16px; font-weight: bold;"
            >
                The cost for one application are {applicationcost}€
            </p>
            <p
                style="margin: 12px 0px 0px 0px; font-size: 16px; font-weight: bold;"
            >
                There are {applicationsonsystem} applications on average on a system
            </p>

            <p
                style="margin: 12px 0px 0px 0px; font-size: 16px; font-weight: bold;"
            >
                For the developement of this technology it is estimated that it
                will cost {moneyleft}
            </p>
        </div>
        <div class="half">
            <!-- Inhalt des zweiten Untercontainers -->
            <div>
                <input
                    type="range"
                    min="0"
                    max={timerAAmax}
                    bind:value={timerAA}
                    on:input={updatebenefitfunction}
                    class="range range-primary"
                    style="width: 400px; margin: 7px 0px 0px 0px;"
                />
            </div>
            <div>
                <input
                    type="range"
                    min="0"
                    max={x0AAmax}
                    bind:value={x0AA}
                    on:input={updatebenefitfunction}
                    class="range range-primary"
                    style="width: 400px; margin: 7px 0px 0px 0px;"
                />
            </div>
            <div>
                <input
                    type="range"
                    min="0"
                    max={timerASmax}
                    bind:value={timerAS}
                    on:input={updatebenefitfunction}
                    class="range range-primary"
                    style="width: 400px; margin: 7px 0px 0px 0px;"
                />
            </div>
            <div>
                <input
                    type="range"
                    min="0"
                    max={x0ASmax}
                    bind:value={x0AS}
                    on:input={updatebenefitfunction}
                    class="range range-primary"
                    style="width: 400px; margin: 7px 0px 0px 0px;"
                />
            </div>
            <div>
                <input
                    type="range"
                    min="0"
                    max={timerMFmax}
                    bind:value={timerMF}
                    on:input={updatebenefitfunction}
                    class="range range-primary"
                    style="width: 400px; margin: 7px 0px 0px 0px;"
                />
            </div>
            <div>
                <input
                    type="range"
                    min="0"
                    max={x0MFmax}
                    bind:value={x0MF}
                    on:input={updatebenefitfunction}
                    class="range range-primary"
                    style="width: 400px; margin: 7px 0px 0px 0px;"
                />
            </div>
            <div>
                <input
                    type="range"
                    min="0"
                    max={deploymentcountmax}
                    bind:value={deploymentcount}
                    on:input={updatebenefitfunction}
                    class="range range-primary"
                    style="width: 400px; margin: 7px 0px 0px 0px;"
                />
            </div>
            <div>
                <input
                    type="range"
                    min="0"
                    max={deploymentcostmax}
                    bind:value={deploymentcost}
                    on:input={updatebenefitfunction}
                    class="range range-primary"
                    style="width: 400px; margin: 7px 0px 0px 0px;"
                />
            </div>
            <div>
                <input
                    type="range"
                    min="0"
                    max={applicationcostmax}
                    bind:value={applicationcost}
                    on:input={updatebenefitfunction}
                    class="range range-primary"
                    style="width: 400px; margin: 7px 0px 0px 0px;"
                />
            </div>
            <div>
                <input
                    type="range"
                    min="0"
                    max={applicationsonsystemmax}
                    bind:value={applicationsonsystem}
                    on:input={updatebenefitfunction}
                    class="range range-primary"
                    style="width: 400px; margin: 7px 0px 0px 0px;"
                />
            </div>
            <div>
                <input
                    type="range"
                    min="0"
                    max={moneyleftmax}
                    bind:value={moneyleft}
                    on:input={updatebenefitfunction}
                    class="range range-primary"
                    style="width: 400px; margin: 7px 0px 0px 0px;"
                />
            </div>
        </div>
    </div>
    <p style="margin: 30px 0px 0px 10px; font-size: 20px; font-weight: bold;">
        Function Settings for the Benefit
    </p>
    <div class="split-container6">
        <div class="half">
            <p
                style="margin: 6px 0px 0px 0px; font-size: 16px; font-weight: bold;"
            >
                The project will decrease the costs by {costsaving} %
            </p>
            <p
                style="margin: 6px 0px 0px 0px; font-size: 16px; font-weight: bold;"
            >
                Simulate the benefit of the project for {tbenefit} years
            </p>
        </div>
        <div class="half">
            <div>
                <input
                    type="range"
                    min="0"
                    max="100"
                    bind:value={costsaving}
                    on:input={updatebenefitfunction}
                    class="range range-primary"
                    style="width: 400px; margin: 7px 0px 0px 0px;"
                />
            </div>
            <div>
                <input
                    type="range"
                    min="0"
                    max="80"
                    bind:value={tbenefit}
                    on:input={updatebenefitfunction}
                    class="range range-primary"
                    style="width: 400px; margin: 7px 0px 0px 0px;"
                />
            </div>
        </div>
    </div>
    <p style="margin: 30px 0px 0px 10px; font-size: 20px; font-weight: bold;">
        Function for the Cost Factors
    </p>
    <div class="split-container4">
        <div>
            <div id="math-formula-wv" style="margin: 50px 0px 0px 0px;" />
        </div>
        <div>
            <div id="math-formula" style="margin: 50px 0px 50px 0px;" />
        </div>

        <div class="parent">
            <div class="half">
                <div id="plot-container" />
            </div>
            <div class="half">
                <p
                    style="margin: 50px 0px 10px 50px; font-size: 18px; font-weight: bold;"
                >
                    The Total Costs after the project runtime are estimated: {costresearch.toLocaleString(undefined, formatierungsoptionen)}€
                </p>
            </div>
        </div>
        <p
            style="margin: 100px 0px 0px 80px; font-size: 20px; font-weight: bold;"
        >
            Function for the CO2 Emissions
        </p>
        <div>
            <div id="math-formula-wvco2" style="margin: 50px 0px 0px 0px;" />
        </div>
        <div>
            <div id="math-formula-co2" style="margin: 50px 0px 0px 0px;" />
        </div>
        <div class="parent">
            <div class="half">
                <div id="plot-container7" />
            </div>
            <div class="half">
                <p
                    style="margin: 50px 0px 10px 50px; font-size: 18px; font-weight: bold;"
                >
                    The Total C02 emissions after the project runtime for the
                    testsystem are estimated: {costresearchco2.toLocaleString()}t
                </p>
            </div>
        </div>
    </div>
    <p style="margin: 30px 0px 0px 10px; font-size: 20px; font-weight: bold;">
        Function for the Cost Factors for the Benefit
    </p>
    <div class="split-container5">
        <div>
            <div id="math-formula-k" style="margin: 50px 0px 0px 0px;" />
        </div>
        <div>
            <div id="math-formula-abc" style="margin: 50px 0px 0px 0px;" />
        </div>
        <div>
            <div id="math-formula-a" style="margin: 50px 0px 0px 0px;" />
        </div>
        <div>
            <div id="math-formula-b" style="margin: 50px 0px 0px 0px;" />
        </div>
        <div>
            <div id="math-formula-d" style="margin: 50px 0px 0px 0px;" />
        </div>
        <div>
            <div
                id="math-formula-cost-benefit"
                style="margin: 50px 0px 0px 0px;"
            />
        </div>
        <div>
            <div id="math-cost-benefit" style="margin: 50px 0px 0px 0px;" />
        </div>
        <div class="parent">
            <div class="half">
                <div id="plot-container4" />
            </div>
            <div class="half">
                <p
                    style="margin: 50px 0px 10px 50px; font-size: 18px; font-weight: bold;"
                >
                    When the Adaption Periods are over then there are costs over {Math.max(
                        ...yValuesbencost
                    ).toLocaleString(undefined, formatierungsoptionen)}€ for the benefit to expect.
                </p>
                <p
                    style="margin: 50px 0px 10px 50px; font-size: 18px; font-weight: bold;"
                >
                    {costtotal.toLocaleString(undefined, formatierungsoptionen)}€ are the total costs of the Project
                </p>
            </div>
        </div>
    </div>

    <p style="margin: 30px 0px 0px 10px; font-size: 20px; font-weight: bold;">
        Function for the Benefit Factors
    </p>
    <div class="split-container5">
        <div>
            <div id="math-formula-c" style="margin: 50px 0px 0px 0px;" />
        </div>
        <div>
            <div
                id="math-formula-benefit-wv"
                style="margin: 50px 0px 0px 0px;"
            />
        </div>
        <div>
            <div id="math-formula-benefit" style="margin: 50px 0px 50px 0px;" />
        </div>
        <div class="parent">
            <div class="half">
                <div id="plot-container2" />
            </div>
            <div class="half">
                <p
                    style="margin: 50px 0px 10px 50px; font-size: 18px; font-weight: bold;"
                >
                    When the Adaption Periods are over then there is a benefit
                    of {Math.max(...yValuesben).toFixed(2)}€/h to expect.
                </p>
            </div>
        </div>
        <div class="parent">
            <div class="half">
                <div id="plot-container3" />
            </div>
            <div class="half">
                <p
                    style="margin: 50px 0px 10px 50px; font-size: 18px; font-weight: bold;"
                >
                    Benefit after {tbenefit} years is estimated: {timercostbenefitefficent.toLocaleString(undefined, formatierungsoptionen)}€
                </p>
            </div>
        </div>
        <p
            style="margin: 100px 0px 0px 80px; font-size: 20px; font-weight: bold;"
        >
            Function for the Benefit for the CO2 emissions
        </p>
        <div class="parent">
            <div class="half">
                <div id="plot-container8" style="margin: 0px 0px 0px 80px;"/>
            </div>
            <div class="half">
                <p
                    style="margin: 50px 0px 10px 50px; font-size: 18px; font-weight: bold;"
                >
                    Benefit after {tbenefit} years is estimated: {co2benefitvalue.toLocaleString()}t
                    CO2 emission savings
                </p>
            </div>
        </div>
    </div>
    <p style="margin: 30px 0px 0px 10px; font-size: 20px; font-weight: bold;">
        Function for the total Cost and Benefit Factors
    </p>
    <div class="split-container7">
        <div class="parent">
            <div class="half">
                <div id="plot-container5" />
            </div>
            <div class="half">
                <p
                    style="margin: 50px 0px 10px 50px; font-size: 18px; font-weight: bold;"
                >
                    After {timer.toFixed(0)} years your Project is Cost-Benefit-Efficient!
                </p>
            </div>
        </div>
        <div class="parent">
            <div class="half">
                <p
                    style="margin: 100px 0px 0px 80px; font-size: 20px; font-weight: bold;"
                >
                    Function for the total Cost and Benefit Factors for the CO2
                    emissions
                </p>
                <div id="plot-container9" />
            </div>
            <div class="half">
                <p
                    style="margin: 200px 0px 10px 50px; font-size: 18px; font-weight: bold;"
                >
                    After {timerco2.toFixed(0)} years your Project is CO2-Neutral!
                </p>
            </div>
        </div>
    </div>
</main>

<style>
    main {
        margin-top: 2%;
        margin-left: 2%;
        margin-right: 2%;
        padding-bottom: 10%;

        /* Flexbox-Layout verwenden  Benefit after {tbenefit}years: {integralWerte[                                        Benefit after {tbenefit} years is estimated: {BInt[
                        BInt.length - 1
                    ].toFixed(2)}€
                integralWerte.length - 1               BInt[BInt.length-1]
            ].toFixed(2)}€*/
    }
    .horizontal-line {
        border-top: 1px solid #0065bd; /* Ändern Sie die Farbe und Dicke nach Bedarf */
        margin: 10px 0; /* Ändern Sie den Abstand nach Bedarf */
    }

    .horizontal-line-extra {
        border-top: 1px solid #0065bd; /* Ändern Sie die Farbe und Dicke nach Bedarf */
        margin: 33px 0px 35px 0px; /* Ändern Sie den Abstand nach Bedarf */
    }

    .horizontal-line-extra2 {
        border-top: 1px solid #0065bd; /* Ändern Sie die Farbe und Dicke nach Bedarf */
        margin: 8px 0px 8px 0px; /* Ändern Sie den Abstand nach Bedarf */
    }

    .split-container1 {
        display: flex;
        width: 100%;
        height: auto;
        background-color: white;
        border-radius: 20px;
        border: 1px solid #0065bd;
        padding-left: 50px;
    }

    .split-container2 {
        display: flex;
        width: 100%;
        height: auto;
        background-color: white;
        border-radius: 20px;
        border: 1px solid #0065bd;
        padding-left: 50px;
        align-items: flex-end;
    }

    .split-container3 {
        display: flex;
        width: 100%;
        height: auto;
        background-color: white;
        border-radius: 20px;
        border: 1px solid #0065bd;
        padding-left: 50px;
    }

    .split-container4 {
        width: 100%;
        height: auto;
        background-color: white;
        border-radius: 20px;
        border: 1px solid #0065bd;
        align-items: center;
        justify-content: center;
    }

    .split-container5 {
        width: 100%;
        height: auto;
        background-color: white;
        border-radius: 20px;
        border: 1px solid #0065bd;
    }

    .split-container6 {
        display: flex;
        width: 100%;
        height: auto;
        background-color: white;
        border-radius: 20px;
        border: 1px solid #0065bd;
        padding-left: 50px;
    }
    .split-container7 {
        width: 100%;
        height: auto;
        justify-content: center;
        background-color: white;
        border-radius: 20px;
        border: 1px solid #0065bd;
    }

    .half {
        flex: 1; /* Jeder Untercontainer nimmt 50% des verfügbaren Platzes ein */
        padding: 10px;
    }
    .parent {
        display: flex;
    }
</style>
