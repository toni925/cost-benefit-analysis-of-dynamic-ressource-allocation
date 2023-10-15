import { writable } from 'svelte/store';



const owntypevalues = {
    initialcost: '',
    energycost: '',
    powerconsumption: '',
    runtimesys: '',
    corehourssys: '',
    runningcosts: '',
    numberofsystems: '',
    numberofmonths: ''
};

export const owntype = writable(owntypevalues);

export const saved = writable(false);

export const rented = writable(false);

export function saveInputValues(newValues) {
    owntype.set(newValues);
  }
