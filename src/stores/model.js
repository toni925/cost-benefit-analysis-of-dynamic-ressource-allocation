import { writable } from 'svelte/store';


const generalprojectinformationconf = {
    projectname: '',
    duration: '',
    archgoal: '',
    addtime: '',
    budget: ''

};

const researchphaseconf = {
    employees: '',
    salarygrades: '',
    newemployees: '',
    initialfixcost: '',
    travelcost: '',
    travelcostC02: '',
    rented: '',
    rentalcost: '',
    corehours: '',
    eventcosts: ''

}

const transitionphaseconf = {
    startingpointAA: '',
    endingpointAA: '',
    timerAA: '',
    x0AA: '',
    startingpointAS: '',
    endingpointAS: '',
    timerAS: '',
    x0AS: '',
    startingpointMF: '',
    endingpointMF: '',
    timerMF: '',
    x0MF: '',
    deploymentcount: '',
    readytodeploy: '',
    moneyleft: '',
    deploymentcost: '',
    applicationcost: '',
    applicationsonsystem: ''
}

const deploymentphaseconf = {
    costsaving: ''
}

export const generalprojectinformationset = writable(generalprojectinformationconf);

export const researchphaseset = writable(researchphaseconf);

export const transitionphaseset = writable(transitionphaseconf);

export const deploymentphaseset = writable(deploymentphaseconf);


export function saveInputValuesGP(newValues) {
    generalprojectinformationset.set(newValues);
}

export function saveInputValuesRP(newValues) {
    researchphaseset.set(newValues);
}  

export function saveInputValuesTP(newValues) {
    transitionphaseset.set(newValues);
}  

export function saveInputValuesDP(newValues){
    deploymentphaseset.set(newValues);
}