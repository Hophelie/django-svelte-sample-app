import { writable } from 'svelte/store'

export const form = writable({ values: {}, errors: {} });